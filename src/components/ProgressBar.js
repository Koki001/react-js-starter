import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { progressCurrent, clear } from "../redux/slices/userSlice";
// MUI imports
import { Button } from "@mui/material";
import LinearProgress from "@mui/material/LinearProgress";
import HelpTwoToneIcon from "@mui/icons-material/HelpTwoTone";
import CheckCircleTwoToneIcon from "@mui/icons-material/CheckCircleTwoTone";
import CatchingPokemonTwoToneIcon from "@mui/icons-material/CatchingPokemonTwoTone";

const ProgressBar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const user = useSelector((state) => state.user);
  const step = useSelector((state) => state.user.step);
  const progress = useSelector((state) => state.user.progress);
  useEffect(() => {
    if (step <= 3) {
      const weight = 100 / 2;
      const value = weight * step;
      dispatch(progressCurrent(value));
    }
  }, [step]);

  const handleRevisit = (e) => {
    // navigate(`/get-started`);
    // dispatch(forceStep(Number(e.target.value)))
  };
  const handleClearDev = () => {
    dispatch(clear());
    navigate("/");
  };
  const handlePicker = () => {
    // navigate({ pathname: "/picker", search: searchParams.toString() });
  };
  return (
    <div className="progressBarContainer wrapper">
      <Button onClick={handleClearDev} className="homeButton">
        CLEAR
      </Button>
      <div className="progressBarContact">
        <Button
          onClick={handleRevisit}
          value={0}
          className="milestoneName milestoneIcon"
        >
          <p>name</p>
          {progress >= 20 && step > 0 ? (
            <CheckCircleTwoToneIcon sx={{ color: "green" }} />
          ) : step === 0 ? (
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
          {progress >= 40 && step > 1 ? (
            <CheckCircleTwoToneIcon sx={{ color: "green" }} />
          ) : step === 1 ? (
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
          {progress === 100 && user.completed ? (
            <CheckCircleTwoToneIcon sx={{ color: "green" }} />
          ) : step === 2 ? (
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
      <Button onClick={handlePicker} className="pickButton">
        PICK
      </Button>
    </div>
  );
};

export default ProgressBar;
