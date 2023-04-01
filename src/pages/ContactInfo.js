import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clear, progress, nextStep, prevStep } from "../redux/slices/userSlice";
import UserAddress from "../components/form/UserAddress";
import UserName from "../components/form/UserName";
import UserPhone from "../components/form/UserPhone";
import ProgressBar from "../components/ProgressBar";
// MUI imports
import Button from "@mui/material/Button";

const ContactInfo = () => {
  const dispatch = useDispatch();
  let step = useSelector((state) => state.user.step);
  const components = [<UserName />, <UserPhone />, <UserAddress />];

  useEffect(() => {
    const weight = 100 / 3;
    const value = weight * step;
    dispatch(progress(value));
  }, [step]);

  const handleNextStep = () => {
    if (step === 2) {
      alert("complete");
      dispatch(nextStep());
    } else {
      dispatch(nextStep());
    }
  };
  const handleClear = () => {
    dispatch(clear());
  };

  return (
    <div className="formContainer wrapper">
      <ProgressBar />
      <form>{components[step]}</form>
      {step > 0 && step < 3 && (
        <Button onClick={() => dispatch(prevStep())} variant="outlined">
          back
        </Button>
      )}
      {step < 3 && (
        <Button onClick={handleNextStep} variant="outlined">
          next
        </Button>
      )}
      <Button onClick={handleClear} variant="outlined">
        clear testing
      </Button>
    </div>
  );
};

export default ContactInfo;
