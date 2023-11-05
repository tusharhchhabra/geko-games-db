import { useReducer, useEffect } from "react";

export const actions = {
  set_favourites: "set_favourites",
  toggle_favourite: "toggle_favourite",
};

function reducer(state, action) {
  switch (action.type) {
    case actions.set_favourites:
      return {
        ...state,
        favourites: action.payload,
      };
    case actions.toggle_favourite:
      const isFavourite = state.favourites.some(
        (fav) => fav.game_id === action.payload.game_id
      );
      return isFavourite
        ? {
            ...state,
            favourites: state.favourites.filter(
              (fav) => fav.game_id !== action.payload.game_id
            ),
          }
        : {
            ...state,
            favourites: [...state.favourites, action.payload],
          };

    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
}

// should take in userId
const useApplicationData = (userId) => {
  const initialState = {
    favourites: [],
  };

  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    if (!userId) {
      return;
    }
    const fetchFavourites = async () => {
      try {
        const response = await fetch(`/api/fetchFavourites?userId=${userId}`);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        if (data && data.games) {
          dispatch({ type: actions.set_favourites, payload: data.games });
        }
      } catch (error) {
        console.error("Error fetching favourites:", error);
      }
    };

    if (userId) {
      fetchFavourites();
    }
  }, [userId]);

  const toggleFavourite = async (gameId) => {
    const isFavourite = state.favourites.some((fav) => fav.game_id === gameId);
    const endpoint = isFavourite
      ? "/api/deleteFavourite"
      : "/api/createFavourite";
    const method = isFavourite ? "DELETE" : "POST";

    try {
      const response = await fetch(endpoint, {
        method: method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId, gameId }),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      const newGame = data.newFavourite.rows[0];

      dispatch({ type: actions.toggle_favourite, payload: newGame });
    } catch (error) {
      console.error(
        `Error ${isFavourite ? "deleting" : "adding"} favourite:`,
        error
      );
    }
  };

  return {
    state,
    toggleFavourite,
  };
};

export default useApplicationData;
