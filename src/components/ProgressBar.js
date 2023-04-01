import { useSelector } from "react-redux";
// MUI imports
import LinearProgress from "@mui/material/LinearProgress";
import CheckCircleTwoToneIcon from "@mui/icons-material/CheckCircleTwoTone";
import CatchingPokemonTwoToneIcon from "@mui/icons-material/CatchingPokemonTwoTone";
import PlayCircleFilledWhiteTwoToneIcon from "@mui/icons-material/PlayCircleFilledWhiteTwoTone";
import { Button } from "@mui/material";

const ProgressBar = () => {
  const progress = useSelector((state) => state.user.progress);
  return (
    <div className="progressBarContainer wrapper">
      <div className="progressBarContact">
        <Button className="milestoneStart milestoneIcon">
          <PlayCircleFilledWhiteTwoToneIcon sx={{ color: "green" }} />
        </Button>
        <Button className="milestoneName milestoneIcon">
          {progress >= 20 ? (
            <CheckCircleTwoToneIcon sx={{ color: "green" }} />
          ) : (
            <CatchingPokemonTwoToneIcon />
          )}
        </Button>
        <Button className="milestonePhone milestoneIcon">
          {progress >= 40 ? (
            <CheckCircleTwoToneIcon sx={{ color: "green" }} />
          ) : (
            <CatchingPokemonTwoToneIcon />
          )}
        </Button>
        <Button className="milestoneAddress milestoneIcon">
          {progress >= 60 ? (
            <CheckCircleTwoToneIcon sx={{ color: "green" }} />
          ) : (
            <CatchingPokemonTwoToneIcon />
          )}
        </Button>
        <Button className="milestoneComplete milestoneIcon">
          {progress === 100 ? (
            <CheckCircleTwoToneIcon sx={{ color: "green" }} />
          ) : (
            <CatchingPokemonTwoToneIcon />
          )}
        </Button>
        <LinearProgress
          sx={{ height: "20px" }}
          variant="determinate"
          value={useSelector((state) => state.user.progress)}
        />
      </div>
    </div>
  );
};

export default ProgressBar;
