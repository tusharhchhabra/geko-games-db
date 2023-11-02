# Games DB

Games DB is a comprehensive games database web application built using Next.js, leveraging the IGDB API to fetch a vast collection of video game information. Users can search for games, filter results based on platforms or themes, view game details including screenshots, trailers, average ratings, release dates, and more. Additionally, users can save their favorite games to a personalized list.

## Features

- **Search Functionality**: Quickly find games with a robust search feature.
- **Filter Options**: Narrow down search results by platforms or themes.
- **Game Details**: View extensive information about each game, including media content and ratings.
- **Favorites List**: Save and manage a list of your favorite games.
- **Responsive Design**: Enjoy a seamless experience on both desktop and mobile devices.
- **User Authentication**: Securely log in and manage your favorites list.
- **Styling with Tailwind CSS**: A modern and responsive design.

## Getting Started

Follow these instructions to set up Games DB locally for development and testing purposes.

### Prerequisites

- Node.js version >= 16.14
- A Vercel PostgreSQL database (for managing user data and favorites)

### Installation

1. **Clone this project locally**:
   ```sh
   git clone <repository-url>
   cd <repository-folder>
   ```
2. **Install dependencies**:
   ```sh
   npm install
   ```
3. **Set up environment variables**:
   Copy the .env.example file to a new file named .env, and fill in the required API keys and database credentials.

   ```makefile
    # .env
    IGDB_CLIENT_ID=your_igdb_client_id
    IGDB_CLIENT_SECRET=your_igdb_client_secret
    DATABASE_URL=your_database_url
    JWT_SECRET=your_jwt_secret
   ```

4. **Run the app in development mode**:
   ```sh
    npm run dev
   ```
   The app will be accessible at http://localhost:3000.

## Dependencies

[React](https://www.npmjs.com/package/react)

[React-DOM](https://www.npmjs.com/package/react-router-dom)

[Next.js 13.5.6](https://nextjs.org/)

[Vercel Postgres](https://vercel.com/docs/storage/vercel-postgres)

[bcrypt.js](https://www.npmjs.com/package/bcryptjs)

[cookie](https://www.npmjs.com/package/cookie)

[JSONWebToken](https://www.npmjs.com/package/jsonwebtoken)

[Tailwind CSS](https://www.npmjs.com/package/tailwindcss)

[HeadlessUI](https://headlessui.com)

## Limitations

- The token refresh mechanism for IGDB API has not been implemented.
- Game information is sourced from the IGDB API and is read-only; it cannot be added or modified.
- Game data is user-submitted and may vary in completeness. However, most medium to large games have extensive information available.

## Credits

**IGDB API**: For providing the extensive game database.
**headlessUI**: For the combobox component.
**Tailwind CSS**: For the styling framework.
**Other Packages**: Thanks to the creators of various other packages used in this project.
