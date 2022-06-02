import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootType } from "../redux/store/store";
import { getDetails } from "../redux/reducers/detailsApiSlice";
import { Typography } from "@mui/material";
import UniCard from "./HomeComponents/UniCard";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";

const DetailsPage = () => {
  const details = useSelector((state: RootType) => state.details.data);
  const uni = useSelector((state: RootType) => state.uni.uniData);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getDetails());
  }, []);

  console.log(details);

  return (
    <>
      <div className="teamsHeader">
        <div className="teamsHeaderContent">
          <Typography variant="h4" gutterBottom className="teamsHeaderTitle">
            {uni.name}
          </Typography>
          <Typography variant="body1" className="teamsHeaderText">
            <span>{uni.domains[0]}</span>
            <a
              href={uni.web_pages[0]}
              className="uniLink"
              style={{ color: "white" }}
              target="_blank"
              rel="noreferrer"
            >
              <OpenInNewIcon />
            </a>
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
