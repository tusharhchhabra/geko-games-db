import { Inter } from "next/font/google";
const { default: SearchBar } = require("./SearchBar");

const inter = Inter({ subsets: ["latin"] });

const Layout = ({ children }) => {
  return (
    <main>
      <SearchBar />
      <div className={`p-16 flex justify-center ${inter.className}`}>
        {children}
      </div>
    </main>
  );
};

export default Layout;
