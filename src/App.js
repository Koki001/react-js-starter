// MUI imports
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <h1>Pickachu</h1>
      <p>welcome message</p>
      <Button variant="outlined">
        <Link to={"/form"} >Get Started</Link>
      </Button>
    </div>
  );
}

export default App;
