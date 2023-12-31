# Games DB

Games DB is a comprehensive games database web application built using Next.js, leveraging the IGDB API to fetch a vast collection of video game information. Users can search for games, filter results based on platforms and themes, view game details including screenshots, trailers, average ratings, release dates, and more. Registered users can also save their favorite games to a personalized Favorites list.

## Features

- **Search**: Quickly find games using the persistent search bar.
- **Categories**: Narrow down games by platforms or themes.
- **Game Details**: View extensive information about each game, including screenshots, trailers and ratings.
- **Favorites List**: Save and manage a list of your favorite games.
- **Responsive Design**: Use on either desktop or your phone.
- **User Authentication**: Create an account with your email and manage your favorites list.
- **Modern, dynamic UI**: Made with love and care.

## Getting Started

Follow these instructions to set up Games DB locally for development.

### Prerequisites

- Node.js version >= 16.14
- IGDB API client ID and authorization token 
- A Vercel PostgreSQL database (for managing users and favorites)
- An OpenAI API key for the AI game suggestions feature

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
   Copy the .env.example file to a new file named .env.development.local, and fill in the required API keys and database credentials.

4. **Run the app in development mode**:
   ```sh
    npm run dev
   ```
   The app will be accessible at http://localhost:3000.

## Dependencies

[React](https://www.npmjs.com/package/react) - UI Library

[React-DOM](https://www.npmjs.com/package/react-router-dom) - Client-side navigation

[Next.js 13.5.6](https://nextjs.org/) - API routing and integration with Vercel services

[Vercel Postgres](https://vercel.com/docs/storage/vercel-postgres) - Plays nicely with Next.js, easy deployment

[bcrypt.js](https://www.npmjs.com/package/bcryptjs) - Password hashing and verification

[cookie](https://www.npmjs.com/package/cookie) - Secure cookies for authentication

[jose](https://www.npmjs.com/package/jose) - JWT Signing and Authentication

[Tailwind CSS](https://www.npmjs.com/package/tailwindcss) - Styling

[HeadlessUI](https://headlessui.com) - Combobox for the Search bar

[LightGallery.js](https://www.lightgalleryjs.com) - Lightbox for images and videos

[FontAwesome](https://fontawesome.com) - Icons


## Limitations

- Does not yet have the ability to refresh the JWT token for the logged in state.
- Game information is sourced from the IGDB API and is read-only - it cannot be added to or modified.
- Game data is user-submitted and may vary in completeness. However, a majority of the widely popular games have extensive information available.

## Credits

Thanks to the creators of IGDB for providing the extensive game database, and to the creators of all dependency packages listed above. Big thanks to our mentors at Lighthouse Labs for being there to guide us at numerous points in our journey.

