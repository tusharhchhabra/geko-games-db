import { Inter } from "next/font/google";
import Navbar from "./Navbar";

const inter = Inter({ subsets: ["latin"] });

const Layout = ({ children }) => {
  return (
    <main>
      <Navbar />
      <div className={`p-16 flex justify-center ${inter.className}`}>
        {children}
      </div>
    </main>
  );
};

export default Layout;
