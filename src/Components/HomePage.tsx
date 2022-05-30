import React, { useEffect } from "react";
import { Outlet } from "react-router-dom";
import TeamsHeader from "./HomeComponents/TeamsHeader";
import TeamsDataTable from "./HomeComponents/TeamsDataTable";
import { useSelector, useDispatch } from "react-redux";
import { getData } from "../redux/reducers/apiSlice";
import { RootType } from "../redux/store/store";

const HomePage = () => {
  const photos = useSelector((state: RootType) => state.user.data);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getData());
  }, [dispatch]);

  console.log(photos[1]);

  return (
    <div>
      <TeamsHeader />
      <TeamsDataTable />
      <Outlet />
      <h1>h</h1>
    </div>
  );
};

export default HomePage;
