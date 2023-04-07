// search filter for pokemon list
import { useState } from "react";
// MUI imports
import { Button } from "@mui/material";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import SearchIcon from "@mui/icons-material/Search";
const Searcher = (props) => {
  const [name, setName] = useState("");
  const [id, setId] = useState("");
  const [resetName, setResetName] = useState(99);
  const [resetId, setResetId] = useState(0);

  const handleName = (e) => {
    setResetId(resetId + 1);
    setId("");
    setName(e.target.textContent);
  };
  const handleId = (e) => {
    setResetName(resetName + 1);
    setName("");
    setId(e.target.textContent);
  };

  const handleSearch = () => {
    if (name !== "" && id === "") {
      props.callAxios(name);
    } else if (id !== "" && name === "") {
      props.callAxios(id);
    }
  };
  return (
    <div className="searchContainer">
      <Autocomplete
        onChange={handleName}
        key={resetName}
        id="free-solo-name"
        size="small"
        fullWidth
        freeSolo
        options={props.names?.map((name) => name.name)}
        sx={{ minWidth: "200px" }}
        renderInput={(params) => (
          <TextField {...params} label="Search by name" variant="outlined" />
        )}
      />
      <Autocomplete
        onChange={handleId}
        key={resetId}
        size="small"
        id="free-solo-id"
        fullWidth
        freeSolo
        options={props.ids?.map((id) => id)}
        sx={{ width: "160px", minWidth: "160px"}}
        renderInput={(params) => (
          <TextField {...params} label="Search by ID" variant="outlined" />
        )}
      />
      <Button className="searcherButton" onClick={handleSearch}>
        <SearchIcon />
      </Button>
    </div>
  );
};
export default Searcher;
