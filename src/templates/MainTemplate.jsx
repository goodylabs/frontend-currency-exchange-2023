import Navbar from "../components/Navbar";

const MainTemplate = ({ children }) => {
  return (
    <div>
      <Navbar />
      {children}
    </div>
  );
};

export default MainTemplate;
