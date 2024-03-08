---

# Backend README

## Project Overview

This backend repository serves as the foundation for our application. It is responsible for handling server-side logic, database interactions, and routing.

## Directory Structure

The project directory is structured as follows:

```
C:.
│   index.js
│
├───config
│       dbConfig.js
│
├───controllers
│       authController.js
│       postController.js
│
├───middle
│       updatePassword.js
│
├───models
│       post.js
│       user.js
│
└───routes
        authRoutes.js
        postRoutes.js
```

- `index.js`: Main entry point of the application.
  
### Configuration (`config`)

- `dbConfig.js`: Configuration file for connecting to the database.

### Controllers (`controllers`)

- `authController.js`: Controller handling authentication-related logic.
- `postController.js`: Controller handling post-related logic.

### Middleware (`middle`)

- `updatePassword.js`: Middleware for updating user passwords.

### Models (`models`)

- `post.js`: Model definition for posts.
- `user.js`: Model definition for users.

### Routes (`routes`)

- `authRoutes.js`: Defines routes related to authentication.
- `postRoutes.js`: Defines routes related to posts.

## Environment Variables

Ensure to set up your environment variables by creating a `.env` file in the root directory with the following variables:

```dotenv
PORT=3001
MONGODB_URI=your_mongodb_connection_string
SECRET_KEY=your_secret_key
TOKEN_EXPIRATION_TIME=time_duration_you_want
CLOUDINARY_CLOUD_NAME='your_cloudinary_name'
CLOUDINARY_API_KEY='your_cloudinary_api_key'
CLOUDINARY_API_SECRET='your_cloudinary_secret_key'
```

## Getting Started

1. **Install Dependencies**: Run `npm install` to install all required dependencies.
2. **Database Setup**: Ensure that the database is properly configured in `dbConfig.js`.
3. **Start the Server**: Run `node index.js` to start the server.
4. **Test Endpoints**: Use a tool like Postman to test the defined API endpoints.

## Contributing

Contributions are welcome! If you find any issues or have suggestions for improvements, please feel free to open an issue or submit a pull request.

## License

This project is licensed under the [MIT License](LICENSE).

---