import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  clear,
  progressCurrent,
  nextStep,
  prevStep,
  errorMessage,
  errorMessagePhone,
} from "../redux/slices/userSlice";
// Component imports
import App from "../App";
import UserAddress from "../components/form/UserAddress";
import UserName from "../components/form/UserName";
import UserPhone from "../components/form/UserPhone";
import ProgressBar from "../components/ProgressBar";
import InfoComplete from "../components/form/InfoComplete";
// MUI imports
import Button from "@mui/material/Button";
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";
import KeyboardDoubleArrowLeftIcon from "@mui/icons-material/KeyboardDoubleArrowLeft";

const ContactInfo = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const step = useSelector((state) => state.user.step);
  const user = useSelector((state) => state.user);
  const components = [
    <App />,
    <UserName />,
    <UserPhone />,
    <UserAddress />,
    <InfoComplete />,
  ];

  const handleNextStep = (e) => {
    if (step === 1) {
      if (
        (step === 1 && user.name.first === "") ||
        (step === 1 && user.name.last === "")
      ) {
        dispatch(errorMessage(true));
      } else {
        dispatch(errorMessage(false));
        dispatch(nextStep());
      }
    } else if (step === 2) {
      if (step === 2 && user.phone === "") {
        dispatch(errorMessagePhone(false));
        dispatch(errorMessage(true));
      } else if (step === 2 && user.phone.length < 10) {
        dispatch(errorMessage(false));
        dispatch(errorMessagePhone(true));
      } else {
        dispatch(errorMessagePhone(false));
        dispatch(errorMessage(false));
        dispatch(nextStep());
      }
    } else if (step === 3) {
      if (step === 3 && user.address === "") {
        dispatch(errorMessage(true));
      } else {
        dispatch(errorMessage(false));
        dispatch(nextStep());
      }
    }
  };
  const handlePrevStep = () => {
    dispatch(errorMessage(false));
    dispatch(prevStep());
  };
  const handleDev = () => {
    dispatch(clear());
    navigate("/");
  };
  return (
    <div className="formContainer wrapper">
      <ProgressBar />
      <form>{components[step]}</form>

      <div className="contactButtons">
        {step > 1 && step < 4 && (
          <Button
            className="buttonBack"
            onClick={handlePrevStep}
            variant="outlined"
          >
            back
            <KeyboardDoubleArrowLeftIcon />
          </Button>
        )}
        {step < 4 && (
          <Button
            className="buttonNext"
            onClick={handleNextStep}
            variant="outlined"
          >
            next
            <KeyboardDoubleArrowRightIcon />
          </Button>
        )}
        {step === 4 && (
          <div className="completeButtons">
            <Link disabled className="quizButton" to={"/pokemon-quiz"}>
              Take quiz
            </Link>
            <Link onClick={() => dispatch(nextStep())} className="skipButton" to={"/pokemon-picker"}>
              Let me pick
            </Link>
          </div>
        )}
        <Button
          className="testClearButton"
          onClick={handleDev}
          variant="outlined"
        >
          dev
        </Button>
      </div>
    </div>
  );
};

export default ContactInfo;
