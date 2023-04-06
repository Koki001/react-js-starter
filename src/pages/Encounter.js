import { completionPrompts } from "../helpers/formMessages";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useState } from "react";
import ProgressBar from "../components/ProgressBar";
// MUI imports
import IconButton from "@mui/material/IconButton";
import { Button } from "@mui/material";
import KeyboardDoubleArrowDownIcon from "@mui/icons-material/KeyboardDoubleArrowDown";

const Encounter = () => {
  const navigate = useNavigate();
  const [count, setCount] = useState(0);
  const [load, setLoad] = useState(true);
  const [searchParams, setSearchParams] = useSearchParams();
  const handleNextParagraph = (e) => {
    if (count < completionPrompts.length - 2) {
      setCount(count + 1);
    } else {
      setCount(count + 1);
      e.target.style.display = "none";
    }
  };
  return (
    <div className="encounterContainer wrapper">
      <ProgressBar />
      <div className="infoComplete">
        <div style={{ opacity: load ? "0" : "1" }} className="politoedGif">
          <p className="textScroll">
            {completionPrompts[count]}
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

        <div className="contactButtons">
          <Button>quiz</Button>
          <Button
            onClick={() =>
              navigate({
                pathname: "/picker",
                search: searchParams.toString(),
              })
            }
          >
            pick
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Encounter;
