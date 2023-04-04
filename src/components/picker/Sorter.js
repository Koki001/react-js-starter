// alphabetical and id sorter for pokemon list
import KeyboardDoubleArrowUpIcon from "@mui/icons-material/KeyboardDoubleArrowUp";
import KeyboardDoubleArrowDownIcon from "@mui/icons-material/KeyboardDoubleArrowDown";

const Sorter = (props) => {
  const idCheck = /\/(\d+)\/$/;
  const handleSort = (e) => {
    if (e.target.id === "ascAZ") {
      props.sorter(props.dataProp.sort((a, b) => a.name.localeCompare(b.name)));
    } else if (e.target.id === "descAZ") {
      props.sorter(props.dataProp.sort((a, b) => b.name.localeCompare(a.name)));
    } else if (e.target.id === "ascID") {
      props.sorter(
        props.dataProp.sort(
          (a, b) => a.url.match(idCheck)[1] - b.url.match(idCheck)[1]
        )
      );
    } else if (e.target.id === "descID") {
      props.sorter(
        props.dataProp.sort(
          (a, b) => b.url.match(idCheck)[1] - a.url.match(idCheck)[1]
        )
      );
    }
  };
  return (
    <div className="sort">
      <h4>Sort:</h4>
      <div className="nameSort">
        <p>a-z</p>
        <div>
          <div className="azBtn">
            <input className="sr-only" type="radio" id="asc" name="sort" />
            <label id="ascAZ" htmlFor="asc" onClick={handleSort}>
              <KeyboardDoubleArrowUpIcon />
            </label>
          </div>
          <div className="azBtn">
            <input className="sr-only" type="radio" id="desc" name="sort" />
            <label id="descAZ" htmlFor="desc" onClick={handleSort}>
              <KeyboardDoubleArrowDownIcon />
            </label>
          </div>
        </div>
      </div>
      <div className="idSort">
        <p>id</p>
        <div>
          <div className="azBtn">
            <input className="sr-only" type="radio" id="ascid" name="sort" />
            <label htmlFor="ascid" id="ascID" onClick={handleSort}>
              <KeyboardDoubleArrowUpIcon />
            </label>
          </div>
          <div className="azBtn">
            <input className="sr-only" type="radio" id="descid" name="sort" />
            <label id="descID" htmlFor="descid" onClick={handleSort}>
              <KeyboardDoubleArrowDownIcon />
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sorter;
