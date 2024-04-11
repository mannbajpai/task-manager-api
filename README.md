# Task Manager API

Welcome to the Task Manager API documentation. This REST API provides endpoints to manage tasks and users in a task management application.

## Getting Started
- **Clone the repository**
```bash
git clone https://github.com/mannbajpai/task-manager-api
```
- **Get All the dependencies**
```bash
npm install
```
- **Set up your environment variables in .env**
```
DB_NAME=
DB_USERNAME=
DB_PASSWORD=
JWT_SECRET=
PORT=
```
- **Run the node app**
```bash
npm start
```
## Routes

### User Registration

- **POST /api/v1/users/register**
  - Description: Register a new user using a username and password. The password is hashed and saved securely in the MySQL database.
  - Request Body:
    ```json
    {
      "username": "example_user",
      "password": "example_password"
    }
    ```
  - Response:
    ```json
    {
      "id": "1",
      "username": "example_user",
      "password": "ntJZcTPavuwgjIC9MfwOVPxpIew3Bsdz" //Hashed Password
    }
    ```

### Authentication

- **POST /api/v1/auth/login**
  - Description: Log in with username and password to generate a JWT token for authentication. The token is stored in an HTTP-only cookie.
  - Request Body:
    ```json
    {
      "username": "example_user",
      "password": "example_password"
    }
    ```
  - Response:
    ```json
    {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjYsImV4cCI6OF8DIVh82qgcq6bxDMBk"
    }
    ```

- **POST /api/v1/auth/logout**
  - Description: Log out by clearing the JWT token cookie.
  - Response:
    ```json
    {
      "message": "Logout successful"
    }
    ```

### Task Management

- **GET /api/v1/tasks/**
  - Description: Get user's all tasks for the authenticated user.
  - Response:
    ```json
    [
      {
        "id": "1",
        "title": "Task 1",
        "description": "Description of Task 1",
        "userId": "1"
      },
      {
        "id": "2",
        "title": "Task 2",
        "description": "Description of Task 2",
        "userId": "1"
      }
    ]
    ```

- **POST /api/v1/tasks/**
  - Description: Create a new task for the authenticated user.
  - Request Body:
    ```json
    {
      "title": "New Task",
      "description": "Description of New Task"
    }
    ```
  - Response:
    ```json
    {
      "id": "3",
      "title": "New Task",
      "description": "Description of New Task",
      "userId": "1"
    }
    ```

- **GET /api/v1/tasks/:taskId**
  - Description: Get details of a specific task.
  - Response:
    ```json
    {
      "id": "1",
      "title": "Task 1",
      "description": "Description of Task 1",
      "userId": "1"
    }
    ```

- **PUT /api/v1/tasks/:taskId**
  - Description: Update details of a specific task.
  - Request Body:
    ```json
    {
      "title": "Updated Task",
      "description": "Updated Description of Task"
    }
    ```
  - Response:
    ```json
    {
        "id": updatedId,
        "title": "Updated Task",
        "description": "Updated Description of Task",
        "userId": 13
    }
    ```

- **DELETE /api/v1/tasks/:taskId**
  - Description: Delete a specific task.
  - Response:
    ```json
    {
        message:"Task deleted successfully" 
    }
    ```

## Unit Testing

Unit testing for this API is implemented using Jest. Test cases cover the functionality of user registration, authentication, and task management endpoints. To run the tests, use the following command:

```bash
npm test
```

Make sure to have Jest and other required dependencies installed in your project before running the tests.

**_NOTE:_**  As test run parallely there might be a case that PORT is already in use hence run the test individually.