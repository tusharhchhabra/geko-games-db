import "../styles/globals.css";
import { FavouritesProvider } from "../context/FavouritesProvider";
import Layout from "@/components/Layout";
import { AuthProvider } from "@/context/AuthContext";

function MyApp({ Component, pageProps }) {
  // Retrieve the user ID from wherever it is stored (e.g., global state, local storage, etc.)
  const userId = 1; // Replace with actual logic to retrieve user ID

  return (
    <AuthProvider>
    <FavouritesProvider userId={userId}>
      {" "}
      {/* Pass the userId to the provider */}
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </FavouritesProvider>
    </AuthProvider>
  )};

export default MyApp;
