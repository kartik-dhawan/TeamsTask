import React from "react";
import TeamsHeader from "./Home/TeamsHeader";
import TeamsDataTable from "./Home/TeamsDataTable";
import GlobalSearch from "./Home/GlobalSearch";

const HomePage = () => {
  return (
    <>
      <TeamsHeader />
      <GlobalSearch />
      <TeamsDataTable />
    </>
  );
};

export default HomePage;
