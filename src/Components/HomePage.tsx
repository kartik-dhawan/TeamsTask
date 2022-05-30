import React, { useEffect } from "react";
import { Outlet } from "react-router-dom";
import TeamsHeader from "./HomeComponents/TeamsHeader";
import TeamsDataTable from "./HomeComponents/TeamsDataTable";
import { useSelector, useDispatch } from "react-redux";
import { getData } from "../redux/reducers/apiSlice";
import { RootType } from "../redux/store/store";

const HomePage = () => {
  const datalog = useSelector((state: RootType) => state.data.data);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getData());
  }, [dispatch]);

  console.log(datalog[1]);

  return (
    <div>
      <TeamsHeader />
      <TeamsDataTable />
      <Outlet />
    </div>
  );
};

export default HomePage;
