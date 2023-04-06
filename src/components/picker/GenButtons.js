import { useSearchParams } from "react-router-dom";

const GenButtons = (props) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const handleGeneration = (e) => {
    props.getGen(e);
  };
  return (
    <div action="" className="pokeGenButtons">
      {props.names?.map((gen, index) => {
        return (
          <div key={`generation${index}`} className="genRadio">
            <input
              id={`generation/${index + 1}`}
              className="sr-only"
              type="radio"
              name="gen"
              checked={
                `generation/${index + 1}` === searchParams.get("generation")
              }
              value={
                searchParams.get("generation")
                  ? searchParams.get("generation")
                  : ""
              }
              onChange={handleGeneration}
            />
            <label
              id={`gen${index + 1}`}
              className="genButton"
              aria-label={`pokemon generation ${index + 1}`}
              htmlFor={`generation/${index + 1}`}
            >
              Gen {index + 1}
            </label>
          </div>
        );
      })}
    </div>
  );
};

export default GenButtons;
