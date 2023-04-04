// single pokemon detailed view
const SingleCard = (props) => {
  if (props.pokemon.single.name) {
    return (
      <div className="singlePokemon">
        <div className="singleTop">
          <div className="singleStats">
            <p>ID: {props.pokemon.single.id}</p>
            <p>Name: {props.pokemon.single.name}</p>
            {props.pokemon.single.stats.map((stat, index) => {
              return (
                <p key={`key${index}pokemon`}>
                  {stat.stat.name}: {stat.base_stat}
                </p>
              );
            })}
          </div>
          <div className="singleImage">
            <img
              onClick={() => console.log(props.pokemon.single)}
              src={`./assets/officialArtwork/${props.pokemon.single.id}.png`}
              alt={`image of ${props.pokemon.single.name}`}
            />
          </div>
        </div>
        <div className="singleButtons">
          <button onClick={() => props.exit([])}>back</button>
          <button>choose</button>
        </div>
      </div>
    );
  } 
};

export default SingleCard;
