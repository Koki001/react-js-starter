import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { nextStep } from "./redux/slices/progressSlice";
// MUI imports
import { Button } from "@mui/material";

function App() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const handleStart = () => {
    dispatch(nextStep())
    navigate("/get-started")
  }
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
