import { useState, useEffect } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { forceStep } from "./redux/slices/userSlice";
import { useKonami } from "react-konami-code";
// MUI imports
import { Button } from "@mui/material";

function App() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const easterEgg = () => {
    navigate({ pathname: "/secret", search: searchParams.toString() });
  };
  useKonami(easterEgg);
  const handleStart = () => {
    dispatch(forceStep(0));
    navigate({ pathname: "/get-started", search: searchParams.toString() });
  };
  return (
    <div className="App wrapper">
      <div className="landingContainer wrapper">
        <h1>Pick-a-mon</h1>
        <p>
          Welcome to our Pokemon selection application! We're thrilled to help
          you <strong>discover</strong> and <strong>select</strong> your{" "}
          <strong>favorite Pokemon</strong>. With a vast selection of Pokemon to
          choose from, we're sure you'll have a blast exploring and discovering
          new favorites. Let's get started on this exciting journey together!
        </p>
        <Button onClick={handleStart} variant="outlined">
          Get Started
        </Button>
      </div>
    </div>
  );
}

export default App;
