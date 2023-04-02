const QuizQuestions = (count) => {

  const quizArray = [
    "Which one of these sound like an amazing activity to do on your day off ?",
    "Second question?",
    "third question?",
    "fourth question"
  ]
  return quizArray[count]
}

const QuizAnswers = (count) => {

  const quizAnswers = {
    0: ["hiking", "tanning", "napping", "working"],
    1: ["second", "second", "second", "second"],
    2: ["third", "third", "third", "third"],
    3: ["fourth", "fourth", "fourth", "fourth"],
  };
  return quizAnswers[count]
}

export {QuizQuestions, QuizAnswers}