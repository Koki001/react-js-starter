import { useDispatch, useSelector } from "react-redux";
import { phone } from "../../redux/slices/userSlice";
// MUI imports
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";

const UserPhone = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const regexPhone = /^[0-9\b]{0,10}$/;

  const handlePhoneNumber = (e) => {
    if (regexPhone.test(e.target.value)) {
      dispatch(phone(e.target.value));
    }
  };

  return (
    <div className="userPhoneContainer">
      <div className="charGif">
        <p>
          {user.errorMessage
            ? "Please give me your phone number! I won't prank call you."
            : user.errorMessagePhone
            ? "Well, at least give me a 10 digit fake number please..."
            : `What's your phone number, ${user.name.first} ?`}
        </p>
        <img src="./assets/intro/charmander.gif" alt="" />
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
          focused={user.errorMessage && user.phone === ""}
          id="input-phone-number"
          label="Phone number"
          variant="outlined"
          onChange={handlePhoneNumber}
          value={user.phone}
        />
      </Box>
    </div>
  );
};

export default UserPhone;
