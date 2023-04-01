import { useSelector } from "react-redux";
// MUI imports
import IconButton from "@mui/material/IconButton";
import KeyboardDoubleArrowDownIcon from "@mui/icons-material/KeyboardDoubleArrowDown";
import { useState } from "react";

const InfoComplete = () => {
  const user = useSelector((state) => state.user);
  const [count, setCount] = useState(0);

  const chatOptions = [
    `Thanks for allowing us to get to know you, ${user.name.first} ${user.name.last}. Now, it's your turn to have some fun!`,
    `On the next page, you'll be able to explore and learn about any pokemon in the world ever... I think!`,
    `The ultimate goal here, aside from getting to know us, is to see which pokemon will have the honor of being your very favorite.`,
    `No one ever picks me. That's okay though. My name is politoed if you were wondering for whatever reason... Well, have fun!`,
  ];
  const handleNextParagraph = (e) => {
    console.log(chatOptions);
    console.log(count);
    if (count < 2) {
      setCount(count + 1);
    } else {
      setCount(count + 1);
      e.target.style.display = "none";
    }
  };
  return (
    <div className="infoComplete">
      <div className="politoedGif">
        <p className="textScroll">
          {chatOptions[count]}
          <IconButton
            onClick={handleNextParagraph}
            className="scrollTextIcon"
            aria-label="read more"
            sx={{ position: "absolute", right: "0", bottom: "0" }}
          >
            <KeyboardDoubleArrowDownIcon
              sx={{
                pointerEvents: "none",
              }}
            />
          </IconButton>
        </p>
        <img src="./assets/intro/politoed.gif" alt="" />
      </div>
    </div>
  );
};

export default InfoComplete;
