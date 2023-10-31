import Navbar from "./Navbar";

const Layout = ({ children }) => {
  return (
    <main className="pt-20">
      <Navbar />
      {children}
    </main>
  );
};

export default Layout;
