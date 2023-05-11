import NavItem from "./NavItem";

const Navbar = () => {
  return (
      <nav>
          <div><p>CurrencyHub</p></div>
          <div>
            <NavItem path={'/currencies'}>Currencies</NavItem>
            <NavItem path={'/gold'}>Gold prices</NavItem>
            <NavItem path={'/converter'}>Converter</NavItem>
          </div>
      </nav>
  )
}
export default Navbar;