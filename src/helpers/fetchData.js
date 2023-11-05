const fetchData = async (fetchQuery, endpoint) => {
  if (fetchQuery === null) return null;
  const igdbApiUrl = `https://api.igdb.com/v4/${endpoint}`;

  const headers = new Headers({
    "Client-ID": process.env.TWITCH_CLIENT_ID,
    Authorization: process.env.TWITCH_AUTH_TOKEN,
    Accept: "application/json",
  });

  try {
    const res = await fetch(igdbApiUrl, {
      method: "POST",
      headers: headers,
      body: fetchQuery,
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

export default fetchData;
