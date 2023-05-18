import axios from "axios";
import { Tilt } from "react-tilt";
import Loader from "../helpers/Loader";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import GenButtons from "../components/picker/GenButtons";
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
  const [blur, setBlur] = useState(false)
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
  useEffect(() => {}, [searchParams]);
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
          alert("Sorry, GEN 2 has a bug!")
          searchParams.set("generation", "generation/2")
        });
    }
  };
  // returns a single pokemon with details
  const handlePokemonDetails = (e) => {
    setBlur(true);
    axios({
      url: `https://pokeapi.co/api/v2/pokemon/${e.target.id}`,
    }).then((res) => {
      setPokemon((prev) => ({
        ...prev,
        single: res.data,
      }));
      setBlur(false);
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
        <div className="pokemonFilters">
          <Searcher
            callAxios={handlePokemonDetailsAlt}
            search={handleSearch}
            names={pokemon.nameList}
            ids={pokemon.idList}
          />
          <div
            style={{ opacity: loader || !visited ? "0" : "1" }}
            className="filterContainer"
          >
            <Filter filter={handleFilter} loaderProp={loader} />
            <Sorter sorter={handleSort} dataProp={pokemon.genResults} />
          </div>
        </div>
        <div className="bottomContainer">
          {!visited && (
            <div className="pickerMessage">
              <h4>How to use:</h4>
              <ul>
                <li>
                  1. Search by name or ID by selecting an item from the inputs
                  above
                </li>
                <li>
                  2. View Pokemon generation by clicking on the "Gen" buttons
                </li>
                <li>3. Use the filters to narrow down your search</li>
                <li>4. Click on one of the Pokemon to see more details</li>
                <li>
                  5. Select desired Pokemon and submit selection on detailed
                  view
                </li>
              </ul>
            </div>
          )}
          <GenButtons getGen={handleGeneration} names={pokemon.generations} />
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
                        alt={`${item.name} pokemon`}
                        style={{ cursor: blur ? "wait" : "pointer" }}
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
