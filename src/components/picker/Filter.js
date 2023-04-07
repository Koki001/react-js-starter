// search filter for pokemon list
import { TextField } from "@mui/material";
const Filter = (props) => {
  return (
    <div className="search">
      <TextField
        label="Filter name / ID"
        variant="outlined"
        size="small"
        placeholder="Pokemon name or ID"
        onChange={(e) => props.filter(e.target.value)}
        type="text"
        id="pokeName"
        disabled={props.loaderProp}
      ></TextField>
    </div>
  );
};
export default Filter;
