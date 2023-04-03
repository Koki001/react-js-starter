import axios from "axios";
import { useState, useEffect } from "react";

const useAutocomplete = (input) => {
  const [result, setResult] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (input.length > 2) {
      axios({
        url: "https://www.mapquestapi.com/search/v3/prediction",
        params: {
          key: "pXPeEb8fKG1bWJTjmqYRZoLhF0sGhYUW",
          q: input,
          collection: `${["adminArea", "address", "airport"]}`,
          limit: 5,
          countryCode: "CA",
        },
      })
        .then((response) => {
          setResult(response.data.results);
          setLoading(false);
        })
        .catch((error) => {
          setError(error);
          setLoading(false);
        });
    }
  }, [input]);
  return { result, error, loading };
};

// const useQuizResult = (choice, count) => {
//   const [result, setResult] = useState(null);
//   useEffect(() => {
//     if (count) {
//       axios({
//         url: `https://pokeapi.co/api/v2/type/${choice}`,
//       })
//         .then((res) => {
//           setResult(res.data.pokemon);
//         })
//         .catch((error) => {
//           console.log(error);
//         });
//     } else {
//       console.log("no axios call")
//     }
//   }, [choice]);
//   return result
// };

export {
  useAutocomplete,
  // useQuizResult
};
