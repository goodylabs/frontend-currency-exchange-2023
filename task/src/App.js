import './App.css';
import TableA from "../src/Components/TableA/TableA.js"
import Gold from "../src/Components/Gold/Gold.js"
import CurrencyRate from "../src/Components/CurrencyRate/CurrencyRate.js"
import Header from "../src/Components/Header/Header.js"
function App() {
  return (
    <div className="App">
      <Header />
     <TableA />
     <Gold/>
     <CurrencyRate/>
    </div>
  );
}

export default App;
