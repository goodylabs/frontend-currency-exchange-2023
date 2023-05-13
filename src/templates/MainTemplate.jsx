import Navbar from '../components/Navbar';

const MainTemplate = ({ children }) => {
  return (
    <div className="bg-slate-300">
      <Navbar />
      <div className="max-w-7xl">{children}</div>
    </div>
  );
};

export default MainTemplate;
