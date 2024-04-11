# Task Manager API

Welcome to the Task Manager API documentation. This API provides endpoints to manage tasks and users in a task management application.

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
      "username": "example_user"
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
      "message": "Login successful"
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
  - Description: Get all tasks for the authenticated user.
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
      "message": "Task updated successfully"
    }
    ```

- **DELETE /api/v1/tasks/:taskId**
  - Description: Delete a specific task.
  - Response:
    ```json
    {
      "message": "Task deleted successfully"
    }
    ```

## Unit Testing

Unit testing for this API is implemented using Jest. Test cases cover the functionality of user registration, authentication, and task management endpoints. To run the tests, use the following command:

```bash
npm test
```

Make sure to have Jest and other required dependencies installed in your project before running the tests.