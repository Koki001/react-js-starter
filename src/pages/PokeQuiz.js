import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import ProgressBar from "../components/ProgressBar";
import { QuizTime } from "../helpers/quizQuestions";
import { nextStep, quizPick } from "../redux/slices/userSlice";
// MUI imports
import { Button } from "@mui/material";

const PokeQuiz = () => {
  const [choice, setChoice] = useState("start");
  const [count, setCount] = useState(0);
  const [pokeUrl, setPokeUrl] = useState("");
  const [result, setResult] = useState(null);
  const [load, setLoad] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleAnswer = (e) => {
    if (count < 2) {
      setChoice(e.target.id);
      setCount(count + 1);
    } else if (count >= 2) {
      e.target.style.display = "none";

      axios({
        url: `https://pokeapi.co/api/v2/type/${choice}?limit=250`,
      })
        .then((res) => {
          setLoad(true);
          const random = Math.floor(Math.random() * res.data.pokemon.length);
          setPokeUrl(res.data.pokemon[random].pokemon.url);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };
  useEffect(() => {
    if (load && pokeUrl) {
      axios({
        url: pokeUrl,
      }).then((res) => {
        setResult(res.data);
        dispatch(nextStep())
      });
    }
  }, [pokeUrl]);
  const handleNextStep = () => {
    // dispatch(nextStep());
    navigate("/pokemon-picker");
  };
  const handleSubmit = () => {
    console.log(result);
  };
  return (
    <div className="quizContainer wrapper">
      <ProgressBar />
      <div className="quiz">
        <div className="questions">
          {!load && !result ? (
            <p>{QuizTime(choice).question}</p>
          ) : result ? (
            <h3 >
              Here's {result.name ? result.name : "who was this again??"} !!
            </h3>
          ) : null}
        </div>
        <div className="pokemon">
          {load && (
            <div className="loader">
              <div className="pokeball"></div>
              <span className="pokeballSpan">Loading ...</span>
            </div>
          )}
          {!load && result && (
            <div className="quizStats">
              <p>id:<span> {result.id}</span></p>
              <p>hp:<span> {result.stats[0].base_stat}</span></p>
              <p>attack:<span> {result.stats[1].base_stat}</span></p>
              <p>defense: <span>{result.stats[2].base_stat}</span></p>
              <p>weight:<span> {result.stats[5].base_stat}</span></p>
            </div>
          )}
          <img
            onLoad={() => setLoad(false)}
            src={
              result?.sprites.other.dream_world.front_default ||
              result?.sprites.other["official-artwork"]["front_default"] ||
              result?.sprites.front_default
            }
            alt=""
          />
        </div>
        <div style={{ display: !result ? "flex" : "none" }} className="answers">
          {QuizTime(choice).choices.map((answer, index) => {
            return (
              <Button
                id={QuizTime(choice).values[index]}
                key={index}
                onClick={handleAnswer}
              >
                {answer}
              </Button>
            );
          })}
        </div>

        {result !== null && !load && (
          <div className="quizCompleteButtons">
            <button onClick={handleNextStep}>picker</button>
            <button onClick={handleSubmit}>submit</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default PokeQuiz;
