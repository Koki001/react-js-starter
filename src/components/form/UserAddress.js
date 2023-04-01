import useAxios from "../../api/useAxios";
import { useDispatch, useSelector } from "react-redux";
import { address } from "../../redux/slices/userSlice";
// MUI imports
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";

const UserAddress = () => {
  const dispatch = useDispatch();
  const { result, error, loading } = useAxios(
    useSelector((state) => state.user.address)
  );
  if (error) {
    alert(error);
  }
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "flex-end",
        justifyContent: "center",
      }}
    >
      <Autocomplete
        onChange={(e) => dispatch(address(e.target.textContent))}
        id="free-solo-demo"
        fullWidth
        freeSolo
        options={result.map((option) => option.displayString)}
        value={useSelector((state) => state.user.address)}
        renderInput={(params) => (
          <TextField
            {...params}
            required
            label="Address"
            variant="standard"
            onChange={(e) => dispatch(address(e.target.value))}
          />
        )}
      />
    </Box>
  );
};

export default UserAddress;
