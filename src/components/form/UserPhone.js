import { useDispatch, useSelector } from "react-redux";
import { phone } from "../../redux/slices/userSlice";
// MUI imports
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";

const UserPhone = () => {
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
        id="input-phone-number"
        label="Phone number"
        variant="standard"
        onChange={(e) => dispatch(phone(e.target.value))}
        value={useSelector((state) => state.user.phone)}
      />
    </Box>
  );
};

export default UserPhone;
