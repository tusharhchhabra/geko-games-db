const { PrismaClient } = require("@prisma/client");
const db = new PrismaClient();

const users = db.user.findMany();

users.then((data) => console.log(data)).catch((e) => console.error(e));
