import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootType } from "../redux/store/store";
import { getDetails } from "../redux/reducers/detailsApiSlice";
import { Typography } from "@mui/material";
import UniCard from "./HomeComponents/UniCard";

const DetailsPage = () => {
  const details = useSelector((state: RootType) => state.details.data);
  const uni = useSelector((state: RootType) => state.uni.uniData);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getDetails());
  }, [dispatch]);

  console.log(details);

  return (
    <>
      <div className="teamsHeader">
        <div className="teamsHeaderContent">
          <Typography variant="h4" gutterBottom className="teamsHeaderTitle">
            {uni.name}
          </Typography>
          <Typography variant="body1" className="teamsHeaderText">
            <a href="" className="uniLink" style={{ color: "white" }}>
              {uni.web_pages[0]}
            </a>
            -<span className="uniCountry">{uni.country}</span>
          </Typography>
        </div>
      </div>
      <section className="uniDesc">
        <div className="uniDescTitle">
          Welcome to the alumni page of {uni.name}
        </div>
        <div className="uniDescBody">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi
          inventore, iure nesciunt dolorum mollitia maiores itaque architecto,
          reprehenderit vero non saepe cumque deleniti maxime ullam at! Enim.
        </div>
      </section>
      <div className="cardsContainer">
        {details.map((record) => {
          return (
            <UniCard
              name={record.name}
              gender={record.gender}
              id={record.id}
              email={record.email}
              status={record.status}
            />
          );
        })}
      </div>
    </>
  );
};

export default DetailsPage;
