import React, { useState } from "react";
import TeamsHeader from "./Home/TeamsHeader";
import TeamsDataTable from "./Home/TeamsDataTable";
import GlobalSearch from "./Home/GlobalSearch";

const HomePage = () => {
  const [search, setSearch] = useState("");

  return (
    <>
      <TeamsHeader />
      <GlobalSearch search={search} setSearch={setSearch} />
      <TeamsDataTable search={search} />
    </>
  );
};

export default HomePage;
