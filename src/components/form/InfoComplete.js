import { useSelector } from "react-redux";
import { CompletionPrompts } from "../../helpers/formMessages";
// MUI imports
import IconButton from "@mui/material/IconButton";
import KeyboardDoubleArrowDownIcon from "@mui/icons-material/KeyboardDoubleArrowDown";
import { useState } from "react";

const InfoComplete = () => {
  const user = useSelector((state) => state.user);
  const [count, setCount] = useState(0);
  const [load, setLoad] = useState(true);

  // const chatOptions = [
  //   `Thanks for allowing us to get to know you, ${user.name.first} ${user.name.last}. Now, it's your turn to have some fun!`,
  //   `If you already have a Pokemon in mind (maybe you are looking at them right now??) you can jump straight to the point by choosing 'let me pick' below`,
  //   `Otherwise, choose 'take quiz' and depending on your answers there, we will try to match you with an appropriate Pokemon.`,
  //   `The ultimate goal here, aside from having fun, is to see which pokemon will have the honour of being your favourite!`,
  //   `No one ever picks me. That's okay though. My name is Politoed if you were wondering... for whatever reason... Well, have fun!`,
  // ];
  const handleNextParagraph = (e) => {
    if (count < 3) {
      setCount(count + 1);
    } else {
      setCount(count + 1);
      e.target.style.display = "none";
    }
  };
  return (
    <div className="infoComplete">
      <div style={{ opacity: load ? "0" : "1" }} className="politoedGif">
        <p className="textScroll">
          {CompletionPrompts(count)}
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
        <img
          onLoad={() => setLoad(false)}
          src="./assets/intro/politoed.gif"
          alt=""
        />
      </div>
    </div>
  );
};

export default InfoComplete;
