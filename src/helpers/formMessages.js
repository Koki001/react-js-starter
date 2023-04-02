import { useSelector } from "react-redux";

const CompletionPrompts = (count) => {
  const user = useSelector((state) => state.user);
  const array = [
    `Thanks for allowing us to get to know you, ${user.name.first} ${user.name.last}. Now, it's your turn to have some fun!`,
    `If you already have a Pokemon in mind (maybe you are looking at them right now??) you can jump straight to the point by choosing 'let me pick' below`,
    `Otherwise, choose 'take quiz' and depending on your answers there, we will try to match you with an appropriate Pokemon.`,
    `The ultimate goal here, aside from having fun, is to see which pokemon will have the honour of being your favourite!`,
    `No one ever picks me. That's okay though. My name is Politoed if you were wondering... for whatever reason... Well, have fun!`,
  ];
  return array[count];
};
const NamePrompts = (count) => {
  const array = [
    "Hey! What's your name ??",
    "Please tell me your full name so we can be friends.",
    "Hmmmm... I don't think you can have numbers in your name.",
  ];
  return array[count];
};
const PhonePrompts = (count) => {
  const user = useSelector((state) => state.user);
  const array = [
    `What's your phone number, ${user.name.first} ?`,
    "Please give me your phone number! I won't prank call you.",
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
  return array[count]
}

export { NamePrompts, PhonePrompts, AddressPrompts, CompletionPrompts };
