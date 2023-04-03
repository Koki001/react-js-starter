import {useAutocomplete} from "../../api/useAxios";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { address } from "../../redux/slices/userSlice";
// MUI imports
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";

const UserAddress = () => {
  const [load, setLoad] = useState(true)
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const { result, error, loading } = useAutocomplete(
    useSelector((state) => state.user.address)
  );
  if (error) {
    alert(error);
  }
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
      <Box
        sx={{
          display: "flex",
          alignItems: "flex-end",
          justifyContent: "center",
          width: "100%",
          backgroundColor: "#ece5ce8c",
          borderRadius: "10px",
          padding: "5px",
        }}
      >
        <Autocomplete
          onChange={(e) => dispatch(address(e.target.textContent))}
          id="free-solo-demo"
          fullWidth
          freeSolo
          options={result.map((option) => option.displayString)}
          value={user.address}
          renderInput={(params) => (
            <TextField
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
