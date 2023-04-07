import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  progressCurrent,
  clear,
  completeAddress,
  completeName,
  completePhone,
  saveStamp,
} from "../redux/slices/userSlice";
import { useKonami } from "react-konami-code";
// MUI imports
import { Button } from "@mui/material";
import LinearProgress from "@mui/material/LinearProgress";
import HelpTwoToneIcon from "@mui/icons-material/HelpTwoTone";
import CheckCircleTwoToneIcon from "@mui/icons-material/CheckCircleTwoTone";
import Tooltip from "@mui/material/Tooltip";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

const ProgressBar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const completion = useSelector((state) => state.user.completion);
  const step = useSelector((state) => state.user.step);
  const user = useSelector((state) => state.user);
  const [open, setOpen] = useState(false);
  const [popup, setPopup] = useState(false);
  const [saved, setSaved] = useState(0);
  const easterEgg = () => {
    navigate({ pathname: "/secret", search: searchParams.toString() });
  };
  useKonami(easterEgg);
  const handleTooltipClose = () => {
    setOpen(false);
  };
  const handleTooltipOpen = () => {
    setOpen(true);
    dispatch(saveStamp());
    navigator.clipboard.writeText(window.location.href);
  };
  useEffect(() => {
    if (step < 3) {
      let count = 0;
      if (searchParams.has("first") && searchParams.has("last")) {
        dispatch(completeName(true));
      } else {
        dispatch(completeName(false));
      }
      if (searchParams.has("phone")) {
        dispatch(completePhone(true));
      } else {
        dispatch(completePhone(false));
      }
      if (searchParams.has("address")) {
        dispatch(completeAddress(true));
      } else {
        dispatch(completeAddress(false));
      }
      Object.keys(completion).forEach((task) => {
        if (completion[task].completed === true) {
          count = count + 50;
        }
        if (count <= 100) {
          dispatch(progressCurrent(count));
        }
      });
    }
  }, [completion]);
  const handleClearDev = () => {
    // alert(`last saved ${seconds.toFixed(0)} seconds ago`);
    dispatch(clear());
    navigate("/");
  };
  const handleClose = () => {
    setPopup(false);
  };
  const handleOpen = () => {
    setPopup(true);
    let now = new Date();
    let saved = new Date(Number(user.saved));
    let seconds = (now.getTime() - saved.getTime()) / 1000;
    setSaved(seconds);
  };
  const handleRevisit = (e) => {
    // navigate(`/get-started`);
    // dispatch(forceStep(Number(e.target.value)))
  };
  const handlePicker = () => {
    navigate({ pathname: "/picker", search: searchParams.toString() });
  };
  return (
    <div className="progressBarContainer wrapper">
      <Button onClick={handleOpen} className="homeButton"></Button>
      <Dialog
        open={popup}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Clear progress?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Going to the home screen will clear all progress.
            {saved === 0
              ? "Save your progress by clicking the pokeball on the top right of your screen."
              : ` You last saved your progress ${saved.toFixed()} seconds ago.`}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleClearDev} autoFocus>
            Exit
          </Button>
        </DialogActions>
      </Dialog>
      <div className="progressBarContact">
        <Button
          onClick={handleRevisit}
          value={0}
          className="milestoneName milestoneIcon"
        >
          <p>name</p>
          {completion.name.completed ? (
            <CheckCircleTwoToneIcon sx={{ color: "green" }} />
          ) : (
            <HelpTwoToneIcon />
          )}
        </Button>
        <Button
          onClick={handleRevisit}
          value={1}
          className="milestonePhone milestoneIcon"
        >
          <p>phone</p>
          {completion.phone.completed ? (
            <CheckCircleTwoToneIcon sx={{ color: "green" }} />
          ) : (
            <HelpTwoToneIcon />
          )}
        </Button>
        <Button
          onClick={handleRevisit}
          value={2}
          className="milestoneAddress milestoneIcon"
        >
          <p>address</p>
          {completion.address.completed ? (
            <CheckCircleTwoToneIcon sx={{ color: "green" }} />
          ) : (
            <HelpTwoToneIcon />
          )}
        </Button>
        <LinearProgress
          sx={{ height: "20px" }}
          variant="determinate"
          value={useSelector((state) => state.user.progress)}
        />
      </div>
      <ClickAwayListener onClickAway={handleTooltipClose}>
        <div>
          <Tooltip
            PopperProps={{
              disablePortal: true,
            }}
            onClose={handleTooltipClose}
            open={open}
            disableFocusListener
            disableHoverListener
            disableTouchListener
            title="copied to clipboard"
          >
            <Button className="pickButton" onClick={handleTooltipOpen}>
              {" "}
              <img src="./assets/animated/picker.gif" />
              save progress
            </Button>
          </Tooltip>
        </div>
      </ClickAwayListener>
    </div>
  );
};

export default ProgressBar;
