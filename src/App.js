import './App.css';
import CurrencyConverter from './components/Converter';
import GoldChart from './components/Gold';
import CurrenciesList from './containers/CurrenciesList';
import React from 'react';
import styled from 'styled-components';
import { BrowserRouter as Router, Route, NavLink, Routes } from 'react-router-dom';

const Header = styled.div`
  background: rgba(2, 0, 36, 1);
  color: #fff;
  padding: 20px;
  height: 70px;
  text-align: center;
`;

const Menu = styled.div`
  background: rgba(2, 0, 36, 1);
  color: #fff;
  height: 70px;
  display: flex;
  justify-content: center;
  text-align: center;
  margin: 0 auto 70px;
`;

const Menu2 = styled.div`
  display: flex;
  justify-content: center;
  height: 70px;
  margin: 0 auto;
  width: 60%;
`;

const DivButton = styled.div`
  flex: 1;
  height: 100%;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  &:hover {
    background: rgba(30, 0, 50, 1)
  }
`;

const DivButton2 = styled(DivButton)`
  border-right: 1px solid rgba(30, 0, 50, 1);
  border-left: 1px solid rgba(30, 0, 50, 1);
`;

const Header4 = styled.h4`
  margin: 0;
`;

const StyledNavLink = styled(NavLink)`
  text-decoration: none;
  width: 33%;
  color: #fff;
  &.active {
    background-color: rgba(30, 0, 50, 1);
  }
`;

class App extends React.Component {
  render() {
    return (
      <Router>
        <div className="App">
          <Header>
            <h1>Currency Exchange</h1>
          </Header>
          <Menu>
            <Menu2>
              <StyledNavLink exact to="/" activeClassName="active">
                <DivButton>
                  <Header4>Average currency rates</Header4>
                </DivButton>
              </StyledNavLink>
              <StyledNavLink to="/gold" activeClassName="active">
                <DivButton2>
                  <Header4>Gold price</Header4>
                </DivButton2>
              </StyledNavLink>
              <StyledNavLink to="/calculator" activeClassName="active">
                <DivButton>
                  <Header4>Currency converter</Header4>
                </DivButton>
              </StyledNavLink>
            </Menu2>
          </Menu>
          <Routes>
            <Route path="/" element={<CurrenciesList />} />
            <Route path="/gold" element={<GoldChart />} />
            <Route path="/calculator" element={<CurrencyConverter />} />
          </Routes>
        </div>
      </Router>
    );
  }
}

export default App;
