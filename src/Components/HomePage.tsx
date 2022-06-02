import React from "react";
import TeamsHeader from "./HomeComponents/TeamsHeader";
import TeamsDataTable from "./HomeComponents/TeamsDataTable";
import GlobalSearch from "./HomeComponents/GlobalSearch";

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
