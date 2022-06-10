-- Create a table to store user accounts in.
CREATE TABLE accounts (
	id INT AUTO_INCREMENT PRIMARY KEY,
	username VARCHAR(50) NOT NULL,
	password CHAR(60) NOT NULL,
	is_admin BOOLEAN DEFAULT false,
	CONSTRAINT usernameUnique UNIQUE (username) 
);

CREATE TABLE reviews (
	id INT AUTO_INCREMENT PRIMARY KEY,
	hero_name VARCHAR(30) NOT NULL,
	name VARCHAR(30) NOT NULL,
	rating INT NOT NULL,
	description TEXT NOT NULL,
	author_id INT NOT NULL,
	FOREIGN KEY (author_id) REFERENCES accounts(id) ON DELETE CASCADE
);

CREATE TABLE builds (
	id INT AUTO_INCREMENT PRIMARY KEY,
	name VARCHAR(30) NOT NULL,
	description TEXT,
	hero_id INT NOT NULL,
	level_1_talentTreeId VARCHAR(100) NOT NULL,
	level_4_talentTreeId VARCHAR(100) NOT NULL,
	level_7_talentTreeId VARCHAR(100) NOT NULL,
	level_10_talentTreeId VARCHAR(100) NOT NULL,
	level_13_talentTreeId VARCHAR(100) NOT NULL,
	level_16_talentTreeId VARCHAR(100) NOT NULL,
	level_20_talentTreeId VARCHAR(100) NOT NULL
);

-- Create a dummy account for testing.
INSERT INTO accounts (username, password, is_admin) 
VALUES 	('admin', '$2b$10$rv3Vmhl6e.FjIsrilDbGcuv6z.2CYAKw3vt2OYglNjV3tYCMxlW7i', true);

-- Create reviews for Cassia and Azmodan.
INSERT INTO reviews (hero_name, name, rating, description, author_id) VALUES ("Murky", "admin", 4, "I think this build is very good", 1);
INSERT INTO reviews (hero_name, name, rating, description, author_id) VALUES ("Murky", "admin", 5, "I like to split push with this build", 1);
