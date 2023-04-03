import axios from "axios";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import ProgressBar from "../components/ProgressBar";
import { useDispatch, useSelector } from "react-redux";

const PokemonPick = () => {
  const dispatch = useDispatch()
  const [cancel, setCancel] = useState(false)
  let pokemonData = [];
  useEffect(() => {

      axios({
        url: `https://pokeapi.co/api/v2/type`,
      })
        .then((response) => {
          // pokemonData.push(response.data);
          console.log(response.data)
        })
        .catch((error) => {
          console.log(error);
        });


  }, []);
  // console.log(useSelector((state) => state.pokemon))

  return (
    <div className="pickContainer">
      <ProgressBar />
      <div className="pokemonContainer">
        <Link to={"/get-started"}>get started</Link>
        <form action="" className="pokeForm"></form>
      </div>
    </div>
  );
};

export default PokemonPick;
