import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  clear,
  progressCurrent,
  nextStep,
  prevStep,
  errorMessage,
  errorMessagePhone,
  forceStep,
} from "../redux/slices/userSlice";
// Component imports
import ProgressBar from "../components/ProgressBar";
import UserName from "../components/intro/UserName";
import UserPhone from "../components/intro/UserPhone";
import UserAddress from "../components/intro/UserAddress";
// MUI imports
import Button from "@mui/material/Button";
import KeyboardDoubleArrowLeftIcon from "@mui/icons-material/KeyboardDoubleArrowLeft";
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";

const ContactInfo = () => {
  let { id, stage } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const step = useSelector((state) => state.user.step);
  const components = [
    { name: <UserName />, value: "name" },
    { name: <UserPhone />, value: "phone" },
    { name: <UserAddress />, value: "address" },
  ];
  // match the current step with current stage when using a link
  useEffect(() => {
    if (stage === "name") {
      dispatch(forceStep(0));
      navigate(`/${id}/${stage}`);
    } else if (stage === "phone") {
      dispatch(forceStep(1));
      navigate(`/${id}/${stage}`);
    } else if (stage === "address") {
      dispatch(forceStep(2));
      navigate(`/${id}/${stage}`);
    }
  }, []);
  const handleNextStep = (e) => {
    dispatch(nextStep());
    navigate(`/${id}/${components[step].value}`)
    if (step === 2) {
      navigate(`/${id}/encounter`);
    }
    // if (stage === "name") {
    //   if (user.name.first === "" || user.name.last === "") {
    //     dispatch(errorMessage(true));
    //   } else {
    //     dispatch(errorMessage(false));
    //     navigate(`/${id}/phone`);
    //   }
    // } else if (stage === 2) {
    //   if (stage === 2 && user.phone === "") {
    //     dispatch(errorMessagePhone(false));
    //     dispatch(errorMessage(true));
    //   } else if (stage === 2 && user.phone.length < 10) {
    //     dispatch(errorMessage(false));
    //     dispatch(errorMessagePhone(true));
    //   } else {
    //     dispatch(errorMessagePhone(false));
    //     dispatch(errorMessage(false));
    //     navigate(`/${localStorage.getItem("userId")}/${user.step}`);
    //   }
    // } else if (stage === 3) {
    //   if (stage === 3 && user.address === "") {
    //     dispatch(errorMessage(true));
    //   } else {
    //     dispatch(errorMessage(false));
    //     navigate(`/${localStorage.getItem("userId")}/${user.step}`);
    //   }
    // }
  };
  const handlePrevStep = () => {
    dispatch(prevStep());
  };
  const handleDev = () => {
    dispatch(clear());
    localStorage.clear();
  };
  return (
    <div className="formContainer wrapper">
      <ProgressBar />
      <form>{step < components.length && components[step].name}</form>

      <div className="contactButtons">
        {step > 0 && (
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
