import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { forceStep } from "../redux/slices/userSlice";
// Component imports
import ProgressBar from "../components/ProgressBar";
import UserName from "../components/intro/UserName";
import UserPhone from "../components/intro/UserPhone";
import UserAddress from "../components/intro/UserAddress";

const ContactInfo = () => {
  let [searchParams, setSearchParams] = useSearchParams({});
  const dispatch = useDispatch();
  const step = useSelector((state) => state.user.step);
  const components = [<UserName />, <UserPhone />, <UserAddress />];

  //  when using link or "back" button, this will show the correct component with missing information
  useEffect(() => {
    if (!searchParams.has("first") || !searchParams.has("last")) {
      dispatch(forceStep(0));
    } else if (!searchParams.has("phone")) {
      dispatch(forceStep(1));
    } else if (!searchParams.has("address")) {
      dispatch(forceStep(2));
    }
  }, [searchParams]);
  return (
    <div className="formContainer wrapper">
      <ProgressBar />
      <form>{components[step]}</form>
    </div>
  );
};

export default ContactInfo;
