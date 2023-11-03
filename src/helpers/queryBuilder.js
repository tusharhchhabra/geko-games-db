const buildQuery = ({
  name = "",
  genres = [],
  themes = [],
  platforms = [],
  modes = [],
  fromDate = "",
  toDate = "",
  ratings = [],
  limit = 10,
  offset = 0,
}) => {
  let query = `fields name, genres.name, themes.name, platforms.name, game_modes.name, first_release_date, total_rating;`;

  const whereClauses = [];

  if (name) {
    whereClauses.push(`name ~ *"${name}"*`);
  }

  if (genres.length > 0) {
    whereClauses.push(`genres = (${genres.join(",")})`);
  }

  if (themes.length > 0) {
    whereClauses.push(`themes = (${themes.join(",")})`);
  }

  if (platforms.length > 0) {
    whereClauses.push(`platforms = (${platforms.join(",")})`);
  }

  if (modes.length > 0) {
    whereClauses.push(`game_modes = (${modes.join(",")})`);
  }

  if (fromDate && toDate) {
    whereClauses.push(
      `first_release_date >= ${
        new Date(fromDate).getTime() / 1000
      } & first_release_date <= ${new Date(toDate).getTime() / 1000}`
    );
  } else if (fromDate) {
    whereClauses.push(
      `first_release_date >= ${new Date(fromDate).getTime() / 1000}`
    );
  } else if (toDate) {
    whereClauses.push(
      `first_release_date <= ${new Date(toDate).getTime() / 1000}`
    );
  }

  if (ratings.length > 0) {
    whereClauses.push(
      `total_rating >= ${Math.min(...ratings)} & total_rating <= ${Math.max(
        ...ratings
      )}`
    );
  }

  if (whereClauses.length > 0) {
    query += `where ${whereClauses.join(" & ")};`;
  }

  query += `limit ${limit}; offset ${offset};`;

  return query;
};

export default buildQuery;