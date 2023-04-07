import { useSelector } from "react-redux";

const completionPrompts = [
  `Thanks for the information! Fun is just around the corner, I promise. If you know your Pokemon, select "pick now" below...`,
  `Otherwise, choose 'help me', we'll ask you some questions, and try to match you with an appropriate Pokemon depending on your answers...`,
  `The ultimate goal here, aside from having fun, is to see which pokemon will have the honour of being your favourite!...`,
  `No one ever picks me. That's okay though. My name is Politoed if you were wondering... for whatever reason... Well, have fun!`,
];
const NamePrompts = (count) => {
  const array = [
    "Hey! What's your name ??",
    "Please tell me your full name so we can be friends.",
    "Hmmmm... I don't think you can have numbers in your name.",
    "I'm glad you came back! Did you change your mind about giving me your name?",
    "",
  ];
  return array[count];
};
const PhonePrompts = (count) => {
  const user = useSelector((state) => state.user);
  const array = [
    `What's your phone number, ${user.name.first} ?`,
    "I promise I won't prank call you. Please enter your phone number below!",
    "Well, at least give me a 10 digit fake number please...",
  ];
  return array[count];
};
const AddressPrompts = (count) => {
  const array = [
    "Where do you live ??!!",
    "You're not getting past me until you tell me where you live !!",
    "I'll give you one more chance to get it right !!",
  ];
  return array[count];
};

export { NamePrompts, PhonePrompts, AddressPrompts, completionPrompts };
