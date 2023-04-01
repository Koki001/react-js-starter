import { useDispatch, useSelector } from "react-redux";
import { firstName, lastName } from "../../redux/slices/userSlice";
// MUI imports
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";

const UserName = () => {
  const dispatch = useDispatch();
  const errorMessage = useSelector((state) => state.user.errorMessage);
  const name = useSelector((state) => state.user.name);
  return (
    <div className="userNameContainer">
      <div className="pikaGif">
        <p>
          {errorMessage
            ? "Please tell me your full name so we can be friends."
            : "Hey! What's your name??"}
        </p>
        <img src="./assets/intro/pikachu.gif" alt="" />
      </div>
      <Box
        sx={{
          display: "flex",
          alignSelf: "center",
          justifyContent: "center",
        }}
      >
        <TextField
          required
          focused={errorMessage && name.first === ""}
          id="input-first-name"
          label="First name"
          variant="standard"
          onChange={(e) => dispatch(firstName(e.target.value))}
          value={useSelector((state) => state.user.name.first)}
        />
        <TextField
          required
          focused={errorMessage && name.last === ""}
          sx={{ marginLeft: "20px" }}
          id="input-last-name"
          label="Last name"
          variant="standard"
          onChange={(e) => dispatch(lastName(e.target.value))}
          value={useSelector((state) => state.user.name.last)}
        />
      </Box>
    </div>
  );
};

export default UserName;
