import { useEffect } from "react";
import api from "./services/api";

const getTableData = async () => {
  try {
    const res = await api.get("/exchangerates/tables/A");
    return res.data;
  } catch (error) {
    console.error(error);
  }
};

function App() {
  useEffect(() => {
    const getData = async () => {
      const data = await getTableData();
      console.log(data);
    };
    getData();
  }, []);

  return (
    <div>
      <h1 className="text-xl">content</h1>
    </div>
  );
}

export default App;
