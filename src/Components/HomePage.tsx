import React, { useEffect } from "react";
import { Outlet } from "react-router-dom";
import TeamsHeader from "./HomeComponents/TeamsHeader";
import TeamsDataTable from "./HomeComponents/TeamsDataTable";

const HomePage = () => {
  return (
    <>
      <TeamsHeader />
      <TeamsDataTable />
      <Outlet />
    </>
  );
};

export default HomePage;
