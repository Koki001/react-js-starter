import { useDispatch, useSelector } from "react-redux";
import { phone } from "../../redux/slices/userSlice";
// MUI imports
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";

const UserPhone = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  return (
    <div className="userPhoneContainer">
      <div className="charGif">
        <p>
          {user.errorMessage
            ? "Please give me your phone number! I won't prank call you."
            : `What's your phone number, ${user.name.first} ?`}
        </p>
        <img src="./assets/intro/charmander.gif" alt="" />
      </div>
      <Box
        sx={{
          display: "flex",
          alignSelf: "center",
          justifyContent: "center",
          width: "100%",
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
          variant="standard"
          onChange={(e) => dispatch(phone(e.target.value))}
          value={user.phone}
        />
      </Box>
    </div>
  );
};

export default UserPhone;
