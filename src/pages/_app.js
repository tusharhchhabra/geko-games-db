import "../styles/globals.css";
import { FavouritesProvider } from "../context/FavouritesProvider";

function MyApp({ Component, pageProps }) {
  // Retrieve the user ID from wherever it is stored (e.g., global state, local storage, etc.)
  const userId = 1; // Replace with actual logic to retrieve user ID

  return (
    <FavouritesProvider userId={userId}>
      {" "}
      {/* Pass the userId to the provider */}
      <Component {...pageProps} />
    </FavouritesProvider>
  );
}

export default MyApp;
