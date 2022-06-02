import {
  CardHeader,
  Avatar,
  CardContent,
  Typography,
  Card,
  Badge,
} from "@mui/material";
import React from "react";
import MaleIcon from "@mui/icons-material/Male";
import FemaleIcon from "@mui/icons-material/Female";
import EmailIcon from "@mui/icons-material/Email";

interface PropsType {
  name: string;
  gender: string;
  id: number;
  email: string;
  status: string;
}

const UniCard = (props: PropsType) => {
  const colorArr = ["orange", "navy", "grey"];

  const random = Math.floor(Math.random() * colorArr.length);

  return (
    <Card sx={{ maxWidth: 450, minHeight: 240 }} className="uniCard">
      <CardHeader
        className="cardHeader"
        avatar={
          <Avatar
            className="cardAvatar"
            sx={{ backgroundColor: `${colorArr[random]}` }}
            aria-label="recipe"
          >
            {props.name[0]}
          </Avatar>
        }
        title={props.name}
        subheader={
          props.gender === "female" ? (
            <div className="cardGender">
              <FemaleIcon />
              <span id="genderText">Female</span>
            </div>
          ) : (
            <div className="cardGender">
              <MaleIcon />
              <span id="genderText">Male</span>
            </div>
          )
        }
      />
      <CardContent className="cardBody">
        <Typography
          variant="body1"
          color="text.secondary"
          className="cardEmail"
        >
          <EmailIcon style={{ margin: "2px 5px" }} />
          {props.email}
        </Typography>
        <div
          className={
            props.status === "active"
              ? "statusActiveColor"
              : "statusInactiveColor"
          }
        >
          {props.status}
        </div>
      </CardContent>
    </Card>
  );
};

export default UniCard;
