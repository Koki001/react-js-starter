import axios from "axios";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import ProgressBar from "../components/ProgressBar";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../components/Loader";
import { Tilt } from "react-tilt";
// MUI imports
import { Button } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import KeyboardDoubleArrowUpIcon from "@mui/icons-material/KeyboardDoubleArrowUp";
import KeyboardDoubleArrowDownIcon from "@mui/icons-material/KeyboardDoubleArrowDown";

const PokemonPick = () => {
  const idCheck = /\/(\d+)\/$/;
  const [loader, setLoader] = useState(false);
  const [visited, setVisited] = useState(false);
  const [pokemon, setPokemon] = useState({
    id: "",
    name: "",
    generations: [],
    selectedGen: "",
    genResults: [],
    single: [],
    nameFilter: "",
  });
  // const dispatch = useDispatch();
  // const [cancel, setCancel] = useState(false);

  useEffect(() => {
    if (pokemon.generations.length === 0) {
      axios({
        url: `https://pokeapi.co/api/v2/generation`,
      })
        .then((response) => {
          setPokemon((prev) => ({
            ...prev,
            generations: response.data.results,
          }));
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, []);

  const handleGeneration = (e) => {
    if (pokemon.selectedGen !== e.target.id) {
      setVisited(true);
      setLoader(true);
      setPokemon((prev) => ({
        ...prev,
        selectedGen: e.target.id,
      }));
      axios({
        url: `https://pokeapi.co/api/v2/${e.target.id}`,
      })
        .then((res) => {
          setPokemon((prev) => ({
            ...prev,
            genResults: res.data.pokemon_species,
          }));
          console.log(pokemon.genResults);
          // loader only visible for 0.1sec otherwise
          setTimeout(() => {
            setLoader(false);
          }, 1500);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };
  const handlePokemonDetails = (e) => {
    console.log(pokemon);
    axios({
      url: `https://pokeapi.co/api/v2/pokemon/${e.target.id}`,
    }).then((res) => {
      setPokemon((prev) => ({
        ...prev,
        single: res.data,
      }));
    });
  };
  return (
    <div className="pickContainer wrapper">
      <ProgressBar />
      <div className="pokemonContainer">
        {pokemon.single.name && (
          <div className="singlePokemon">
            <div className="singleTop">
              <div className="singleStats">
                <p>ID: {pokemon.single.id}</p>
                <p>Name: {pokemon.single.name}</p>
                {pokemon.single.stats.map((stat) => {
                  return (
                    <p>
                      {stat.stat.name}: {stat.base_stat}
                    </p>
                  );
                })}
              </div>
              <div className="singleImage">
                <img
                  onClick={() => console.log(pokemon.single)}
                  src={`./assets/officialArtwork/${pokemon.single.id}.png`}
                  alt={`image of ${pokemon.single.name}`}
                />
              </div>
            </div>
            <div className="singleButtons">
              <button
                onClick={() =>
                  setPokemon((prev) => ({
                    ...prev,
                    single: [],
                  }))
                }
              >
                back
              </button>
              <button>choose</button>
            </div>
          </div>
        )}
        <div className="pokemonCount">
          <SearchIcon />
          {!loader && visited && <h4>{pokemon.genResults.length}</h4>}
        </div>
        <div
          style={{ opacity: loader || !visited ? "0" : "1" }}
          className="pokemonFilters"
        >
          <div className="search">
            <label style={{ fontWeight: "bolder" }} htmlFor="pokeName">
              Search:{" "}
            </label>
            <input
              placeholder="Pokemon name or ID"
              onChange={(e) =>
                setPokemon((prev) => ({
                  ...prev,
                  nameFilter: e.target.value,
                }))
              }
              type="text"
              id="pokeName"
              disabled={loader}
            />
          </div>
          <div className="sort">
            <h4>Sort:</h4>
            <div className="nameSort">
              <p>a-z</p>
              <div>
                <div className="azBtn">
                  <input
                    className="sr-only"
                    type="radio"
                    id="asc"
                    name="sort"
                  />
                  <label
                    htmlFor="asc"
                    onClick={() =>
                      setPokemon((prev) => ({
                        ...prev,
                        genResults: prev.genResults.sort((a, b) =>
                          a.name.localeCompare(b.name)
                        ),
                      }))
                    }
                  >
                    <KeyboardDoubleArrowUpIcon />
                  </label>
                </div>
                <div className="azBtn">
                  <input
                    className="sr-only"
                    type="radio"
                    id="desc"
                    name="sort"
                  />
                  <label
                    htmlFor="desc"
                    onClick={() =>
                      setPokemon((prev) => ({
                        ...prev,
                        genResults: prev.genResults.sort((a, b) =>
                          b.name.localeCompare(a.name)
                        ),
                      }))
                    }
                  >
                    <KeyboardDoubleArrowDownIcon />
                  </label>
                </div>
              </div>
            </div>
            <div className="idSort">
              <p>id</p>
              <div>
                <div className="azBtn">
                  <input
                    className="sr-only"
                    type="radio"
                    id="ascid"
                    name="sort"
                  />
                  <label
                    htmlFor="ascid"
                    onClick={() =>
                      setPokemon((prev) => ({
                        ...prev,
                        genResults: prev.genResults.sort(
                          (a, b) =>
                            a.url.match(idCheck)[1] - b.url.match(idCheck)[1]
                        ),
                      }))
                    }
                  >
                    <KeyboardDoubleArrowUpIcon />
                  </label>
                </div>
                <div className="azBtn">
                  <input
                    className="sr-only"
                    type="radio"
                    id="descid"
                    name="sort"
                  />
                  <label
                    htmlFor="descid"
                    onClick={() =>
                      setPokemon((prev) => ({
                        ...prev,
                        genResults: prev.genResults.sort(
                          (a, b) =>
                            b.url.match(idCheck)[1] - a.url.match(idCheck)[1]
                        ),
                      }))
                    }
                  >
                    <KeyboardDoubleArrowDownIcon />
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="bottomContainer">
          {!visited && (
            <div className="pickerMessage">
              <h4>How to use:</h4>
              <p>1. choose a pokemon generation from the left side</p>
              <p>2. browse pokemon that appear by scrolling</p>
              <p>3. use filters above to narrow down your search</p>
              <p>4. click on a pokemon to see more details</p>
              <p>5. submit your favorite pokemon!</p>
            </div>
          )}
          <div action="" className="pokeGenButtons">
            {pokemon.generations?.map((gen, index) => {
              return (
                <div key={`generation${index}`} className="genRadio">
                  <input
                    id={`gen${index + 1}`}
                    className="sr-only"
                    type="radio"
                    name="gen"
                  />
                  <label
                    id={`generation/${index + 1}`}
                    className="genButton"
                    aria-label={`pokemon generation ${index + 1}`}
                    onClick={handleGeneration}
                    htmlFor={`gen${index + 1}`}
                  >
                    Gen {index + 1}
                  </label>
                </div>
              );
            })}
          </div>
          <ul
            style={{ overflowY: loader ? "hidden" : "scroll" }}
            className="pokemonList"
          >
            {loader && <Loader />}
            {pokemon.genResults
              ?.filter(
                (item) =>
                  item.name
                    .toLowerCase()
                    .includes(pokemon.nameFilter.toLowerCase()) ||
                  item.url
                    .match(idCheck)[1]
                    .toLowerCase()
                    .includes(pokemon.nameFilter.toLowerCase())
              )
              .map((item, index) => {
                const match = item.url.match(idCheck);
                return (
                  <li
                    id={match && match[1]}
                    className="pokemonCard"
                    key={`pokemon${index}`}
                    style={{ opacity: loader ? "0" : "1" }}
                  >
                    <Tilt
                      className={"tiltStyles"}
                      options={{ reverse: true, scale: 1.05 }}
                    >
                      <span className="pokemonId"># {match[1]}</span>
                      <img
                        id={item.name}
                        onClick={handlePokemonDetails}
                        src={`./assets/officialArtwork/${match[1]}.png`}
                        alt={`picture of ${item.name} pokemon`}
                      />
                      <p>{item.name}</p>
                    </Tilt>
                  </li>
                );
              })}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default PokemonPick;
