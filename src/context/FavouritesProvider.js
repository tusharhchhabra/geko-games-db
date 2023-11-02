import React from "react";
import FavouritesContext from "./FavouritesContext";
import useApplicationData from "../hooks/useApplicationData";

export const FavouritesProvider = ({ children, userId }) => {
  const { state, toggleFavourite } = useApplicationData(userId);

  const contextValue = {
    favourites: state.favourites,
    toggleFavourite,
    state,
  };

  return (
    <FavouritesContext.Provider value={contextValue}>
      {children}
    </FavouritesContext.Provider>
  );
};
