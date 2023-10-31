const { default: SearchBar } = require("./SearchBar");

const Layout = ({ children }) => {
  return (
    <main>
      <SearchBar />
      {children}
    </main>
  );
};

export default Layout;
