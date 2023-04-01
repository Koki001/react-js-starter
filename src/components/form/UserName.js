import { useDispatch, useSelector } from "react-redux";
import { firstName, lastName } from "../../redux/slices/userSlice";
// MUI imports
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";

const UserName = () => {
  const dispatch = useDispatch();
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "flex-end",
        justifyContent: "center",
      }}
    >
      <TextField
        required
        id="input-first-name"
        label="First name"
        variant="standard"
        onChange={(e) => dispatch(firstName(e.target.value))}
        value={useSelector((state) => state.user.name.first)}
      />
      <TextField
        required
        sx={{ marginLeft: "20px" }}
        id="input-last-name"
        label="Last name"
        variant="standard"
        onChange={(e) => dispatch(lastName(e.target.value))}
        value={useSelector((state) => state.user.name.last)}
      />
    </Box>
  );
};

export default UserName;
