import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import { Button, ButtonGroup, InputLabel, Typography } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { RootType } from "../../redux/store/store";
import { getFinalData } from "../../redux/reducers/updateSlice";
import { sendUpdateConfirmation } from "../../redux/reducers/searchSlice";
import CloseIcon from "@mui/icons-material/Close";
import HelpIcon from "@mui/icons-material/Help";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface PropsType {
  alpha: string;
  name: string;
  domains: string[];
  country: string;
  website: string[];
  updateRowToggle: any;
  setUpdateRowToggle: any;
}

const UpdateRecordForm = (props: PropsType) => {
  const [alpha, setAlpha] = useState(props.alpha);
  const [domain, setDomain] = useState(props.domains[0]);
  const [country, setCountry] = useState(props.country);
  const [website, setWebsite] = useState(props.website[0]);

  // state for input check
  const [alphaInputError, setAlphaInputError] = useState<string>("");
  const [domainInputError, setDomainInputError] = useState<string>("");
  const [countryInputError, setCountryInputError] = useState<string>("");
  const [websiteInputError, setWebsiteInputError] = useState<string>("");
  const inputErrorMessage: string =
    "Incorrect input. Click on '?' icon for instructions";

  // tooltip visibility toggle
  const [visibility, setVisibility] = useState<boolean>(false);

  interface classType {
    success: string;
    error: string;
    info: string;
    warning: string;
    default: string;
    dark: string;
  }

  const contextClass: classType = {
    success: "bg-blue-600",
    error: "bg-red-600",
    info: "bg-gray-600",
    warning: "bg-orange-400",
    default: "bg-indigo-600",
    dark: "bg-white-600 font-gray-300",
  };

  const dispatch = useDispatch();
  let datalog: any[] = useSelector((state: RootType) => state.data.data).slice(
    0,
    50
  );
  let afterDelete = useSelector((state: RootType) => state.uni.deletedRows);

  let updatedRow = {
    alpha_two_code: `${alpha}`,
    domains: [`${domain}`],
    country: `${country}`,
    name: `${props.name}`,
    web_pages: [`${website}`],
  };

  const up = () => {
    const index = datalog.findIndex((row) => row.name === updatedRow.name);
    datalog[index] = updatedRow;

    return datalog.filter((dl) => {
      return !afterDelete.find((adel) => {
        return dl.name === adel.name;
      });
    });
  };

  // updation notification
  const updateNotify = () => {
    toast.success("Record Updated", {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  return (
    <form className="updateForm">
      <CloseIcon
        className="closeUpdateDrawer"
        onClick={() => {
          props.setUpdateRowToggle(!props.updateRowToggle);
        }}
      />

      <Typography
        className="updateFormHeader"
        sx={{
          margin: "5px 0px 27px 0px",
          fontSize: "21px",
          width: "max-content",
          borderBottom: "1px solid grey",
          // paddingRight: "30px",
          color: "rgb(31, 58, 147)",
          display: "flex",
          alignItems: "center",
        }}
      >
        UPDATE THE RECORD
        <HelpIcon
          className="instructionsIcon"
          sx={{
            margin: "auto 0px auto 10px",
            paddingLeft: "95px",
            cursor: "pointer",
          }}
          onClick={() => {
            console.log("hello");
            setVisibility(!visibility);
          }}
        />
        {visibility ? (
          <div className="toolTip" style={{ display: "inline-block" }}>
            <div className="inputInstructions">
              1. The Alpha Code shall always be in capital letters
            </div>
            <div className="inputInstructions">
              2. The domain name shall always end with '.edu'.
            </div>
            <div className="inputInstructions">
              3. The country name input field will only accept string values.
            </div>
            <div className="inputInstructions">
              4. The website url must start with 'https://www.'.
            </div>
          </div>
        ) : (
          <div className="toolTip" style={{ display: "none" }}>
            Hello
          </div>
        )}
      </Typography>

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
          setAlpha(e.target.value.toUpperCase());
          if (/^[a-zA-Z\s]+$/.test(e.target.value)) {
            setAlphaInputError("");
          } else {
            setAlphaInputError("Incorrect Input. Please add a string value.");
          }
        }}
        helperText={alphaInputError}
        required
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
        helperText="University name cannot be updated"
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
          if (e.target.value.endsWith(".edu")) {
            setDomain(e.target.value);
            setDomainInputError("");
          } else {
            setDomainInputError(inputErrorMessage);
          }
        }}
        helperText={domainInputError}
        required
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
          if (!/^[a-zA-Z\s]+$/.test(e.target.value)) {
            setCountryInputError(inputErrorMessage);
          } else {
            setCountryInputError("");
          }
        }}
        helperText={countryInputError}
        required
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
          if (e.target.value.startsWith("https://www.")) {
            setWebsiteInputError("");
          } else {
            setWebsiteInputError(inputErrorMessage);
          }
        }}
        helperText={websiteInputError}
        required
      />

      <div className="drawerActionButtons">
        <Button
          sx={{
            borderColor: "rgb(255, 69, 0)",
            color: "rgb(255, 69, 0)",
            margin: "0px 10px",
            borderRadius: "2px",
          }}
          variant="outlined"
          className="cancelAction"
          onClick={() => {
            props.setUpdateRowToggle(!props.updateRowToggle);
          }}
        >
          Cancel
        </Button>
        {domainInputError !== "" ||
        websiteInputError !== "" ||
        countryInputError !== "" ? (
          <Button
            sx={{
              borderRadius: "2px",
            }}
            variant="contained"
            className="updateAction"
            disabled
          >
            Update
          </Button>
        ) : (
          <Button
            sx={{
              backgroundColor: "rgb(255, 69, 0)",
              borderRadius: "2px",
            }}
            variant="contained"
            className="updateAction"
            onClick={() => {
              dispatch(getFinalData(up()));
              dispatch(sendUpdateConfirmation(true));
              updateNotify();
            }}
          >
            Update
          </Button>
        )}
      </div>
    </form>
  );
};

export default UpdateRecordForm;
