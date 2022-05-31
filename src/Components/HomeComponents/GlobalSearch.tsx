import React from "react";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import {
  FormControl,
  InputAdornment,
  InputLabel,
  OutlinedInput,
} from "@mui/material";

const GlobalSearch = () => {
  return (
    <div className="searchSection">
      <div className="searchTitle">Team Black Panther</div>
      <div className="searchDescription">
        Manage your Teams account, invite Team Members to join your Team and set
        their permissions to edit listings and view production reports.
      </div>
      <FormControl
        sx={{ m: 1, width: "25ch" }}
        variant="outlined"
        className="globalSearch"
      >
        <InputLabel
          htmlFor="outlined-adornment-password"
          className="searchLabel"
        >
          Password
        </InputLabel>
        <OutlinedInput
          id="outlined-adornment-password"
          type="text"
          label="Password"
          value={""}
          className="searchInput"
          endAdornment={
            <InputAdornment position="end">
              <ArrowDropDownIcon />
            </InputAdornment>
          }
        />
      </FormControl>
    </div>
  );
};

export default GlobalSearch;
