import {useCallback, useState} from "react";
const useFetch = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>("");
  const fetchData = useCallback(async (endpoint: string) =>{
      setLoading(true);
      try {
          const res = await fetch(endpoint);
          if(!res.ok){
              throw new Error("Request failed!")
          }
          const data = await res.json();
          return data;
      }
      catch (err) {
          setError("An error occured while fetching data!")
      }
      finally {
          setLoading(false);
      }

  }, [])
  return {
      loading,
      error,
      fetchData
  };
}
export default useFetch;