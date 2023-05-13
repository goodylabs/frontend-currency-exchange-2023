import { BrowserRouter, Route, Routes } from "react-router-dom";

import routes from "./common/routes";
import Converter from "./pages/Converter";
import Currencies from "./pages/Currencies";
import Currency from "./pages/Currency";
import Gold from "./pages/Gold";
import MainTemplate from "./templates/MainTemplate";

export const App = () => {
  return (
    <BrowserRouter>
      <MainTemplate>
        <Routes>
          <Route path={routes.currencies} element={<Currencies />} />
          <Route path={routes.currency} element={<Currency />} />
          <Route path={routes.gold} element={<Gold />} />
          <Route path={routes.converter} element={<Converter />} />
        </Routes>
      </MainTemplate>
    </BrowserRouter>
  );
};

export default App;
