import {Outlet} from "react-router-dom";
import Navbar from "../components/nav/Navbar";

const RootLayout = () => {
  return (
      <main>
          <Navbar/>
          <Outlet/>
      </main>
  )
}
export default RootLayout;