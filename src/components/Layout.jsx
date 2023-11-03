import { Inter } from "next/font/google";
import Navbar from "./Navbar";
import AuthModal from "./AuthModal";
import { useContext } from "react";
import { AuthContext } from "@/context/AuthContext";

const inter = Inter({ subsets: ["latin"] });

const Layout = ({ children }) => {
  const { isModalOpen } = useContext(AuthContext);

  return (
    <main className="relative">
      <Navbar />
      <div className={`p-16 flex justify-center ${inter.className}`}>
        {children}
      </div>
      {isModalOpen && (
        <div className="flex w-full z-30 justify-center bg-gray-900/[0.75] backdrop-blur-lg items-center fixed top-0 bottom-0 left-0 right-0">
          <AuthModal />
        </div>
      )}
    </main>
  );
};

export default Layout;
