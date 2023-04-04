// search filter for pokemon list
const Search = (props) => {
  return (
    <div className="search">
      <label style={{ fontWeight: "bolder" }} htmlFor="pokeName">
        Search:{" "}
      </label>
      <input
        placeholder="Pokemon name or ID"
        onChange={(e) => props.searcher(e.target.value)}
        type="text"
        id="pokeName"
        disabled={props.loaderProp}
      />
    </div>
  );
};
export default Search;
