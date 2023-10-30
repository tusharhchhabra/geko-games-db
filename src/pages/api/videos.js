import fetchData from "@/helpers/fetchData";
import queries from "@/helpers/queryStrings";

export default async function getVideos(req, res) {
  if (req.method !== "GET") {
    res.statusCode = 405;
    res.end("Method Not Allowed");
    return;
  }

  const { videoID } = req.query;

  const videoQuery = queries.videos(videoID);
  const endpoint = "game_videos";

  const video = await fetchData(videoQuery, endpoint);

  res.send(video);
}
