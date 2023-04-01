import { useSelector } from "react-redux";
// MUI imports
import LinearProgress from "@mui/material/LinearProgress";
import CheckCircleTwoToneIcon from "@mui/icons-material/CheckCircleTwoTone";

const ProgressBar = () => {
  return (
    <div className="progressBarContainer wrapper">
      <div className="progressBarContact">
        <LinearProgress
          sx={{ height: "30px" }}
          variant="determinate"
          value={useSelector((state) => state.user.progress)}
        />
      </div>
      <div className="contactMilestone">
        <CheckCircleTwoToneIcon />
      </div>
      <div className="progressBarPicks">
        <LinearProgress
          sx={{ height: "30px" }}
          variant="determinate"
          value={0}
        />
      </div>
    </div>
  );
};

export default ProgressBar;
