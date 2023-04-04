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
          key: process.env.REACT_APP_MAPQUEST,
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

export { useAutocomplete};
