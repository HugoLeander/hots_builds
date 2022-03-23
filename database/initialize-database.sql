-- Create a table to store user accounts in.
CREATE TABLE accounts (
	account_id INT AUTO_INCREMENT PRIMARY KEY,
	username VARCHAR(50) NOT NULL,
	password VARCHAR(100) NOT NULL,
	is_admin BOOLEAN DEFAULT false,
	CONSTRAINT usernameUnique UNIQUE (username) 
);

CREATE TABLE reviews (
	review_id INT AUTO_INCREMENT PRIMARY KEY,
	hero_name VARCHAR(30) NOT NULL,
	name VARCHAR(30) NOT NULL,
	rating INT NOT NULL,
	description TEXT NOT NULL,
	author_account_id INT NOT NULL,
	FOREIGN KEY (author_account_id) REFERENCES accounts(account_id) ON DELETE CASCADE
);

CREATE TABLE builds (
	build_id INT AUTO_INCREMENT PRIMARY KEY,
	build_name VARCHAR(30) NOT NULL,
	description TEXT,
	hero_id INT NOT NULL,
	talentTreeId_level_1 VARCHAR(100) NOT NULL,
	talentTreeId_level_4 VARCHAR(100) NOT NULL,
	talentTreeId_level_7 VARCHAR(100) NOT NULL,
	talentTreeId_level_10 VARCHAR(100) NOT NULL,
	talentTreeId_level_13 VARCHAR(100) NOT NULL,
	talentTreeId_level_16 VARCHAR(100) NOT NULL,
	talentTreeId_level_20 VARCHAR(100) NOT NULL
);

-- Create a dummy account for testing.
INSERT INTO accounts (username, password, is_admin) 
VALUES 	('admin', '$2b$10$rv3Vmhl6e.FjIsrilDbGcuv6z.2CYAKw3vt2OYglNjV3tYCMxlW7i', true);

-- Create reviews for Cassia and Azmodan.
INSERT INTO reviews (hero_name, name, rating, description, author_account_id) VALUES ("Murky", "admin", 4, "I think this build is very good", 1);
INSERT INTO reviews (hero_name, name, rating, description, author_account_id) VALUES ("Murky", "admin", 5, "I like to split push with this build", 1);
