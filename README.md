```markdown
# Nibble Network

Nibble Network is a web application that allows users to save and view their favorite recipes.

## Table of Contents

- [Introduction](#introduction)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Setup](#setup)
- [Usage](#usage)
- [Database Schema](#database-schema)
- [Contributing](#contributing)
- [License](#license)

## Introduction

Nibble Network is designed to help users organize and save their favorite recipes. The application provides a user-friendly interface for registration, login, and recipe management.

## Features

- User authentication (registration and login)
- Save favorite recipes with a user-specific dashboard
- Search for recipes based on ingredients
- Database integration for user and recipe data

## Technologies Used

- Node.js
- Express.js
- Sequelize (MySQL)
- Passport.js (for authentication)
- Handlebars (view engine)
- HTML, CSS, JavaScript
- Bcrypt (password hashing)
- Axios (HTTP requests)

```
## Setup

1. Clone the repository:

   ```bash
   git clone https://github.com/cjenschke/nibble-network.git
   ```

2. Install dependencies:

   ```bash
   npm i
   ```

3. Sign into MySQL
   ```bash
   mysql -u root -p
   ```

4. Source the Schema file
   ```bash
   source Nibble-Network/db/schema.sql
   ```

5. Run the server
   ```bash
   node server.js
   ```
   Or
   ```bash
   nodemon server.js
   ```

5. Open the application in your browser:

   [http://localhost:3000](http://localhost:3000)

## Usage

- Register a new account.
- Log in with your credentials.
- Save your favorite recipes in the dashboard.
- Search for recipes based on ingredients.

## Database Schema

The database schema includes tables for users, recipes, sessions, and ingredients. You can find details in the `models` directory.



## License

This project is licensed under the [MIT License](LICENSE).

