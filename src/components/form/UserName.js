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
          justifyContent: "space-between",
          backgroundColor: "#ece5ce8c",
          borderRadius: "10px",
          padding: "5px",
          width: "auto",
        }}
      >
        <TextField
          required
          focused={errorMessage && name.first === ""}
          sx={{ width: "50%" }}
          id="input-first-name"
          label="First name"
          variant="outlined"
          onChange={(e) => dispatch(firstName(e.target.value))}
          value={useSelector((state) => state.user.name.first)}
        />
        <TextField
          required
          focused={errorMessage && name.last === ""}
          sx={{ marginLeft: "20px", width: "50%" }}
          id="input-last-name"
          label="Last name"
          variant="outlined"
          onChange={(e) => dispatch(lastName(e.target.value))}
          value={useSelector((state) => state.user.name.last)}
        />
      </Box>
    </div>
  );
};

export default UserName;
