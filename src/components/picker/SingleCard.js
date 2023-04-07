// single pokemon detailed view
import { useState } from "react";
import Loader from "../../helpers/Loader";
// MUI imports
import { Button } from "@mui/material";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import { useSearchParams } from "react-router-dom";

const SingleCard = (props) => {
  const [loader, setLoader] = useState(true);
  const [submit, setSubmit] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const [edit, setEdit] = useState(false);
  const regexName = /^[a-zA-Z\b]*$/;
  const regexPhone = /^[0-9\b]{0,10}$/;
  const handleFakeLoader = () => {
    setTimeout(() => {
      setLoader(false);
    }, 1000);
  };
  const handleGoBack = () => {
    props.exit([]);
    setLoader(true);
  };
  const handlePickPokemon = () => {
    setSubmit(true);
  };
  const handleEdit = () => {
    setEdit(true);
  };
  const handleContactEdit = (e) => {
    if (e.target.id === "first" || e.target.id === "last") {
      if (regexName.test(e.target.value)) {
        searchParams.set(`${e.target.id}`, e.target.value);
        setSearchParams(searchParams);
      }
    } else if (e.target.id === "phone") {
      if (regexPhone.test(e.target.value)) {
        searchParams.set(`${e.target.id}`, e.target.value);
        setSearchParams(searchParams);
      }
    } else {
      searchParams.set(`${e.target.id}`, e.target.value);
      setSearchParams(searchParams);
    }
  };
  if (props.pokemon.single.name) {
    return (
      <div className="singlePokemon">
        {loader && <Loader />}
        <div style={{ opacity: loader ? "0" : "1" }} className="singleTop">
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
                <span>
                  {(Number(props.pokemon.single.weight) / 10).toFixed(1)}
                </span>
              </div>
            </div>
          </div>
          <div className="singleImage">
            <img
              onClick={() => console.log(props.pokemon.single)}
              src={`./assets/officialArtwork/${props.pokemon.single.id}.png`}
              alt={`image of ${props.pokemon.single.name}`}
              onLoad={handleFakeLoader}
            />
          </div>
        </div>
        {submit && (
          <div className="favoriteContainer">
            <h4>Please confirm your contact infromation before submitting!</h4>
            <div className="bottomWrapper">
              <Button className="backButton" onClick={handleGoBack}>
                Back
              </Button>
              <div className="choiceView">
                <img
                  src={`./assets/officialArtwork/${props.pokemon.single.id}.png`}
                  alt={`image of ${props.pokemon.single.name}`}
                />
              </div>
              <Box
                onChange={handleContactEdit}
                component="form"
                noValidate
                autoComplete="off"
              >
                <div className="inputWrapper">
                  <TextField
                    id="first"
                    label="First name"
                    variant="standard"
                    value={searchParams.get("first")}
                    disabled={!edit}
                   
                  />
                </div>
                <div className="inputWrapper">
                  <TextField
                    id="last"
                    label="Last name"
                    variant="standard"
                    value={searchParams.get("last")}
                    disabled={!edit}
                  />
                </div>
                <div className="inputWrapper">
                  <TextField
                    id="phone"
                    label="Phone"
                    variant="standard"
                    value={searchParams.get("phone")}
                    disabled={!edit}
                  />
                </div>
                <div className="inputWrapper">
                  <TextField
                    id="address"
                    label="Address"
                    variant="standard"
                    value={searchParams.get("address")}
                    disabled={!edit}
                  />
                </div>
              </Box>
              <div className="finalSubmit">
                <Button onClick={handleEdit} className="edit">
                  Edit
                </Button>
                <Button className="submit">Submit</Button>
              </div>
            </div>
          </div>
        )}
        <div style={{ opacity: loader ? "0" : "1" }} className="singleButtons">
          <Button className="backButton" onClick={handleGoBack}>
            go back
          </Button>
          <Button className="pickButton" onClick={handlePickPokemon}>
            choose this pokemon
          </Button>
        </div>
      </div>
    );
  }
};

export default SingleCard;
