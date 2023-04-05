const LoaderDark = () => {
  return (
    <div onMouseEnter={(e) => e.stopPropagation()} className="loader dark">
      <div className="pokeball"></div>
      <span className="pokeballSpan">Loading ...</span>
    </div>
  );
};
export default LoaderDark;
