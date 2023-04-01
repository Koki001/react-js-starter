import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  clear,
  progress,
  nextStep,
  prevStep,
  errorMessage,
  errorMessagePhone,
} from "../redux/slices/userSlice";
// Component imports
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
  const dispatch = useDispatch();
  const step = useSelector((state) => state.user.step);
  const user = useSelector((state) => state.user);
  const components = [
    <UserName />,
    <UserPhone />,
    <UserAddress />,
    <InfoComplete />,
  ];

  useEffect(() => {
    const weight = 100 / 5;
    const value = weight * step;
    dispatch(progress(value));
  }, [step]);
  const handleNextStep = (e) => {
    if (step === 0) {
      if (
        (step === 0 && user.name.first === "") ||
        (step === 0 && user.name.last === "")
      ) {
        dispatch(errorMessage(true));
      } else {
        dispatch(errorMessage(false));
        dispatch(nextStep());
      }
    } else if (step === 1) {
      if (step === 1 && user.phone === "") {
        dispatch(errorMessagePhone(false));
        dispatch(errorMessage(true));
      } else if (step === 1 && user.phone.length < 10) {
        dispatch(errorMessage(false));
        dispatch(errorMessagePhone(true));
      } else {
        dispatch(errorMessagePhone(false));
        dispatch(errorMessage(false));
        dispatch(nextStep());
      }
    } else if (step === 2) {
      if (step === 2 && user.address === "") {
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

  return (
    <div className="formContainer wrapper">
      <ProgressBar />
      <form>{components[step]}</form>

      <div className="contactButtons">
        {step > 0 && step < 3 && (
          <Button
            className="buttonBack"
            onClick={handlePrevStep}
            variant="outlined"
          >
            back
            <KeyboardDoubleArrowLeftIcon />
          </Button>
        )}
        {step < 3 && (
          <Button
            className="buttonNext"
            onClick={handleNextStep}
            variant="outlined"
          >
            next
            <KeyboardDoubleArrowRightIcon />
          </Button>
        )}
        {step === 3 && (
          <Button className="completeButton" variant="outlined">
            <Link to={"/pokemon-picker"}>Let's go !</Link>
          </Button>
        )}
        <Button
          className="testClearButton"
          onClick={() => dispatch(clear())}
          variant="outlined"
        >
          dev
        </Button>
      </div>
    </div>
  );
};

export default ContactInfo;
