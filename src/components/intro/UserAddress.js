import { useAutocomplete } from "../../helpers/autoCompleteApi";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { address, completed } from "../../redux/slices/userSlice";
import {
  errorMessage,
  errorId,
  prevStep,
  progressCurrent,
  completeAddress,
} from "../../redux/slices/userSlice";
import { useNavigate, useSearchParams } from "react-router-dom";
// MUI imports
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { Button } from "@mui/material";
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";
import KeyboardDoubleArrowLeftIcon from "@mui/icons-material/KeyboardDoubleArrowLeft";

const UserAddress = () => {
  const navigate = useNavigate();
  const [load, setLoad] = useState(true);
  let [searchParams, setSearchParams] = useSearchParams({});
  const paramsAddress = searchParams.get("address");
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const { result, error, loading } = useAutocomplete(
    useSelector((state) => state.user.address)
  );

  useEffect(() => {
    if (paramsAddress) {
      dispatch(address(paramsAddress));
    }
  }, []);
  const handleNextStep = () => {
    if (user.address === "") {
      dispatch(errorMessage(true));
      dispatch(errorId(1));
    } else {
      dispatch(errorMessage(false));
      dispatch(errorId(0));
      dispatch(completed(true));
      dispatch(completeAddress(true));
      searchParams.set("address", user.address);
      setSearchParams(searchParams);
      navigate({ pathname: "/encounter", search: searchParams.toString() });
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
    <div className="userAddressContainer">
      <div style={{ opacity: load ? "0" : "1" }} className="cuboneGif">
        <p>
          {user.errorMessage
            ? "You're not getting past me until you tell me where you live !!"
            : "Where do you live ??!!"}
        </p>
        <img
          onLoad={() => setLoad(false)}
          src="./assets/intro/cubone.gif"
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
          alignItems: "flex-end",
          justifyContent: "center",
          width: "100%",
          backgroundColor: "#ece5ce",
          padding: "10px",
          borderBottomLeftRadius: "10px",
          borderBottomRightRadius: "10px"
        }}
      >
        <Autocomplete
          onChange={(e) => dispatch(address(e.target.textContent))}
          onKeyDown={handleKeyNext}
          id="free-solo-demo"
          fullWidth
          freeSolo
          options={result.map((option) => option.displayString)}
          value={user.address}
          renderInput={(params) => (
            <TextField
              inputRef={(input) => input && input.focus()}
              {...params}
              required
              focused={user.errorMessage && user.address === ""}
              label="Address"
              variant="outlined"
              onChange={(e) => dispatch(address(e.target.value))}
            />
          )}
        />
      </Box>
    </div>
  );
};

export default UserAddress;
