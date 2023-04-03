import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { forceStep, progressCurrent } from "../redux/slices/userSlice";
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
  useEffect(() => {
    const weight = 100 / 5;
    const value = weight * step;
    if (step < 6) {
      dispatch(progressCurrent(value));
    }
  }, [step]);
  const handleRevisit = (e) => {
    if (
      location.pathname === "/pokemon-picker" ||
      location.pathname === "/pokemon-quiz"
    ) {
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
  const handleHome = () => {
    navigate("/");
  };
  return (
    <div className="progressBarContainer wrapper">
      <div className="progressBarContact">
        <Button onClick={handleHome} className="milestoneStart milestoneIcon">
          <PlayCircleFilledWhiteTwoToneIcon sx={{ color: "green" }} />
        </Button>
        <Button
          onClick={handleRevisit}
          value={1}
          className="milestoneName milestoneIcon"
        >
          <p>name</p>
          {progress >= 20 && step > 1 ? (
            <CheckCircleTwoToneIcon sx={{ color: "green" }} />
          ) : progress === 20 && step === 1 ? (
            <HelpTwoToneIcon />
          ) : (
            <CatchingPokemonTwoToneIcon />
          )}
        </Button>
        <Button
          onClick={handleRevisit}
          value={2}
          className="milestonePhone milestoneIcon"
        >
          <p>phone</p>
          {progress >= 40 && step > 2 ? (
            <CheckCircleTwoToneIcon sx={{ color: "green" }} />
          ) : progress === 40 && step === 2 ? (
            <HelpTwoToneIcon />
          ) : (
            <CatchingPokemonTwoToneIcon />
          )}
        </Button>
        <Button
          onClick={handleRevisit}
          value={3}
          className="milestoneAddress milestoneIcon"
        >
          <p>address</p>
          {progress >= 60 && step > 3 ? (
            <CheckCircleTwoToneIcon sx={{ color: "green" }} />
          ) : progress === 60 && step === 3 ? (
            <HelpTwoToneIcon />
          ) : (
            <CatchingPokemonTwoToneIcon />
          )}
        </Button>
        <Button
          onClick={handleRevisit}
          value={4}
          className="milestoneQuiz milestoneIcon"
        >
          <p>quiz</p>
          {progress >= 80 && step > 4 ? (
            <CheckCircleTwoToneIcon sx={{ color: "green" }} />
          ) : progress === 80 && step === 4 ? (
            <HelpTwoToneIcon />
          ) : (
            <CatchingPokemonTwoToneIcon />
          )}
        </Button>
        <Button
          onClick={handleRevisit}
          value={5}
          className="milestoneComplete milestoneIcon"
        >
          <p>X</p>
          {progress >= 100 && step > 5 ? (
            <CheckCircleTwoToneIcon sx={{ color: "green" }} />
          ) : progress === 100 && step === 5 ? (
            <HelpTwoToneIcon />
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
