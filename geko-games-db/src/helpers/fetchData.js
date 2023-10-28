const fetchGames = async () => {
  const igdbApiUrl = "https://api.igdb.com/v4/games";

  const headers = new Headers({
    "Client-ID": process.env.TWITCH_CLIENT_ID,
    Authorization: process.env.TWITCH_AUTH_TOKEN,
    Accept: "application/json",
  });

  const query = "fields name; limit 10;";

  try {
    const res = await fetch(igdbApiUrl, {
      method: "POST",
      headers: headers,
      body: query,
    });
    if (!res.ok) {
      console.log(res.status, res.statusText);
    }
    return await res.json();
  } catch (err) {
    console.log(err);
    return null;
  }
};

export default fetchGames;
