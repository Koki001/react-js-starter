const QuizQuestions = (count) => {
  const quizArray = [
    "Let's use our imagination a little! When you look at yourself in the mirror, which one of these is most likely to look right back at you?",
    "Second question?",
    "third question?",
    "fourth question",
  ];
  return quizArray[count];
};

const QuizAnswers = (count) => {
  const quizAnswers = {
    0: ["a dragon", "powerful mage", "rustic statue", "the void"],
    1: ["second", "second", "second", "second"],
    2: ["third", "third", "third", "third"],
    3: ["fourth", "fourth", "fourth", "fourth"],
  };
  return quizAnswers[count];
};

const QuizTime = (choice) => {
  const quizObject = {
    start: {
      question:
        "Let's use our imagination a little! When you look at yourself in the mirror, which one of these is most likely to look right back at you?",
      choices: ["a dragon", "powerful mage", "rustic statue", "the void"],
      values: ["drake", "mage", "statue", "void"],
    },
    drake: {
      question:
        "A dragon?? Nice choice! If you don't mind me asking... What kind of dragon would you want to be?",
      choices: ["a cool one", "friendly", "magical", "without wings"],
      values: ["dragon", "flying", "fairy", "fighting"],
    },
    dragon: {
      question:
        "Hmmmm... a super scary dragon you say. I think I have enough information to pick just the right Pokemon for you!",
      choices: ["show me"],
      values: ["dragon"],
    },
    flying: {
      question:
        "I'd love to be friends with a friendly dragon. I think I have enough information to pick just the right Pokemon for you!",
      choices: ["show me"],
      values: ["flying"],
    },
    fairy: {
      question:
        "I like that! A bit vague yet... well, magical! I think I have enough information to pick just the right Pokemon for you!",
      choices: ["show me"],
      values: ["fairy"],
    },
    fighting: {
      question:
        "Haha you're funny! Why pick a dragon and then lose the wings?? I think I have enough information to pick just the right Pokemon for you!",
      choices: ["show me"],
      values: ["fighting"],
    },
    mage: {
      question:
        "Ah a practitioner of magic and skilled in supernatural and mystical powers! ... What will you do with those powers?",
      choices: [
        "help the world",
        "assert dominance",
        "not sure",
        "not telling",
      ],
      values: ["water", "fire", "ice", "electric"],
    },
    statue: {
      question:
        "Finally! Somebody who is down to earth and not power hungry! Sitting atop a hill, what grabbed your attention and made you smile?",
      choices: [
        "the mountains",
        "bugs everywhere!",
        "distant factory",
        "day off work",
      ],
      // testing
      values: ["rock", "bug", "steel", "normal"],
      // actual
      // values: ["rock, ground", "bug, grass", "steel, poison", "normal"],
    },
    void: {
      question:
        "... Well... it was an option! This void... if it speaks, what would it say?",
      choices: ["something ominous", "i know you", "hello there", "boo!!!"],
      values: ["dark", "psychic", "psychic", "ghost"],
    },
  };

  return quizObject[choice]

}

export { QuizQuestions, QuizAnswers, QuizTime };
