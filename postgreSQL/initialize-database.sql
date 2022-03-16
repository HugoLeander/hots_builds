-- Create a table to store user accounts in.
CREATE TABLE IF NOT EXISTS "accounts" (
	account_id SERIAL,
	username VARCHAR(50) NOT NULL UNIQUE,
	password VARCHAR(50) NOT NULL,
	PRIMARY KEY (account_id) 
);

CREATE TABLE IF NOT EXISTS "reviews" (
	review_id SERIAL,
	hero_name VARCHAR(30) NOT NULL,
	name VARCHAR(30) NOT NULL,
	rating INT NOT NULL,
	description TEXT NOT NULL,
	PRIMARY KEY (review_id)
);

-- Create a dummy account for testing.
INSERT INTO accounts (username, password) 
VALUES 	('Alice', 'abc123'), 
		('Hugo', 'abc123'), 
		('Sebbe', 'abc123');

-- Create reviews for Cassia and Azmodan.
INSERT INTO reviews (hero_name, name, rating, description) 
VALUES 	('Thrall', 'Hugo', 4, 'I think this build is very good'),
		('Murky', 'Sebbe', 5, 'I like to split push with this build');
