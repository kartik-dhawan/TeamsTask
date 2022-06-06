import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import { Button, ButtonGroup, InputLabel } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { RootType } from "../../redux/store/store";

interface PropsType {
  alpha: string;
  name: string;
  domains: string[];
  country: string;
  website: string[];
}

const UpdateRecordForm = (props: PropsType) => {
  const [alpha, setAlpha] = useState(props.alpha);
  const [domain, setDomain] = useState(props.domains[0]);
  const [country, setCountry] = useState(props.country);
  const [website, setWebsite] = useState(props.website[0]);

  const dispatch = useDispatch();
  const datalog = useSelector((state: RootType) => state.search.updatedData);

  interface UpdatedType {
    alpha_two_code: string;
    domains: string[];
    country: string;
    name: string;
    web_pages: string[];
  }

  const updatedRow = {
    alpha_two_code: `${alpha}`,
    domains: [`${domain}`],
    country: `${country}`,
    name: `${props.name}`,
    web_pages: [`${website}`],
  };

  const up = () => {
    const index = datalog.findIndex((row) => row.name === updatedRow.name);
    // datalog[index].alpha_two_code = updatedRow.alpha_two_code;
    console.log(datalog[index]);
    // datalog.splice(index - 1, 1, updatedRow);
  };

  return (
    <form className="updateForm">
      <InputLabel htmlFor="updateAlpha" sx={{ fontSize: "14px" }}>
        Alpha Code
      </InputLabel>
      <TextField
        size="small"
        type={"text"}
        value={alpha}
        className="updateTextField"
        id="updateAlpha"
        onChange={(e) => {
          setAlpha(e.target.value);
        }}
      />
      <InputLabel htmlFor="updateUni" sx={{ fontSize: "14px" }}>
        University
      </InputLabel>
      <TextField
        className="updateTextField"
        size="small"
        id="updateUni"
        type={"text"}
        value={props.name}
        disabled
      />

      <InputLabel htmlFor="updateDomain" sx={{ fontSize: "14px" }}>
        Domain
      </InputLabel>
      <TextField
        className="updateTextField"
        size="small"
        id="updateDomain"
        type={"text"}
        value={domain}
        onChange={(e) => {
          setDomain(e.target.value);
        }}
      />

      <InputLabel htmlFor="updateCountry" sx={{ fontSize: "14px" }}>
        Country
      </InputLabel>
      <TextField
        className="updateTextField"
        size="small"
        id="updateCountry"
        type={"text"}
        value={country}
        onChange={(e) => {
          setCountry(e.target.value);
        }}
      />

      <InputLabel htmlFor="updateWebsite" sx={{ fontSize: "14px" }}>
        Website
      </InputLabel>
      <TextField
        className="updateTextField"
        size="small"
        id="updateWebsite"
        type={"text"}
        value={website}
        onChange={(e) => {
          setWebsite(e.target.value);
        }}
      />

      <ButtonGroup>
        <Button onClick={() => up()}>Update</Button>
        <Button onClick={() => {}}>Delete</Button>
      </ButtonGroup>
    </form>
  );
};

export default UpdateRecordForm;
