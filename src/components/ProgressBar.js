import { useSelector } from "react-redux";
// MUI imports
import Box from "@mui/material/Box";
import LinearProgress from "@mui/material/LinearProgress";

const ProgressBar = () => {
  return (
    <Box sx={{ width: "100%", height: "30px" }}>
      <LinearProgress variant="determinate" value={useSelector((state) => state.user.completed)} />
    </Box>
  );
};

export default ProgressBar;
