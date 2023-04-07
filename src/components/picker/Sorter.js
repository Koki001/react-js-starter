// alphabetical and id sorter for pokemon list
import { useSearchParams } from "react-router-dom";
// MUI imports
import KeyboardDoubleArrowUpIcon from "@mui/icons-material/KeyboardDoubleArrowUp";
import KeyboardDoubleArrowDownIcon from "@mui/icons-material/KeyboardDoubleArrowDown";

const Sorter = (props) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const idCheck = /\/(\d+)\/$/;
  const handleSort = (e) => {
    console.log(e.target.checked)
    if (e.target.id === "asc") {
      props.sorter(props.dataProp.sort((a, b) => a.name.localeCompare(b.name)));
      searchParams.set("sort", "az-ascending");
      setSearchParams(searchParams);
    } else if (e.target.id === "desc") {
      props.sorter(props.dataProp.sort((a, b) => b.name.localeCompare(a.name)));
      searchParams.set("sort", "az-descending");
      setSearchParams(searchParams);
    } else if (e.target.id === "ascid") {
      props.sorter(
        props.dataProp.sort(
          (a, b) => a.url.match(idCheck)[1] - b.url.match(idCheck)[1]
        )
      );
      searchParams.set("sort", "id-ascending");
      setSearchParams(searchParams);
    } else if (e.target.id === "descid") {
      props.sorter(
        props.dataProp.sort(
          (a, b) => b.url.match(idCheck)[1] - a.url.match(idCheck)[1]
        )
      );
      searchParams.set("sort", "id-descending");
      setSearchParams(searchParams);
    }
  };
  return (
    <div className="sort">
      <div className="nameSort">
        <p>A-Z</p>
        <div>
          <div className="azBtn">
            <input
              onChange={handleSort}
              // checked={searchParams.get("sort") === "az-ascending"}
              className="sr-only"
              type="radio"
              id="asc"
              name="sort"
            />
            <label id="ascAZ" htmlFor="asc">
              <KeyboardDoubleArrowUpIcon />
            </label>
          </div>
          <div className="azBtn">
            <input
              onChange={handleSort}
              // checked={searchParams.get("sort") === "az-descending"}
              className="sr-only"
              type="radio"
              id="desc"
              name="sort"
            />
            <label id="descAZ" htmlFor="desc">
              <KeyboardDoubleArrowDownIcon />
            </label>
          </div>
        </div>
      </div>
      <div className="idSort">
        <p>ID</p>
        <div>
          <div className="azBtn">
            <input
              onChange={handleSort}
              className="sr-only"
              type="radio"
              id="ascid"
              name="sort"
              // checked={searchParams.get("sort") === "id-ascending"}
            />
            <label htmlFor="ascid" id="ascID">
              <KeyboardDoubleArrowUpIcon />
            </label>
          </div>
          <div className="azBtn">
            <input
              onChange={handleSort}
              // checked={searchParams.get("sort") === "id-descending"}
              className="sr-only"
              type="radio"
              id="descid"
              name="sort"
            />
            <label id="descID" htmlFor="descid">
              <KeyboardDoubleArrowDownIcon />
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sorter;
