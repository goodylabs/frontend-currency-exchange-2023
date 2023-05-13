import {createBrowserRouter, RouterProvider} from "react-router-dom";
import RootLayout from "./layouts/RootLayout";
import CurrenciesPage from "./pages/CurrenciesPage";
import GoldPage from "./pages/GoldPage";
import ConverterPage from "./pages/ConverterPage";

const today = new Date();
const todayYear = today.getFullYear();
const todayMonth = today.getMonth() + 1;
const todayDay = today.getDate();

const router = createBrowserRouter([
    {path: "/", element: <RootLayout/>, children:[
            {index: true, element: <CurrenciesPage/>, loader: async () =>{
                const res = await fetch('https://api.nbp.pl/api/exchangerates/tables/A/');
                const data = await res.json();
                return data;
                }},
            {path: 'gold', element: <GoldPage/>, loader: async () =>{
                    const res = await fetch(`https://api.nbp.pl/api/cenyzlota/${todayYear}-01-01/${todayYear}-0${todayMonth}-${todayDay}/`);
                    const data = await res.json();
                    return data;
                }},
            {path: 'converter', element: <ConverterPage/>, loader: async () =>{
                    const res = await fetch('https://api.nbp.pl/api/exchangerates/tables/A/');
                    const data = await res.json();
                    return data;
                }}
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
