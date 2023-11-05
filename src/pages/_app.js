import "../styles/globals.css";
import { FavouritesProvider } from "../context/FavouritesProvider";
import Layout from "@/components/Layout";
import { AuthContext, AuthProvider } from "@/context/AuthContext";
import { useContext } from "react";

function MyApp({ Component, pageProps }) {
  return (
    <AuthProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </AuthProvider>
  );
}

export default MyApp;
