import React, { useEffect } from "react";
import { Outlet } from "react-router-dom";
import TeamsHeader from "./HomeComponents/TeamsHeader";
import TeamsDataTable from "./HomeComponents/TeamsDataTable";
import GlobalSearch from "./HomeComponents/GlobalSearch";

const HomePage = () => {
  return (
    <>
      <TeamsHeader />
      <GlobalSearch />
      <TeamsDataTable />
      <Outlet />
    </>
  );
};

export default HomePage;
