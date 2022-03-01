-- Create a table to store user accounts in.
CREATE TABLE accounts (
	id INT AUTO_INCREMENT PRIMARY KEY,
	username VARCHAR(50) NOT NULL,
	password VARCHAR(30) NOT NULL,
	CONSTRAINT usernameUnique UNIQUE (username) 
);

CREATE TABLE reviews (
	id INT AUTO_INCREMENT PRIMARY KEY,
	heroesName VARCHAR(30) NOT NULL,
	name VARCHAR(30) NOT NULL,
	rating INT NOT NULL,
	description TEXT NOT NULL
);

-- Create a dummy account for testing.
INSERT INTO accounts (username, password) VALUES ("Alice", "abc123");
INSERT INTO accounts (username, password) VALUES ("Hugo", "abc123");
INSERT INTO accounts (username, password) VALUES ("Sebbe", "abc123");

-- Create reviews for Cassia and Azmodan.
INSERT INTO reviews (heroesName, name, rating, description) VALUES ("Cassia", "Hugo", 4, "I think this build is very good");
INSERT INTO reviews (heroesName, name, rating, description) VALUES ("Azmodan", "Sebbe", 5, "I like to split push with this build");