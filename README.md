# Movie App - React, Tailwind CSS, and TMDB API

This project is a movie application built with React.js and styled using Tailwind CSS. It leverages the TMDB (The Movie Database) API to fetch and display movie information. The UI design was initially created in Figma.

## Features

* **Movie Listings:** Displays a comprehensive list of movies fetched from the TMDB API.
* **Trending Movies:** Shows a selection of trending movies based on user popularity.
* **Search Functionality:**
    * Allows users to search for specific movies.
    * Implements a debouncing mechanism on the search bar. This means that API requests are only sent after a 500ms pause in user input, optimizing performance and reducing unnecessary API calls.
* **Responsive Design:** Utilizes Tailwind CSS for a responsive and visually appealing user interface.
* **Figma Design:** The UI design is based on a Figma prototype, ensuring a consistent and professional look.

## Technologies Used

* **React.js:** For building the user interface and managing application state.
* **Tailwind CSS:** For styling the application with a utility-first CSS framework.
* **TMDB API:** For fetching movie data.
* **Figma:** For designing the initial UI prototype.
* **JavaScript:** For application logic and API interactions.

## Getting Started

1.  **Clone the repository:**

    ```bash
    git clone [https://github.com/nanbont/movie-app.git](https://github.com/nanbont/movie-app.git)
    cd movie-app
    ```

2.  **Install dependencies:**

    ```bash
    npm install
    ```

3.  **Obtain a TMDB API key:**

    * Visit [The Movie Database (TMDB)](https://www.themoviedb.org/) and create an account.
    * Generate an API key from your account settings.

4.  **Create a `.env.local` file:**

    * In the root directory of the project, create a file named `.env.local`.
    * Add your TMDB API key to the file:

        ```
        REACT_APP_TMDB_API_KEY=your_api_key_here
        ```

5.  **Start the development server:**

    ```bash
    npm start
    ```

6.  **Open your browser:**

    * The application will be available at `http://localhost:3000`.

## Project Structure



movie-app/
├── public/
├── src/
│   ├── components/
│   ├── pages/
│   ├── App.js
│   ├── index.js
│   ├── ...
├── .gitignore
├── package.json
├── README.md
└── ...



* `public/`: Contains static assets.
* `src/components/`: Houses reusable React components.
* `src/pages/`: Contains the main pages of the application.
* `src/App.js`: The main application component.
* `src/index.js`: The entry point of the application.
* `.gitignore`: Specifies files and directories to be ignored by Git.
* `package.json`: Contains project dependencies and scripts.

## Debouncing Implementation

The search bar functionality uses a debouncing technique to prevent excessive API calls. This is achieved by delaying the API request until the user has stopped typing for 500 milliseconds. This improves performance and reduces the load on the TMDB API.

## UI Design

The user interface was designed in Figma, providing a clear and consistent visual style for the application. This ensures a professional and user-friendly experience.

## Contributing

Contributions are welcome! Please feel free to submit pull requests or open issues to suggest improvements or report bugs.







