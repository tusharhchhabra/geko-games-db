function adjustImageUrl(url, targetUrl) {
  return "https:" + url.replace('t_thumb', targetUrl);
}

export default adjustImageUrl;

