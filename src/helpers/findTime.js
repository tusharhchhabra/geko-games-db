export function getTimestamp30DaysAgo() {
  const date30DaysAgo = new Date();
  date30DaysAgo.setDate(date30DaysAgo.getDate() - 30);
  return Math.floor(date30DaysAgo.getTime() / 1000);
}

export function getYearFromUnixTimestamp(unixTimestamp) {
  const date = new Date(unixTimestamp * 1000);
  const year = date.getFullYear();
  if (isNaN(year)) return "";
  return year;
}
