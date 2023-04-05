import { useEffect } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { forceStep, progressCurrent } from "../redux/slices/userSlice";
// MUI imports
import { Button } from "@mui/material";
import LinearProgress from "@mui/material/LinearProgress";
import HelpTwoToneIcon from "@mui/icons-material/HelpTwoTone";
import CheckCircleTwoToneIcon from "@mui/icons-material/CheckCircleTwoTone";
import CatchingPokemonTwoToneIcon from "@mui/icons-material/CatchingPokemonTwoTone";
import EmojiEventsTwoToneIcon from "@mui/icons-material/EmojiEventsTwoTone";
import PlayCircleFilledWhiteTwoToneIcon from "@mui/icons-material/PlayCircleFilledWhiteTwoTone";

const ProgressBar = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const { id, stage } = useParams();
  // const user = useSelector((state) => state.user);
  const step = useSelector((state) => state.user.step);
  const progress = useSelector((state) => state.user.progress);
  useEffect(() => {
    const weight = 100 / 5;
    const value = weight * (step + 1);

    dispatch(progressCurrent(value));
  }, [step]);

  const handleRevisit = (e) => {
    console.log(e.target)
    if (e.target.value === "picker") {
      navigate(`/${id}/${e.target.value}`);
    } else if (e.target.value === "encounter") {
      navigate(`/${id}/${e.target.value}`);
    } else if (e.target.value === "name") {
      dispatch(forceStep(0));
      navigate(`/${id}/${e.target.value}`);
    } else if (e.target.value === "phone") {
      dispatch(forceStep(1));
      navigate(`/${id}/${e.target.value}`);
    } else if (e.target.value === "address") {
      dispatch(forceStep(2));
      navigate(`/${id}/${e.target.value}`);
    } else {
      dispatch(forceStep(0));
      navigate(`/`);
    }
  };

  return (
    <div className="progressBarContainer wrapper">
      <div className="progressBarContact">
        <Button
          onClick={handleRevisit}
          className="milestoneStart milestoneIcon"
        >
          <p>home</p>
          <PlayCircleFilledWhiteTwoToneIcon sx={{ color: "green" }} />
        </Button>
        <Button
          onClick={handleRevisit}
          value={"name"}
          className="milestoneName milestoneIcon"
        >
          <p>name</p>
          {progress >= 20 && step > 0 ? (
            <CheckCircleTwoToneIcon sx={{ color: "green" }} />
          ) : progress === 20 && step === 0 ? (
            <HelpTwoToneIcon />
          ) : (
            <CatchingPokemonTwoToneIcon />
          )}
        </Button>
        <Button
          onClick={handleRevisit}
          value={"phone"}
          className="milestonePhone milestoneIcon"
        >
          <p>phone</p>
          {progress >= 40 && step > 1 ? (
            <CheckCircleTwoToneIcon sx={{ color: "green" }} />
          ) : progress === 40 && step === 1 ? (
            <HelpTwoToneIcon />
          ) : (
            <CatchingPokemonTwoToneIcon />
          )}
        </Button>
        <Button
          onClick={handleRevisit}
          value={"address"}
          className="milestoneAddress milestoneIcon"
        >
          <p>address</p>
          {progress >= 60 && step > 2 ? (
            <CheckCircleTwoToneIcon sx={{ color: "green" }} />
          ) : progress === 60 && step === 2 ? (
            <HelpTwoToneIcon />
          ) : (
            <CatchingPokemonTwoToneIcon />
          )}
        </Button>
        <Button
          onClick={handleRevisit}
          value={"encounter"}
          className="milestoneQuiz milestoneIcon"
        >
          <p>encounter</p>
          {progress >= 80 && step > 3 ? (
            <CheckCircleTwoToneIcon sx={{ color: "blue" }} />
          ) : progress === 80 && step === 3 ? (
            <HelpTwoToneIcon />
          ) : (
            <CatchingPokemonTwoToneIcon sx={{ color: "blue" }} />
          )}
        </Button>
        <Button
          onClick={handleRevisit}
          value={"picker"}
          className="milestoneComplete milestoneIcon"
        >
          <p>finish</p>
          {progress >= 100 && step > 4 ? (
            <EmojiEventsTwoToneIcon sx={{ color: "green" }} />
          ) : progress === 100 && step === 4 ? (
            <HelpTwoToneIcon />
          ) : (
            <EmojiEventsTwoToneIcon />
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
