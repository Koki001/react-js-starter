import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import { useDispatch, useSelector } from "react-redux";
import { forceStep } from "./redux/slices/userSlice";
// MUI imports
import { Button } from "@mui/material";

function App() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.userId) {
     localStorage.setItem("userId", uuidv4())
    }
  }, []);

  const handleStart = () => {
    dispatch(forceStep(0));
    navigate(`/${localStorage.getItem("userId")}/name`);
  };
  return (
    <div className="App wrapper">
      <h1>Pickachu</h1>
      <p>welcome message</p>
      <Button onClick={handleStart} variant="outlined">
        Get Started
      </Button>
    </div>
  );
}

export default App;
