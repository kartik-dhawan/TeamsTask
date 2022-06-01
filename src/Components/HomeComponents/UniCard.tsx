import {
  CardHeader,
  Avatar,
  CardContent,
  Typography,
  Card,
  Badge,
} from "@mui/material";
import React from "react";

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
    <Card sx={{ maxWidth: 345, minHeight: 170 }} className="uniCard">
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
        subheader={props.gender}
      />
      <CardContent className="cardBody">
        <Typography
          variant="body2"
          color="text.secondary"
          className="cardEmail"
        >
          <b>Email:</b> {props.email}
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
