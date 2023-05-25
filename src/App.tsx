import {createBrowserRouter, RouterProvider} from "react-router-dom";
import RootLayout from "./layouts/RootLayout";
import CurrenciesPage from "./pages/CurrenciesPage";
import GoldPage from "./pages/GoldPage";
import ConverterPage from "./pages/ConverterPage";

const currentDate = new Date();
const currentYear = currentDate.getFullYear();
const currentMonth = currentDate.getMonth() + 1;
const currentDay = currentDate.getDate();

const fetchTableA = async () => {
    const res = await fetch('https://api.nbp.pl/api/exchangerates/tables/A/');
    const data = await res.json();
    return data;
}
const fetchGoldFromCurrentYear = async () => {
    const res = await fetch(`https://api.nbp.pl/api/cenyzlota/${currentYear}-01-01/${currentYear}-0${currentMonth}-${currentDay}/`);
    const data = await res.json();
    return data;
}

const router = createBrowserRouter([
    {path: "/", element: <RootLayout/>, children:[
            {index: true, element: <CurrenciesPage/>, loader: fetchTableA},
            {path: 'gold', element: <GoldPage/>, loader: fetchGoldFromCurrentYear},
            {path: 'converter', element: <ConverterPage/>, loader: fetchTableA}
    ]}
])

function App() {

  return (
    <>
      <RouterProvider router={router}/>
    </>
  )
}

export default App
