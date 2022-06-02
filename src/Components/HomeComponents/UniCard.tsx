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
    <Card sx={{ maxWidth: 450, minHeight: 210 }} className="uniCard">
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
        subheader={props.gender === "female" ? <FemaleIcon /> : <MaleIcon />}
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
        <Badge
          badgeContent={props.status}
          className={
            props.status === "active"
              ? "statusActiveColor"
              : "statusInactiveColor"
          }
        ></Badge>
      </CardContent>
    </Card>
  );
};

export default UniCard;
