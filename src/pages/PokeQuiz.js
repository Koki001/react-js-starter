import { useState } from "react";
import ProgressBar from "../components/ProgressBar";
import { QuizQuestions, QuizAnswers } from "../helpers/quizQuestions";
// MUI imports
import { Button } from "@mui/material";

const PokeQuiz = () => {
  const [count, setCount] = useState(0);

  const handleAnswer = () => {
    if (count < 3) {
      setCount(count + 1)
    } else {
      console.log("max")
    }
  }
  return (
    <div className="quizContainer wrapper">
      <ProgressBar />
      <div className="quiz">
        <div className="questions">
          <p>{QuizQuestions(count)}</p>
        </div>
        <div className="answers">
          {QuizAnswers(count).map((answer, index) => {
            return (
              <Button key={index} onClick={handleAnswer}>
                {answer}
              </Button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default PokeQuiz;
