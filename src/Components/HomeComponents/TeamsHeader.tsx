import React from "react";
import { Typography } from "@mui/material";

const TeamsHeader = () => {
  return (
    <div className="teamsHeader">
      <div className="teamsHeaderContent">
        <Typography variant="h4" gutterBottom>
          Manage Your Team
        </Typography>
        <Typography variant="body1" className="teamsHeaderTitle">
          Give your Team Members the recognition they deserve and the ability to
          edit Team listings.
        </Typography>
      </div>
    </div>
  );
};

export default TeamsHeader;
