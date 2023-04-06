import axios from "axios";
import { Tilt } from "react-tilt";
import Loader from "../helpers/Loader";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import Sorter from "../components/picker/Sorter";
import Filter from "../components/picker/Filter";
import Searcher from "../components/picker/Searcher";
import ProgressBar from "../components/ProgressBar";
import SingleCard from "../components/picker/SingleCard";

const PokemonPick = () => {
  // captures the first group of numbers after a forward slash
  // generation list returns names + link pokemon/${id}/
  // this saves on making extra api calls to find out ID
  const idCheck = /\/(\d+)\/$/;
  const [searchParams, setSearchParams] = useSearchParams();
  const [loader, setLoader] = useState(false);
  const [visited, setVisited] = useState(false);
  const [pokemon, setPokemon] = useState({
    id: "",
    name: "",
    generations: [],
    nameList: [],
    idList: [],
    selectedGen: "",
    genResults: [],
    single: [],
    nameFilter: "",
  });
  // runs at start to get generation buttons and pokemon names for autocomplete
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
      axios({
        url: `https://pokeapi.co/api/v2/pokemon?limit=100000`,
      }).then((names) => {
        setPokemon((prev) => ({
          ...prev,
          nameList: names.data.results,
        }));
      });
    }
  }, []);
  useEffect(() => {
    let ids = [];
    for (let i = 0; i < pokemon.nameList.length; i++) {
      ids.push(pokemon.nameList[i].url.match(idCheck)[1]);
    }
    setPokemon((prev) => ({
      ...prev,
      idList: ids,
    }));
  }, [pokemon.nameList]);
  // sort function from Sorter.js
  const handleSort = (sortBy) => {
    setPokemon((prev) => ({
      ...prev,
      genResults: sortBy,
    }));
  };
  // sort function from Search.js
  const handleFilter = (e) => {
    setPokemon((prev) => ({
      ...prev,
      nameFilter: e,
    }));
  };
  const handleSearch = () => {};
  // exit view from SingleCard.js
  const handleExitCard = (e) => {
    setPokemon((prev) => ({
      ...prev,
      single: e,
    }));
  };
  // if coming from link
  useEffect(() => {
    if (searchParams.get("generation")) {
      setVisited(true);
      setLoader(true);
      setPokemon((prev) => ({
        ...prev,
        selectedGen: searchParams.get("generation"),
      }));
      axios({
        url: `https://pokeapi.co/api/v2/${searchParams.get("generation")}`,
      })
        .then((res) => {
          setPokemon((prev) => ({
            ...prev,
            genResults: res.data.pokemon_species,
          }));
          // buffer time for loader
          setTimeout(() => {
            setLoader(false);
          }, 1500);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, []);
  // returns a list of pokemon from that generation
  const handleGeneration = (e) => {
    searchParams.set("generation", e.target.id);
    setSearchParams(searchParams);
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
          // buffer time for loader
          setTimeout(() => {
            setLoader(false);
          }, 1500);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };
  // returns a single pokemon with details
  const handlePokemonDetails = (e) => {
    setLoader(true);
    axios({
      url: `https://pokeapi.co/api/v2/pokemon/${e.target.id}`,
    }).then((res) => {
      setPokemon((prev) => ({
        ...prev,
        single: res.data,
      }));
      setLoader(false);
    });
  };
  const handlePokemonDetailsAlt = (search) => {
    setLoader(true);
    axios({
      url: `https://pokeapi.co/api/v2/pokemon/${search}`,
    }).then((res) => {
      setPokemon((prev) => ({
        ...prev,
        single: res.data,
      }));
      setLoader(false);
    });
  };
  return (
    <div className="pickContainer wrapper">
      <ProgressBar />
      <div className="pokemonContainer">
        {pokemon.single ? (
          <SingleCard pokemon={pokemon} exit={handleExitCard} />
        ) : (
          <Loader />
        )}
        <div
          style={{ opacity: loader || !visited ? "0" : "1" }}
          className="pokemonFilters"
        >
          <Searcher
            callAxios={handlePokemonDetailsAlt}
            search={handleSearch}
            names={pokemon.nameList}
            ids={pokemon.idList}
          />
          <div className="filterContainer">
            <Filter filter={handleFilter} loaderProp={loader} />
            <Sorter sorter={handleSort} dataProp={pokemon.genResults} />
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
                    id={`generation/${index + 1}`}
                    className="sr-only"
                    type="radio"
                    name="gen"
                    checked={
                      `generation/${index + 1}` ===
                      searchParams.get("generation")
                    }
                    value={
                      searchParams.get("generation")
                        ? searchParams.get("generation")
                        : ""
                    }
                    onChange={handleGeneration}
                  />
                  <label
                    id={`gen${index + 1}`}
                    className="genButton"
                    aria-label={`pokemon generation ${index + 1}`}
                    htmlFor={`generation/${index + 1}`}
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
                    id={match && match[1] + "list"}
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
                        id={match[1]}
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
