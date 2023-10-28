const fetchGames = async () => {
  const corsAnywhereUrl = "http://localhost:8080/";
  const igdbApiUrl = "https://api.igdb.com/v4/games";

  const proxyUrl = corsAnywhereUrl + igdbApiUrl;

  const headers = new Headers({
    "Client-ID": process.env.TWITCH_CLIENT_ID,
    Authorization: process.env.TWITCH_AUTH_TOKEN,
    Accept: "application/json",
  });

  const query = "fields name; limit 10;";

  return fetch(proxyUrl, {
    method: "POST",
    headers: headers,
    body: query,
  })
    .then((response) => response.json())
    .catch((error) => console.error("Error:", error));
};

export default fetchGames;
