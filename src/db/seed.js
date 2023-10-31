import { sql } from "@vercel/pg";

const users = [
  { username: "john_doe", email: "john.doe@example.com" },
  { username: "jane_doe", email: "jane.doe@example.com" },
];

const favoriteGames = [
  { gameId: 1, userId: 1 },
  { gameId: 2, userId: 1 },
  { gameId: 3, userId: 2 },
];

async function seedUsers() {
  for (const user of users) {
    await sql`
      INSERT INTO "User" (username, email)
      VALUES (${user.username}, ${user.email});
    `;
  }
}

async function seedFavoriteGames() {
  for (const favoriteGame of favoriteGames) {
    await sql`
      INSERT INTO "FavoriteGame" (game_id, user_id)
      VALUES (${favoriteGame.gameId}, ${favoriteGame.userId});
    `;
  }
}

async function seedDatabase() {
  await seedUsers();
  await seedFavoriteGames();
  console.log("Database seeded successfully");
}

seedDatabase().catch((error) => console.error("Seeding failed:", error));
