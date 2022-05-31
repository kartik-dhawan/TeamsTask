import React, { useEffect } from "react";
import {
  Box,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableFooter,
  TableHead,
  TablePagination,
  TableRow,
  useTheme,
} from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { getData } from "../../redux/reducers/apiSlice";
import { RootType } from "../../redux/store/store";
import { KeyboardArrowRight, KeyboardArrowLeft } from "@mui/icons-material";
import FirstPageIcon from "@mui/icons-material/FirstPage";
import LastPageIcon from "@mui/icons-material/LastPage";

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

  const datalog = useSelector((state: RootType) => state.data.data).slice(
    0,
    50
  );

  const loader = useSelector((state: RootType) => state.data.isLoading);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getData());
  }, []);

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(6);

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
              <TableCell align="center" className="uniColumn">
                Alpha Code
              </TableCell>
              <TableCell align="center" className="uniColumn">
                University
              </TableCell>
              <TableCell align="center" className="uniColumn">
                Domain
              </TableCell>
              <TableCell align="center" className="uniColumn">
                Country
              </TableCell>
              <TableCell align="center" className="uniColumn">
                Website
              </TableCell>
            </TableRow>
          </TableHead>

          <TableBody className="uniTableBody">
            {(rowsPerPage > 0
              ? datalog.slice(
                  page * rowsPerPage,
                  page * rowsPerPage + rowsPerPage
                )
              : datalog
            ).map((row) => (
              <TableRow key={Math.random()} className="uniTableRow">
                <TableCell
                  size="small"
                  component="th"
                  scope="row"
                  className="uniColumn"
                  align="center"
                >
                  {row.alpha_two_code}
                </TableCell>
                <TableCell align="center" className="uniColumn">
                  {row.name}
                </TableCell>
                <TableCell align="center" className="uniColumn">
                  {row.domains[0]}
                </TableCell>
                <TableCell align="center" className="uniColumn">
                  {row.country}
                </TableCell>
                <TableCell align="center" className="uniColumn">
                  <a href={row.web_pages[0]}>{row.web_pages[0]}</a>
                </TableCell>
              </TableRow>
            ))}
            {emptyRows > 0 && (
              <TableRow style={{ height: 53 * emptyRows }}>
                <TableCell colSpan={6} />
              </TableRow>
            )}
          </TableBody>
          {loader ? (
            ""
          ) : (
            <TableFooter>
              <TableRow>
                <TablePagination
                  rowsPerPageOptions={[6, 10, 14, { label: "All", value: -1 }]}
                  colSpan={3}
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
            </TableFooter>
          )}
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
