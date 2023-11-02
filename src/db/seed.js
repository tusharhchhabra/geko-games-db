import { createTables, dropTables } from "./createTables";

const { sql } = require("@vercel/postgres");

const users = [
  {
    username: "john_doe",
    email: "john.doe@example.com",
    passwordDigest: "example_password_digest",
  },
  {
    username: "jane_doe",
    email: "jane.doe@example.com",
    passwordDigest: "example_password_digest",
  },
];

const favoriteGames = [...Array(20)].map((v, i) => {
  return { gameId: i + 1, userId: 1 };
});

async function seedUsers() {
  for (const user of users) {
    await sql`
      INSERT INTO users (username, email, password_digest)
      VALUES (${user.username}, ${user.email}, ${user.passwordDigest});
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
