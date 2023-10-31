import { getTimestamp30DaysAgo } from "./findTime";
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

  newGames: `fields id, name, first_release_date; where total_rating_count >= 5 & first_release_date > ${getTimestamp30DaysAgo()}; sort total_rating desc; limit 10;`,

  genresForGame: function (game) {
    return `fields name; where id = (${game.genres.join(", ")});`;
  },

  platformsForGame: function (game) {
    return `fields name; where id = (${game.platforms.join(", ")});`;
  },

  videosForGame: function (game) {
    return `fields video_id; where id = (${game.videos.join(", ")});`;
  },

  screenshotsForGame: function (game) {
    return `fields url, width, height; where id = (${game.screenshots.join(
      ", "
    )});`;
  },

  websitesForGame: function (game) {
    return `fields url, category; where id = (${game.websites.join(", ")});`;
  },

  similarGames: function (game) {
    return `fields name, cover; where id = (${game.similar_games.join(", ")});`;
  },

  themes: "fields id, name;",

  gamesByTheme: function gamesByTheme(themeId) {
    return `fields name, id, total_rating; where total_rating >= 50 & themes = ${themeId} & total_rating_count > 6; sort total_rating desc; limit 10;`;
  },

  coverArtForGames: function (games) {
    return `fields game, url; where game = ${extractId(games)};`;
  },

  coverArtForGame: function (game) {
    return `fields game, url; where game = ${game.id};`;
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

  videos: function (gameID) {
    return `fields video_id; where game = ${gameID}; sort created_at desc; limit 1;`;
  },

  platforms: `fields id, name; limit 10; sort generation desc; where id = (6,48, 38, 9, 49, 12, 11, 130, 41, 20);`,

  topPlatforms: `fields id, name; limit 10; sort generation desc; where id = (6, 169, 167, 48, 38, 9, 49, 12, 11, 130, 41, 20);`,

  gamesByPlatform: function (platformId) {
    return `fields name, id; where platforms = [${platformId}] & rating > 70 & rating_count > 30 & version_parent = null & parent_game = null; sort total_rating desc; limit 10;`;
  },

  gamesByThemeAndPlatform: function gamesByTheme(themeId, platformId) {
    return `fields name, id; where total_rating >= 5 & themes = ${themeId} & platforms = [${platformId}] & total_rating_count > 1; sort total_rating desc; limit 10;`;
  },

  top10GamesByPlatform: function (platformId) {
    return ` fields name, id; where total_rating_count >= 100 & total_rating > 80 & platforms = [${platformId}] & version_parent = null & parent_game = null; sort total_rating desc; limit 10;`
  },

  newGamesByPlatform: function (platformId) {
    return `fields id, name, first_release_date; where total_rating_count >= 5 & platforms = [${platformId}]; sort first_release_date desc; limit 10;`;
  },

};

export default queries;
