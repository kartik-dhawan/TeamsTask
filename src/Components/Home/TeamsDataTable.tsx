import React, { useEffect, useState } from "react";
import {
  Box,
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
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getData } from "../../redux/reducers/apiSlice";
import { getUniData } from "../../redux/reducers/uniSlice";
import { RootType } from "../../redux/store/store";
import { KeyboardArrowRight, KeyboardArrowLeft } from "@mui/icons-material";
import FirstPageIcon from "@mui/icons-material/FirstPage";
import LastPageIcon from "@mui/icons-material/LastPage";
import { updateData } from "../../redux/reducers/searchSlice";

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

const TeamsDataTable = () => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const navigate = useNavigate();

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

  const handleRequestSort = (event: any, property: any) => {
    const isAscending = sortValue === property && order === "asc";
    setSortValue(property);
    setOrder(isAscending ? "desc" : "asc");
  };

  const sortHandler = (property: any) => (event: any) => {
    handleRequestSort(event, property);
  };

  // deleting a record

  const rowrecord: any = useSelector((state: RootType) => state.uni.uniData);
  datalog = datalog.filter((row) => {
    return row.name != rowrecord.name;
  });

  return (
    <div className="data-table">
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
                      onClick={() => console.log("deleted")}
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
                      onClick={(e) => {
                        e.preventDefault();
                        dispatch(getUniData(row));
                        dispatch(updateData(datalog));
                      }}
                    >
                      <div className="deleteButton">Delete</div>
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
    </div>
  );
};

export default TeamsDataTable;
