# Task Management Application

## Overview

This is a Task Management application built using Next.js, MongoDB, and Clerk for authentication. It allows users to add, update, delete, and retrieve tasks. The application ensures that tasks are assigned to specific users and provides filtering and searching functionalities.

## Features

- **User Authentication**: User registration, login, and logout functionalities using Clerk.
- **Task Management**: Create, update, delete, and retrieve tasks.
- **Task Filtering and Searching**: Filter tasks by status and search tasks by title or description.
- **User Assignment**: Assign tasks to specific users.
- **Protected Routes**: Routes for managing tasks are protected and can only be accessed by authenticated users.
- **Error Handling**: Graceful error handling to provide useful feedback to users.

## Technologies Used

- **Next.js**: A React framework for building fast, modern web applications.
- **MongoDB**: A NoSQL database for storing user and task data.
- **Mongoose**: An ODM (Object Data Modeling) library for MongoDB and Node.js.
- **Clerk**: A user management and authentication service.
- **Tailwind CSS**: A utility-first CSS framework for rapidly building custom user interfaces.
- **React Hook Form**: A library for managing form state and validation.

## Usage

### User Authentication

- **Registration**: Users can register using Clerk's registration form.
- **Login**: Users can log in using Clerk's login form.
- **Logout**: Users can log out using Clerk's logout functionality.

### Task Management

- **Add Task**: Users can add a new task by providing a title and description. The task will be assigned a default status of `toDo`.
- **Update Task**: Users can update the title, description, and status of a task.
- **Delete Task**: Users can delete a task.
- **Retrieve Tasks**: Users can retrieve tasks, with options to filter by status and search by title or description.

### Protected Routes

- Routes for managing tasks are protected and can only be accessed by authenticated users.
