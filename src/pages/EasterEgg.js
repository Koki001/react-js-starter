import { useEffect, useRef, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import Typewriter from "typewriter-effect";
const EasterEgg = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const [showButton, setShowButton] = useState(false);
  const [count, setCount] = useState(0);
  // const stringRef = useRef();
  const dialogue = [
    ".....",
    "As the sun was setting, Snorlax lay sprawled on the grassy bank of a serene lake, sound asleep. Deep snores echoed through the peaceful surroundings, and a smile began to form on Snorlax's face as snippets of thoughts and images began to coalesce into a nascent dream...",
    "There was a single, majestic, tree, standing tall atop a hill, silhouetted against the starry sky. As Snorlax gazed in wonder at the tree, it noticed a small door carved into the trunk - barely visible, and just big enough to enter. With its leaves transforming into stars themselves, Snorlax, while still in awe, felt a sense of destiny calling from within...",
    "Snorlax thought it saw Pikachu inside, but a great Canadian appeared with a warm welcome. Kings and queens were dancing alongside pirates and chefs. Beings crafted from plastic mingled with those sporting wings, while deadly robots and emissaries of peace shared drinks with travelers from the stars and sea...",
    "In a moment of clarity, Snorlax felt an immense sense of belonging. The stars above seemed to twinkle with approval, as if to say that anything was possible with enough hard work, good company, and a little bit of magic.",
  ];

  useEffect(() => {
    if (count === 0) {
      setTimeout(() => {
        setCount(count + 1);
        setShowButton(true);
      }, 3000);
    }
  }, []);
  const handleContinue = () => {
    // console.log(stringRef.current.state);
    console.log(count);
    if (count < dialogue.length - 1) {
      setCount(count + 1);
    } else if (count === 4) {
      navigate({ pathname: "/get-started", search: searchParams.toString() });
    }
  };
  return (
    <div onAnimationEnd={(e) => console.log(e)} className="konamiSecret">
      <div
        style={{
          backgroundColor: "transparent",
        }}
        className={"secretScreen wrapper"}
      >
        {count <= 1 ? (
          <div className={"first screenView"}>
            <img
              style={{ display: count === 1 ? "block" : "none" }}
              className="snorlax"
              src="./assets/animated/snorlaxSleeping.gif"
              alt=""
            />
          </div>
        ) : count === 2 ? (
          <div className={"second screenView"}>
            <img
              className="snorlax2"
              src="./assets/easterEgg/snorlax2.gif"
              alt=""
            />
          </div>
        ) : count === 3 ? (
          <div className={"third screenView"}>
            {/* <img
              className="snorlax3"
              src="./assets/easterEgg/background3.gif"
              alt=""
            /> */}
          </div>
        ) : (
          <div className={"fourth screenView"}>
            <div className="croppedContainer">
              <h3>Snorlax</h3>
              <p>The Dreamer</p>
              <img
                className="snorlax4"
                src="./assets/easterEgg/snorlaxCropped.png"
                alt=""
              />
            </div>
          </div>
        )}
        <div className="screenText">
          <div className="overflowText">
            <Typewriter
              onAnimationEnd={(e) => {
                console.log(e);
              }}
              // ref={stringRef}
              options={{
                strings: dialogue[count],
                autoStart: true,
                loop: false,
                delay: 35,
                deleteSpeed: 1,
              }}
            />
          </div>
          <button
            onClick={handleContinue}
            style={{ visibility: showButton ? "visible" : "hidden" }}
            className="continue"
          >
            {count < 4 ? `Continue --->` : `Leave my dream`}
          </button>
        </div>
      </div>
    </div>
  );
};

export default EasterEgg;
