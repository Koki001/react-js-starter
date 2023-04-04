const Loader = () => {
  return (
    <div onMouseEnter={(e) => e.stopPropagation()} className="loader">
      <div className="pokeball"></div>
      <span className="pokeballSpan">Loading ...</span>
    </div>
  );
};
export default Loader;
