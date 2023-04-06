import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { forceStep } from "./redux/slices/userSlice";
// MUI imports
import { Button } from "@mui/material";

function App() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleStart = () => {
    dispatch(forceStep(0));
    navigate(`/get-started`);
  };
  return (
    <div className="App wrapper">
      <div className="landingContainer wrapper">
        <h1>Pick-a-mon</h1>
        <p>
          Welcome to our Pokemon selection application! We're thrilled to help you discover and select your favorite Pokemon. With a vast
          selection of Pokemon to choose from, we're sure you'll have a blast
          exploring and discovering new favorites. Let's get started on this
          exciting journey together!
        </p>
      <Button onClick={handleStart} variant="outlined">
        Get Started
      </Button>
      </div>
    </div>
  );
}

export default App;
