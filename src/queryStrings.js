import extractId from "./helpers/extractId";
import adjustImageUrl from "./helpers/adjustImageUrl";
import { getTimestamp30DaysAgo } from "./helpers/findTime";

const queries = {
  top10Games:
    "fields name, id; where total_rating_count >= 100; sort total_rating desc; limit 10;",

  newGames: `fields id, name, first_release_date; where total_rating_count >= 5 & first_release_date > ${getTimestamp30DaysAgo()}; sort total_rating desc; limit 10;`,

  themes: "fields id, name;",

  gamesByTheme: function gamesByTheme(themeId) {
    return `fields name, id, total_rating; where total_rating >= 50 & themes = ${themeId} & total_rating_count > 6; sort total_rating desc; limit 10;`;
  },

  coverArt: function (games) {
    return `fields game, url; where game = ${extractId(games)};`;
  },

  gamesWithCoverArt: function gamesWithCoverArt(games, covers, coverFormat) {
    return games.map((game) => {
      const cover = covers.find((cover) => cover.game === game.id);
      const coverUrl = cover ? adjustImageUrl(cover.url, coverFormat) : null;
      return {
        ...game,
        coverUrl,
      };
    });
  },

  videos: function (gameID) {
    return `fields video_id; where game = ${gameID}; sort created_at desc; limit 1;`;
  },
};

export default queries;
