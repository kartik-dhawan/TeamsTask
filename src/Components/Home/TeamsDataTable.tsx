import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Drawer,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TableSortLabel,
  useTheme,
} from "@mui/material";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getData } from "../../redux/reducers/apiSlice";
import { getUniData } from "../../redux/reducers/uniSlice";
import { RootType } from "../../redux/store/store";
import { KeyboardArrowRight, KeyboardArrowLeft } from "@mui/icons-material";
import DeleteIcon from "@mui/icons-material/Delete";
import ModeEditOutlineOutlinedIcon from "@mui/icons-material/ModeEditOutlineOutlined";
import FirstPageIcon from "@mui/icons-material/FirstPage";
import LastPageIcon from "@mui/icons-material/LastPage";
import { updateData } from "../../redux/reducers/searchSlice";
import { getUniUpdatedData } from "../../redux/reducers/updateUniSlice";
import UpdateRecordForm from "../Home/UpdateRecordForm";
import { getDataToSearchFrom } from "../../redux/reducers/searchSlice";
// pagination
interface TablePaginationActionsProps {
  count: number;
  page: number;
  rowsPerPage: number;
  onPageChange: (
    event: React.MouseEvent<HTMLButtonElement>,
    newPage: number
  ) => void;
}

function TablePaginationActions(props: TablePaginationActionsProps) {
  const theme = useTheme();
  const { count, page, rowsPerPage, onPageChange } = props;

  const handleFirstPageButtonClick = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    onPageChange(event, 0);
  };

  const handleBackButtonClick = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    onPageChange(event, page - 1);
  };

  const handleNextButtonClick = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    onPageChange(event, page + 1);
  };

  const handleLastPageButtonClick = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    <Box sx={{ flexShrink: 0, ml: 2.5 }}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page"
      >
        {theme.direction === "rtl" ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton
        onClick={handleBackButtonClick}
        disabled={page === 0}
        aria-label="previous page"
      >
        {theme.direction === "rtl" ? (
          <KeyboardArrowRight />
        ) : (
          <KeyboardArrowLeft />
        )}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        {theme.direction === "rtl" ? (
          <KeyboardArrowLeft />
        ) : (
          <KeyboardArrowRight />
        )}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        {theme.direction === "rtl" ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </Box>
  );
}

// actual data table
interface propsType {
  search: string;
}
const TeamsDataTable = (props: propsType) => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  console.log(props.search);
  useEffect(() => {
    dispatch(getData());
  }, [dispatch]);
  interface data {
    alpha_two_code: string;
    country: string;
    domains: any[];
    name: string;
    web_pages: any[];
  }

  let datalog: any[] = useSelector(
    (state: RootType) => state.search.updatedData
  ).slice(0, 50);

  const loader = useSelector((state: RootType) => state.data.isLoading);

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - datalog.length) : 0;

  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // sortable header
  const [sortValue, setSortValue] = useState("uni");
  const [order, setOrder] = useState<"asc" | "desc">("asc");

  const dataSort = () => {
    function compareByName(a: data, b: data) {
      if (a.name < b.name) {
        return -1;
      }
      if (a.name > b.name) {
        return 1;
      }
      return 0;
    }

    function compareByDomain(a: data, b: data) {
      console.log(a + " - " + b);
      if (a.domains[0] < b.domains[0]) {
        return -1;
      }
      if (a.domains[0] > b.domains[0]) {
        return 1;
      }
      return 0;
    }

    if (order === "asc" && sortValue === "uni") {
      datalog.sort(compareByName);
    } else if (order === "desc" && sortValue === "uni") {
      datalog.sort(compareByName).reverse();
    } else if (order === "asc" && sortValue === "dom") {
      datalog.sort(compareByDomain);
    } else if (order === "desc" && sortValue === "dom") {
      datalog.sort(compareByDomain).reverse();
    }
  };

  const handleRequestSort = (event: any, property: any) => {
    const isAscending = sortValue === property && order === "asc";
    setSortValue(property);
    setOrder(isAscending ? "desc" : "asc");
  };

  const sortHandler = (property: any) => (event: any) => {
    handleRequestSort(event, property);
  };

  // deleting a record

  const rowToDelete: any = useSelector((state: RootType) => state.uni.uniData);
  const rowToUpdate: any = useSelector(
    (state: RootType) => state.updateUni.uniData
  );

  let updatedInfoData: any[] = useSelector(
    (state: RootType) => state.updateRecord.afterDeleteUpdate
  );

  if (updatedInfoData.length == 0) {
    datalog = datalog.filter((row) => {
      return row.name != rowToDelete.name;
    });
    dataSort();
  } else {
    const temp = [...updatedInfoData];
    datalog = temp.filter((row) => {
      return row.name != rowToDelete.name;
    });
    dataSort();
    if (props.search) {
      datalog = datalog.filter((row) => {
        return (
          row.name.toLowerCase().includes(props.search.toLowerCase()) ||
          row.domains[0].toLowerCase().includes(props.search.toLowerCase())
        );
      });
    } else {
      datalog = datalog;
    }
    dispatch(getDataToSearchFrom(datalog));
  }

  const notify = () => toast(`University removed!`);

  // updating a record
  const [updateRowToggle, setUpdateRowToggle] = useState(false);
  type Anchor = "top" | "left" | "bottom" | "right";

  const toggleDrawer =
    (anchor: Anchor, open: boolean) =>
    (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event.type === "keydown" &&
        ((event as React.KeyboardEvent).key === "Tab" ||
          (event as React.KeyboardEvent).key === "Shift")
      ) {
        return;
      }
      setUpdateRowToggle(!updateRowToggle);
    };

  return (
    <div className="data-table">
      {/* data table */}

      {/* Same as */}
      <ToastContainer />

      <TableContainer component={Paper} className="uniData">
        <Table
          sx={{ minWidth: 650 }}
          aria-label="custom pagination table"
          className="uniTable"
        >
          <TableHead className="uniTableHead">
            <TableRow className="uniTableRowHead">
              <TableCell padding="normal" align="center" className="uniColumn">
                Alpha Code
              </TableCell>
              <TableCell
                key="uni"
                padding="normal"
                align="center"
                className="uniColumn"
              >
                <TableSortLabel
                  active={sortValue === "uni"}
                  direction={sortValue === "uni" ? order : "asc"}
                  onClick={sortHandler("uni")}
                  sx={{
                    "&.MuiTableSortLabel-root": {
                      color: "white",
                    },
                    "&.MuiTableSortLabel-root:hover": {
                      color: "grey",
                    },
                    "&.Mui-active": {
                      color: "white",
                    },
                    "& .MuiTableSortLabel-icon": {
                      color: "white !important",
                    },
                  }}
                >
                  University
                </TableSortLabel>
              </TableCell>
              <TableCell
                key="dom"
                padding="normal"
                align="center"
                className="uniColumn"
              >
                <TableSortLabel
                  active={sortValue === "dom"}
                  direction={sortValue === "dom" ? order : "asc"}
                  onClick={sortHandler("dom")}
                  sx={{
                    "&.MuiTableSortLabel-root": {
                      color: "white",
                    },
                    "&.MuiTableSortLabel-root:hover": {
                      color: "grey",
                    },
                    "&.Mui-active": {
                      color: "white",
                    },
                    "& .MuiTableSortLabel-icon": {
                      color: "white !important",
                    },
                  }}
                >
                  Domain
                </TableSortLabel>
              </TableCell>
              <TableCell padding="normal" align="center" className="uniColumn">
                Country
              </TableCell>
              <TableCell padding="normal" align="center" className="uniColumn">
                Website
              </TableCell>
              <TableCell
                padding="normal"
                align="center"
                className="uniColumn"
                style={{ paddingRight: "30px", paddingLeft: "30px" }}
              >
                Delete
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody className="uniTableBody">
            {datalog.length > 0 && (
              <>
                {(rowsPerPage > 0
                  ? datalog.slice(
                      page * rowsPerPage,
                      page * rowsPerPage + rowsPerPage
                    )
                  : datalog
                ).map((row) => (
                  <TableRow key={Math.random()} className="uniTableRow">
                    <TableCell
                      padding="normal"
                      size="small"
                      component="th"
                      scope="row"
                      className="uniColumn"
                      align="center"
                    >
                      {row.alpha_two_code}
                    </TableCell>
                    <TableCell
                      padding="normal"
                      align="center"
                      className="uniColumn"
                      onClick={(e) => {
                        e.preventDefault();
                        dispatch(getUniData(row));
                        navigate("/home/details");
                      }}
                    >
                      <a href="#">{row.name}</a>
                    </TableCell>
                    <TableCell
                      padding="normal"
                      align="center"
                      className="uniColumn"
                    >
                      {row.domains ? row.domains[0] : ""}
                    </TableCell>
                    <TableCell
                      padding="normal"
                      align="center"
                      className="uniColumn"
                    >
                      {row.country}
                    </TableCell>
                    <TableCell
                      padding="normal"
                      align="center"
                      className="uniColumn"
                    >
                      {row.web_pages ? (
                        <a href={row.web_pages[0]}>{row.web_pages[0]}</a>
                      ) : (
                        ""
                      )}
                    </TableCell>
                    <TableCell
                      padding="normal"
                      align="center"
                      className="uniColumn deleteContainer"
                    >
                      <Button
                        className="deleteButton"
                        onClick={() => {
                          dispatch(getUniData(row));
                          dispatch(updateData(datalog));
                        }}
                      >
                        <DeleteIcon onClick={notify} />
                        <ToastContainer
                          position="top-right"
                          autoClose={5000}
                          hideProgressBar={false}
                          newestOnTop={false}
                          closeOnClick
                          rtl={false}
                          pauseOnFocusLoss
                          draggable
                          pauseOnHover
                        />
                      </Button>
                      <div
                        onClick={() => {
                          dispatch(getUniUpdatedData(row));
                        }}
                      >
                        <Button
                          key="right"
                          className="deleteButton"
                          onClick={toggleDrawer("right", true)}
                        >
                          <ModeEditOutlineOutlinedIcon />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </>
            )}
            {emptyRows > 0 && (
              <TableRow style={{ height: 53 * emptyRows }}>
                <TableCell colSpan={6} />
              </TableRow>
            )}
            {loader ? (
              ""
            ) : (
              <TableRow className="uniTableRow">
                <TablePagination
                  className="pagination"
                  rowsPerPageOptions={[5, 10, 20, { label: "All", value: -1 }]}
                  colSpan={6}
                  count={datalog.length}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  SelectProps={{
                    inputProps: {
                      "aria-label": "rows per page",
                    },
                    native: true,
                  }}
                  onPageChange={handleChangePage}
                  onRowsPerPageChange={handleChangeRowsPerPage}
                  ActionsComponent={TablePaginationActions}
                />
              </TableRow>
            )}
          </TableBody>
        </Table>
        {loader ? (
          <div className="loader">
            <span className="circle"></span>
            <span className="circle"></span>
            <span className="circle"></span>
          </div>
        ) : (
          ""
        )}
      </TableContainer>

      {/* Update record drawer */}

      <Drawer
        anchor={"right"}
        open={updateRowToggle}
        onClose={toggleDrawer("right", false)}
        className="drawerComponent"
      >
        <UpdateRecordForm
          alpha={rowToUpdate.alpha_two_code}
          name={rowToUpdate.name}
          domains={rowToUpdate.domains}
          country={rowToUpdate.country}
          website={rowToUpdate.web_pages}
        />
      </Drawer>
    </div>
  );
};

export default TeamsDataTable;
