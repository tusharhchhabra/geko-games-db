function adjustImageUrl(url) {
  return "https:" + url.replace("t_thumb", "t_cover_big");
}

export default adjustImageUrl;
