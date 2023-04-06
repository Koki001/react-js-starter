import { useDispatch, useSelector } from "react-redux";
import { phone } from "../../redux/slices/userSlice";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { PhonePrompts } from "../../helpers/formMessages";
import {
  errorMessage,
  errorId,
  nextStep,
  prevStep,
} from "../../redux/slices/userSlice";
// MUI imports
import Box from "@mui/material/Box";
import { Button } from "@mui/material";
import TextField from "@mui/material/TextField";
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";
import KeyboardDoubleArrowLeftIcon from "@mui/icons-material/KeyboardDoubleArrowLeft";

const UserPhone = () => {
  const [load, setLoad] = useState(true);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  let [searchParams, setSearchParams] = useSearchParams();
  const regexPhone = /^[0-9\b]{0,10}$/;

  useEffect(() => {
    if (searchParams.get("phone")) {
      dispatch(phone(searchParams.get("phone")));
    }
  }, []);
  const handlePhoneNumber = (e) => {
    if (regexPhone.test(e.target.value)) {
      dispatch(phone(e.target.value));
    }
  };
  const handleNextStep = (e) => {
    if (user.phone === "") {
      dispatch(errorMessage(true));
      dispatch(errorId(1));
    } else if (user.phone.length < 10) {
      dispatch(errorMessage(true));
      dispatch(errorId(2));
    } else {
      dispatch(errorMessage(false));
      dispatch(errorId(0));
      dispatch(nextStep());
      searchParams.set("phone", user.phone);
      setSearchParams(searchParams);
    }
  };
  const handlePrevStep = () => {
    dispatch(prevStep());
    dispatch(errorId(0));
    dispatch(errorMessage(false));
  };
  const handleKeyNext = (e) => {
    if (e.code === "Enter") {
      e.preventDefault();
      handleNextStep();
    }
  };
  return (
    <div className="userPhoneContainer">
      <div style={{ opacity: load ? "0" : "1" }} className="charGif">
        <p>{PhonePrompts(user.errorId)}</p>
        <img
          onLoad={() => setLoad(false)}
          src="./assets/intro/charmander.gif"
          alt=""
        />
      </div>

      <div className="contactButtons">
        <Button
          className="buttonBack"
          onClick={handlePrevStep}
          variant="outlined"
        >
          back
          <KeyboardDoubleArrowLeftIcon />
        </Button>
        <Button
          className="buttonNext"
          onClick={handleNextStep}
          variant="outlined"
        >
          next
          <KeyboardDoubleArrowRightIcon />
        </Button>
      </div>
      <Box
        sx={{
          display: "flex",
          alignSelf: "center",
          justifyContent: "center",
          width: "auto",
          backgroundColor: "#ece5ce8c",
          borderRadius: "10px",
          padding: "5px",
        }}
      >
        <TextField
          required
          inputRef={(input) => input && input.focus()}
          focused={user.errorMessage && user.phone === ""}
          id="input-phone-number"
          label="Phone number"
          variant="outlined"
          onChange={handlePhoneNumber}
          onKeyDown={handleKeyNext}
          value={user.phone}
        />
      </Box>
    </div>
  );
};

export default UserPhone;
