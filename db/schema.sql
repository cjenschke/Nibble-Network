-- Drop the database if it exists
DROP DATABASE IF EXISTS nibble_network_db;

-- Create the database
CREATE DATABASE nibble_network_db;

-- Use the created database
USE nibble_network_db;

-- Create the Users table
CREATE TABLE User (
  UserID INT PRIMARY KEY AUTO_INCREMENT,
  Username VARCHAR(255) NOT NULL,
  Email VARCHAR(255) NOT NULL,
  Password VARCHAR(255) NOT NULL -- Store hashed passwords for security
);

-- Create the Recipes table
CREATE TABLE Recipes (
  RecipeID INT PRIMARY KEY AUTO_INCREMENT,
  Title VARCHAR(255) NOT NULL,
  URL VARCHAR(255) NOT NULL
);


-- Create the UserRecipes table to establish many-to-many relationship
CREATE TABLE UserRecipe (
  user_recipe_id INTEGER AUTO_INCREMENT PRIMARY KEY,
  user_id INTEGER NOT NULL,
  recipe_id INTEGER NOT NULL,
  FOREIGN KEY (user_id) REFERENCES User (UserID),
  FOREIGN KEY (recipe_id) REFERENCES Recipes (RecipeID)
);



-- Query to get saved recipes for a user
-- Replace :userID with the actual user ID you want to retrieve recipes for
SELECT Recipes.Title, Recipes.URL
FROM UserRecipe
JOIN Recipes ON UserRecipe.recipe_id = Recipes.RecipeID
WHERE UserRecipe.user_id = 1; -- Replace 1 with the actual user ID

