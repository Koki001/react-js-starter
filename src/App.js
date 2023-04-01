import { Link } from "react-router-dom";
import { Button } from "@mui/material";

function App() {
  return (
    <div className="App wrapper">
      <h1>Pickachu</h1>
      <p>welcome message</p>
      <Button variant="outlined">
        <Link to={"/get-started"}>Get Started</Link>
      </Button>
    </div>
  );
}

export default App;
