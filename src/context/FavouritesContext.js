import { createContext } from "react";

const FavouritesContext = createContext({
  favourites: [],
  toggleFavourite: () => {},
  state: {},
});

export default FavouritesContext;
