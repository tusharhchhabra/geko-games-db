const date30DaysAgo = new Date();
date30DaysAgo.setDate(date30DaysAgo.getDate() - 30);
const timestamp30DaysAgo = Math.floor(date30DaysAgo.getTime() / 1000);

export default timestamp30DaysAgo;