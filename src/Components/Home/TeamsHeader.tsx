import React from "react";
import { Typography } from "@mui/material";

const TeamsHeader = () => {
  return (
    <div className="teamsHeader">
      <div className="teamsHeaderContent">
        <Typography variant="h4" gutterBottom className="teamsHeaderTitle">
          Manage Your University
        </Typography>
        <Typography variant="body1" className="teamsHeaderText">
          Put enough trust in your work staff and give them the ability to edit
          the university records.
        </Typography>
      </div>
    </div>
  );
};

export default TeamsHeader;
