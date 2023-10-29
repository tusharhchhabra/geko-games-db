import extractId from "./extractId";
import adjustImageUrl from "./adjustImageUrl";

const queries = {
  game: function (id) {
    return `fields *; where id = ${id};`;
  },

  top10Games:
    "fields name, id; where total_rating_count >= 100; sort total_rating desc; limit 10;",

  actionGames:
    "fields id, name; where total_rating_count >= 100 & themes = 1; sort total_rating desc; limit 10;",

  coverArt: function (games) {
    return `fields game, url; where game = ${extractId(games)};`;
  },

  gamesWithCoverArt: function top10GamesWithCoverArt(
    games,
    covers,
    coverFormat
  ) {
    return games.map((game) => {
      const cover = covers.find((cover) => cover.game === game.id);
      const coverUrl = cover ? adjustImageUrl(cover.url, coverFormat) : null;
      return {
        ...game,
        coverUrl,
      };
    });
  },
};

export default queries;
