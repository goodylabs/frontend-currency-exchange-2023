import {createBrowserRouter, RouterProvider} from "react-router-dom";
import RootLayout from "./layouts/RootLayout";
import CurrenciesPage from "./pages/CurrenciesPage";
import GoldPage from "./pages/GoldPage";
import ConverterPage from "./pages/ConverterPage";

const router = createBrowserRouter([
    {path: "/", element: <RootLayout/>, children:[
            {index: true, element: <CurrenciesPage/>},
            {path: 'gold', element: <GoldPage/>},
            {path: 'converter', element: <ConverterPage/>}
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
