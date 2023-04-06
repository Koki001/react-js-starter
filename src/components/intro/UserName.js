import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { firstName, lastName } from "../../redux/slices/userSlice";
import { NamePrompts } from "../../helpers/formMessages";
import { useSearchParams } from "react-router-dom";
import { errorMessage, errorId, nextStep } from "../../redux/slices/userSlice";
// MUI imports
import Box from "@mui/material/Box";
import { Button } from "@mui/material";
import TextField from "@mui/material/TextField";
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";

const UserName = () => {
  let [searchParams, setSearchParams] = useSearchParams();
  const paramsNameF = searchParams.get("first");
  const paramsNameL = searchParams.get("last");
  const [load, setLoad] = useState(true);
  const dispatch = useDispatch();
  const name = useSelector((state) => state.user.name);
  const user = useSelector((state) => state.user);
  const regexName = /^[a-zA-Z\b]*$/;

  useEffect(() => {
    if (paramsNameF) {
      dispatch(firstName(paramsNameF));
    }
    if (paramsNameL) {
      dispatch(lastName(paramsNameL));
    }
  }, []);

  const handleFirst = (e) => {
    if (regexName.test(e.target.value)) {
      dispatch(firstName(e.target.value));
    }
  };
  const handleLast = (e) => {
    if (regexName.test(e.target.value)) {
      dispatch(lastName(e.target.value));
    }
  };
  const handleNextStep = () => {
    if (user.name.first === "" || user.name.last === "") {
      dispatch(errorMessage(true));
      dispatch(errorId(1));
    } else {
      dispatch(errorMessage(false));
      dispatch(errorId(0));
      dispatch(nextStep());
      searchParams.set("first", user.name.first);
      searchParams.set("last", user.name.last);
      setSearchParams(searchParams);
    }
  };
  const handleKeyNext = (e) => {
    if (e.code === "Enter") {
      e.preventDefault();
      handleNextStep();
    }
  };
  return (
    <div className="userNameContainer">
      <div style={{ opacity: load ? "0" : "1" }} className="pikaGif">
        <p>{NamePrompts(user.errorId)}</p>
        <img
          onLoad={() => setLoad(false)}
          src="./assets/intro/pikachu.gif"
          alt=""
        />
      </div>
      <div className="contactButtons">
        <Button
          className="buttonNext"
          onClick={handleNextStep}
          variant="outlined"
          style={{ marginLeft: "auto" }}
        >
          next
          <KeyboardDoubleArrowRightIcon />
        </Button>
      </div>
      <Box
        sx={{
          display: "flex",
          alignSelf: "center",
          justifyContent: "space-between",
          backgroundColor: "#ece5ce8c",
          borderRadius: "10px",
          padding: "5px",
          width: "auto",
        }}
      >
        <TextField
          required
          inputRef={(input) => input && input.focus()}
          focused={user.errorMessage && name.first === ""}
          sx={{ width: "50%" }}
          id="input-first-name"
          label="First name"
          variant="outlined"
          onChange={handleFirst}
          value={user.name.first}
          onKeyDown={handleKeyNext}
        />
        <TextField
          required
          focused={user.errorMessage && name.last === ""}
          sx={{ marginLeft: "20px", width: "50%" }}
          id="input-last-name"
          label="Last name"
          variant="outlined"
          onChange={handleLast}
          value={user.name.last}
          onKeyDown={handleKeyNext}
        />
      </Box>
    </div>
  );
};

export default UserName;
