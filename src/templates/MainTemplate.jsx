import Navbar from '../components/Navbar';

const MainTemplate = ({ children }) => {
  return (
    <div className="flex h-full">
      <Navbar />
      <div>{children}</div>
    </div>
  );
};

export default MainTemplate;
