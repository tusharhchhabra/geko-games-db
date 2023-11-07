import { getTimestamp30DaysAgo } from "./findTime";
import extractId from "./extractId";
import adjustImageUrl from "./adjustImageUrl";

const queries = {
  game: function (id) {
    return `fields *; where id = ${id}; limit 50;`;
  },

  gameDetails: function (id) {
    return `fields name, category, cover.url, first_release_date, game_modes, genres.name, platforms.abbreviation, screenshots.url, summary, themes.name, websites.category, websites.url, similar_games.name, similar_games.cover.url, total_rating, videos.video_id; where id = ${id};`;
  },

  top10Games:
    "fields name, id; where total_rating_count >= 100; sort total_rating desc; limit 10;",

  actionGames:
    "fields id, name; where total_rating_count >= 100 & themes = 1; sort total_rating desc; limit 10;",

  newGames: `fields id, name, first_release_date; where total_rating_count >= 5 & first_release_date > ${getTimestamp30DaysAgo()}; sort total_rating desc; limit 10;`,

  genresForGame: function (game) {
    if (!game.genres || game.genres.length === 0) return null;
    return `fields name; where id = (${game.genres.join(", ")});`;
  },

  platformsForGame: function (game) {
    if (!game.platforms || game.platforms.length === 0) return null;
    return `fields abbreviation; where id = (${game.platforms.join(", ")});`;
  },

  videosForGame: function (game) {
    if (!game.videos || game.videos.length === 0) return null;
    return `fields video_id; where id = (${game.videos.join(", ")});`;
  },

  screenshotsForGame: function (game) {
    if (!game.screenshots || game.screenshots.length === 0) return null;
    return `fields url, width, height; where id = (${game.screenshots.join(
      ", "
    )});`;
  },

  websitesForGame: function (game) {
    if (!game.websites || game.websites.length === 0) return null;
    return `fields url, category; where id = (${game.websites.join(", ")});`;
  },

  similarGames: function (game) {
    if (!game.similar_games || game.similar_games.length === 0) return null;
    return `fields name, cover.url; where id = (${game.similar_games.join(
      ", "
    )});`;
  },

  themes: "fields id, name;",

  gamesByTheme: function gamesByTheme(themeId) {
    return `fields name, id, total_rating; where total_rating >= 50 & themes = [${themeId}] & total_rating_count > 6; sort total_rating desc; limit 10;`;
  },

  coverArtForGames: function (games) {
    return `fields game, url; where game = ${extractId(games)}; limit 50;`;
  },

  coverArtForGame: function (game) {
    return `fields game, url; where game = ${game.id};`;
  },

  gamesWithCoverArt: function (games, covers, coverFormat) {
    return games.map((game) => {
      const cover = covers.find((cover) => cover.game === game.id);
      const coverUrl = cover ? adjustImageUrl(cover.url, coverFormat) : null;
      return {
        ...game,
        coverUrl,
      };
    });
  },

  searchedGamesWithSizedCovers: function (games, coverFormat) {
    return games.map((game) => {
      if (!game.cover) return game;
      const formattedUrl = adjustImageUrl(game.cover.url, coverFormat);
      return {
        ...game,
        cover: { ...game.cover, url: formattedUrl },
      };
    });
  },

  videos: function (gameID) {
    return `fields video_id; where game = ${gameID}; sort created_at desc; limit 1;`;
  },

  genres: `fields id, name; limit 20; sort name asc;`,
  themes: `fields id, name; limit 20; sort name asc;`,
  modes: `fields id, name; limit 20; sort name asc;`,

  genresForSearch: `fields id, name; limit 20; sort name asc; where id = (31,33,35,4,32,36,7,8,2,9,26,10,11,12,5,14,15);`,
  themesForSearch: `fields id, name; limit 20; sort name asc; where id = (1,28,27,31,34,17,22,19,43,32,38,44,33,18,23,21);`,
  modesForSearch: `fields id, name; limit 20; sort name asc;`,
  platforms: `fields id, name; limit 10; sort generation desc; where id = (6,48, 38, 9, 49, 12, 11, 130, 41, 20);`,

  topPlatforms: `fields id, name; limit 10; sort generation desc; where id = (6, 169, 167, 48, 38, 9, 49, 12, 11, 130, 41, 20);`,

  gamesByPlatform: function (platformId) {
    return `fields name, id; where platforms = [${platformId}] & rating > 70 & rating_count > 30 & version_parent = null & parent_game = null; sort total_rating desc; limit 10;`;
  },

  gamesByThemeAndPlatform: function gamesByTheme(themeId, platformId) {
    return `fields name, id; where total_rating >= 60 & themes = [${themeId}] & platforms = [${platformId}] & total_rating_count > 50; sort total_rating desc; limit 10;`;
  },

  top10GamesByPlatform: function (platformId) {
    return ` fields name, id; where total_rating_count >= 100 & total_rating > 80 & platforms = [${platformId}] & version_parent = null & parent_game = null; sort total_rating desc; limit 10;`;
  },

  newGamesByPlatform: function (platformId) {
    return `fields id, name, first_release_date; where total_rating_count >= 5 & platforms = [${platformId}]; sort first_release_date desc; limit 10;`;
  },
};

export default queries;
