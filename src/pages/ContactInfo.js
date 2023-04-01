import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  clear,
  progress,
  nextStep,
  prevStep,
  errorMessage,
} from "../redux/slices/userSlice";
// Component imports
import UserAddress from "../components/form/UserAddress";
import UserName from "../components/form/UserName";
import UserPhone from "../components/form/UserPhone";
import ProgressBar from "../components/ProgressBar";
// MUI imports
import Button from "@mui/material/Button";

const ContactInfo = () => {
  const dispatch = useDispatch();
  const step = useSelector((state) => state.user.step);
  const user = useSelector((state) => state.user);
  const components = [<UserName />, <UserPhone />, <UserAddress />];

  useEffect(() => {
    const weight = 100 / 3;
    const value = weight * step;
    dispatch(progress(value));
  }, [step]);
  console.log(step);
  const handleNextStep = () => {
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
        dispatch(errorMessage(true));
      } else {
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
          <Button onClick={handlePrevStep} variant="outlined">
            back
          </Button>
        )}
        {step < 3 && (
          <Button onClick={handleNextStep} variant="outlined">
            next
          </Button>
        )}
        {step === 3 && (
          <div className="infoComplete">
            <p>explain next steps</p>
            <Button variant="outlined">
              <Link to={"/pokemon-picker"}>Complete</Link>
            </Button>
          </div>
        )}
        <Button onClick={() => dispatch(clear())} variant="outlined">
          clear testing
        </Button>
      </div>
    </div>
  );
};

export default ContactInfo;
