import React, { useState, useEffect } from "react";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import {
  FormControl,
  InputAdornment,
  InputLabel,
  OutlinedInput,
} from "@mui/material";

import { useSelector, useDispatch } from "react-redux";
import { updateData } from "../../redux/reducers/searchSlice";
import { getData } from "../../redux/reducers/apiSlice";
import { RootType } from "../../redux/store/store";

interface propsType {
  search: string;
  setSearch: any;
}

const GlobalSearch = (props: propsType) => {
  // const [search, setSearch] = useState("");
  let datalog = useSelector((state: RootType) => state.data.data).slice(0, 50);

  const isUpdated = useSelector((state: RootType) => state.search.isUpdated);
  let updatedInfoData: any[] = useSelector(
    (state: RootType) => state.updateRecord.afterDeleteUpdate
  );

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getData());
  }, []);

  let updatedData: any[];

  const searchAlgo = (data: any[]) => {
    if (props.search) {
      updatedData = data.filter((row) => {
        return (
          row.name.toLowerCase().includes(props.search.toLowerCase()) ||
          row.domains[0].toLowerCase().includes(props.search.toLowerCase())
        );
      });
      dispatch(updateData(updatedData));
    } else {
      updatedData = data;
      dispatch(updateData(updatedData));
    }
  };

  if (isUpdated === true) {
    searchAlgo(updatedInfoData);
  } else {
    searchAlgo(datalog);
  }

  return (
    <div className="midSection">
      <div className="searchSection">
        <div className="searchTitle">Team Black Panther</div>
        <div className="searchDescription">
          Manage your Teams account, invite Team Members to join your Team and
          set their permissions to edit listings and view production reports.
          Manage your Teams account, invite Team Members to join your Team and
          set their permissions to edit listings and view production reports.
        </div>

        <FormControl
          sx={{ m: 1, width: "25ch" }}
          variant="outlined"
          className="globalSearch"
        >
          <InputLabel htmlFor="outlined-adornment-text" className="searchLabel">
            Search
          </InputLabel>
          <OutlinedInput
            sx={{
              bgcolor: "background.paper",
              boxShadow: 1,
              borderRadius: 2,
              minWidth: 200,
            }}
            color="secondary"
            id="outlined-adornment-text"
            name="outlined-adornment-text"
            type="text"
            label="Password"
            className="searchInput"
            value={props.search}
            onChange={(e) => {
              props.setSearch(e.target.value);
              dispatch(updateData(updatedData));
            }}
            endAdornment={
              <InputAdornment position="end">
                <ArrowDropDownIcon />
              </InputAdornment>
            }
          />
        </FormControl>
      </div>
    </div>
  );
};

export default GlobalSearch;
