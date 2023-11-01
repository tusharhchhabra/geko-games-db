import { createTables, dropTables } from "./create";

const { sql } = require("@vercel/postgres");

const users = [
  { username: "john_doe", email: "john.doe@example.com" },
  { username: "jane_doe", email: "jane.doe@example.com" },
];

const favoriteGames = [...Array(20)].map((v, i) => {
  return { gameId: i + 1, userId: 1 };
});

async function seedUsers() {
  for (const user of users) {
    await sql`
      INSERT INTO users (username, email)
      VALUES (${user.username}, ${user.email});
    `;
  }
}

async function seedFavoriteGames() {
  for (const favoriteGame of favoriteGames) {
    await sql`
      INSERT INTO favorite_games (game_id, user_id)
      VALUES (${favoriteGame.gameId}, ${favoriteGame.userId});
    `;
  }
}

async function seedDatabase() {
  await dropTables();
  await createTables();
  await seedUsers();
  await seedFavoriteGames();
  console.log("Database seeded successfully");
}

export default seedDatabase;
