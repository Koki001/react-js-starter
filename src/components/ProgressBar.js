import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { forceStep } from "../redux/slices/userSlice";
// MUI imports
import { Button } from "@mui/material";
import LinearProgress from "@mui/material/LinearProgress";
import HelpTwoToneIcon from "@mui/icons-material/HelpTwoTone";
import CheckCircleTwoToneIcon from "@mui/icons-material/CheckCircleTwoTone";
import CatchingPokemonTwoToneIcon from "@mui/icons-material/CatchingPokemonTwoTone";
import PlayCircleFilledWhiteTwoToneIcon from "@mui/icons-material/PlayCircleFilledWhiteTwoTone";

const ProgressBar = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  // const user = useSelector((state) => state.user);
  const step = useSelector((state) => state.user.step);
  const progress = useSelector((state) => state.user.progress);
  const handleRevisit = (e) => {
    if (location.pathname === "/pokemon-picker") {
      navigate("/get-started");
      if (Number(e.target.value) <= step) {
        dispatch(forceStep(Number(e.target.value)));
      } else {
        console.log("no");
      }
    } else {
      if (Number(e.target.value) <= step) {
        dispatch(forceStep(Number(e.target.value)));
      } else {
        console.log("no");
      }
    }
  };
  return (
    <div className="progressBarContainer wrapper">
      <div className="progressBarContact">
        <Button className="milestoneStart milestoneIcon">
          <PlayCircleFilledWhiteTwoToneIcon sx={{ color: "green" }} />
        </Button>
        <Button
          onClick={handleRevisit}
          value={0}
          className="milestoneName milestoneIcon"
        >
          <p>name</p>
          {progress >= 20 && step > 0 ? (
            <CheckCircleTwoToneIcon sx={{ color: "green" }} />
          ) : progress < 20 && step === 0 ? (
            <HelpTwoToneIcon />
          ) : (
            <CatchingPokemonTwoToneIcon />
          )}
        </Button>
        <Button
          onClick={handleRevisit}
          value={1}
          className="milestonePhone milestoneIcon"
        >
          <p>phone</p>
          {progress >= 40 ? (
            <CheckCircleTwoToneIcon sx={{ color: "green" }} />
          ) : progress < 40 && step === 1 ? (
            <HelpTwoToneIcon />
          ) : (
            <CatchingPokemonTwoToneIcon />
          )}
        </Button>
        <Button
          onClick={handleRevisit}
          value={2}
          className="milestoneAddress milestoneIcon"
        >
          <p>address</p>
          {progress >= 60 ? (
            <CheckCircleTwoToneIcon sx={{ color: "green" }} />
          ) : progress < 60 && step === 2 ? (
            <HelpTwoToneIcon />
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
