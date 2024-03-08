---

# Assignment Full Stack

## Project Overview

MelodyVerse is a full-stack web application that allows users to create posts, interact with other users' posts, and manage their profiles. The application implements features such as protected routes, JWT authorization, session management, infinite scroll pagination, and more.

## Functionality

- **Protected Routes**: Certain routes are protected and require JWT authorization for access.
- **JWT Authorization**: JSON Web Tokens (JWT) are used for user authentication and authorization.
- **Session Management**: Sessions are managed securely using server-side mechanisms.
- **Infinite Scroll Pagination**: The posts list page utilizes infinite scroll pagination for smooth user experience.
- **MongoDB**: Data is stored in a MongoDB database, ensuring scalability and flexibility.
- **Tailwind CSS**: The user interface is styled using Tailwind CSS for a modern and responsive design.
- **Responsive Design**: The application is designed to be fully responsive, adapting to various screen sizes.
- **Error and Success Messages**: Clear error and success messages are displayed to users for better feedback.
- **Password Security**: Passwords are securely stored using bcrypt, a strong hashing algorithm.
- **Environment Variables**: Sensitive information such as API keys and secret keys are stored as environment variables.

## Technologies UsedTerminal Markdown Previewers: Some terminal-based markdown previewers, like mdcat or glow, allow you to preview markdown files directly in your terminal.
- **Node.js**: JavaScript runtime environment for server-side development.
- **Express.js**: Web framework for Node.js, used for building the backend API.
- **MongoDB**: NoSQL database for storing user data and posts.
- **JWT**: JSON Web Tokens for user authentication and authorization.
- **bcrypt**: Library for securely hashing passwords.
- **Tailwind CSS**: Utility-first CSS framework for styling the user interface.
- **React.js**: JavaScript library for building user interfaces.
- **React Router**: Library for routing in React applications.
- **Axios**: HTTP client for making requests to the server.
- **Session Management**: Mechanism for managing user sessions.
- **dotenv**: Library for loading environment variables from a `.env` file.

## Password Reset Functionality

- **Current Password Middleware**: Middleware is implemented to authenticate users when resetting passwords.

## Screenshots

![Footer](/ScreenShots/Footer.png)
![Home](/ScreenShots/Home.png)
![Infinite_Scroll_1](/ScreenShots/infinite_scroll.png)
![Infinite_Scroll_2](/ScreenShots/infinite_scroll_2.png)
![Pagination](/ScreenShots/pagination.png)
![Post_with_Success_Message](/ScreenShots/Post_with_Succes-msg.png)
![Profile](/ScreenShots/Profile.png)
![Responsive_Posts](/ScreenShots/responsive_posts.png)
![Responsive_Signup](/ScreenShots/Responsive_signup.png)
![Sign-up](/ScreenShots/Sign_up.png)

## Getting Started

1. Clone this repository to your local machine.
2. Install dependencies by running `npm install`.
3. Set up your MongoDB database and configure the connection string in `.env`.
4. Set up environment variables in a `.env` file.
5. Start the server by running `npm start`.
6. Start the client by navigating to the `client` directory and running `npm start`.

## Contributing

Contributions are welcome! If you find any issues or have suggestions for improvements, please feel free to open an issue or submit a pull request.

## License

This project is licensed under the [MIT License](LICENSE).

---
