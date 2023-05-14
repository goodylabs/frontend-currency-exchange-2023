import Navbar from '../components/Navbar';

const MainTemplate = ({ children }) => {
  return (
    <div className="flex min-h-full">
      <Navbar />
      <div className="flex grow flex-col bg-zinc-50 p-12">{children}</div>
    </div>
  );
};

export default MainTemplate;
