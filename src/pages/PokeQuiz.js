import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import ProgressBar from "../components/ProgressBar";
import { QuizTime } from "../helpers/quizQuestions";
import { nextStep } from "../redux/slices/userSlice";
import Loader from "../helpers/Loader";
// MUI imports
import { Button } from "@mui/material";

const PokeQuiz = () => {
  const [choice, setChoice] = useState("start");
  const [searchParams, setSearchParams] = useSearchParams();
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
        dispatch(nextStep());
      });
    }
  }, [pokeUrl]);
  const handleNextStep = () => {
    navigate({ pathname: "/picker", search: searchParams.toString() });
  };
  return (
    <div className="quizContainer wrapper">
      <ProgressBar />
      <div className="quiz">
        <div className="questions">
          {!load && !result ? (
            <p>{QuizTime(choice)?.question}</p>
          ) : result ? (
            <h3>
              Here's {result.name ? result.name : "who was this again??"} !!
            </h3>
          ) : null}
        </div>
        <div className="pokemon">
          {load && <Loader />}
          {!load && result && (
            <div className="quizStats">
              <p>
                id:<span> {result.id}</span>
              </p>
              <p>
                hp:<span> {result.stats[0].base_stat}</span>
              </p>
              <p>
                attack:<span> {result.stats[1].base_stat}</span>
              </p>
              <p>
                defense: <span>{result.stats[2].base_stat}</span>
              </p>
              <p>
                weight:<span> {result.stats[5].base_stat}</span>
              </p>
            </div>
          )}
          <img
            onLoad={() =>
              setTimeout(() => {
                setLoad(false);
              }, 1500)
            }
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
          <div className="completionButtons">
            <button onClick={handleNextStep}>picker</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default PokeQuiz;
