// single pokemon detailed view
import Loader from "../../helpers/Loader";

const SingleCard = (props) => {
  if (props.pokemon.single.name) {
    return (
      <div className="singlePokemon">
        <div className="singleTop">
          <div className="singleStats">
            <div>
              <h4>id: </h4>
              <div className="statWrapper">
                <span># {props.pokemon.single.id}</span>
              </div>
            </div>
            <div>
              <h4>name: </h4>
              <div className="statWrapper">
                <span>{props.pokemon.single.name}</span>
              </div>
            </div>
            <div>
              <h4>type:</h4>
              <div className="typeContainer">
                {props.pokemon.single.types.map((type, index) => {
                  return (
                    <div className="typeWrapper" key={index + "type"}>
                      {index === 1 ? " , " : ""}
                      <img
                        className="pokeIcon"
                        src={`./assets/iconPack/${type.type.name}.png`}
                        alt=""
                      />
                      <span>{type.type.name}</span>
                    </div>
                  );
                })}
              </div>
            </div>
            {props.pokemon.single.stats.map((stat, index) => {
              return (
                <div key={`key${index}pokemon`}>
                  <h4>{stat.stat.name}: </h4>
                  <div className="statWrapper">
                    <img
                      className="pokeIcon"
                      src={`./assets/iconPack/${stat.stat.name}.png`}
                      alt=""
                    />
                    <span>{stat.base_stat}</span>
                  </div>
                </div>
              );
            })}
            <div>
              <h4>weight: </h4>
              <div className="statWrapper">
                <img
                  className="pokeIcon"
                  src="./assets/iconPack/weight.png"
                  alt=""
                />
                <span>{props.pokemon.single.weight}</span>
              </div>
            </div>
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
