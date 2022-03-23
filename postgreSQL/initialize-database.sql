-- Create a table to store user accounts in.
CREATE TABLE IF NOT EXISTS "accounts" (
	account_id SERIAL,
	username VARCHAR(50) NOT NULL UNIQUE,
	password VARCHAR(100) NOT NULL,
	is_admin BOOLEAN DEFAULT FALSE,
	PRIMARY KEY (account_id) 
);

CREATE TABLE IF NOT EXISTS "reviews" (
	review_id SERIAL,
	hero_name VARCHAR(30) NOT NULL,
	name VARCHAR(30) NOT NULL,
	rating INT NOT NULL,
	description TEXT NOT NULL,
	author_account_id INT NOT NULL references accounts(account_id) ON DELETE CASCADE,
	PRIMARY KEY (review_id)
);

CREATE TABLE IF NOT EXISTS "builds" (
	build_id SERIAL,
	build_name VARCHAR(30) NOT NULL,
	description TEXT,
	hero_id INT NOT NULL,
	"talentTreeId_level_1" VARCHAR(100) NOT NULL,
	"talentTreeId_level_4" VARCHAR(100) NOT NULL,
	"talentTreeId_level_7" VARCHAR(100) NOT NULL,
	"talentTreeId_level_10" VARCHAR(100) NOT NULL,
	"talentTreeId_level_13" VARCHAR(100) NOT NULL,
	"talentTreeId_level_16" VARCHAR(100) NOT NULL,
	"talentTreeId_level_20" VARCHAR(100) NOT NULL,
	PRIMARY KEY (build_id)
);

INSERT INTO accounts (username, password, is_admin) 
VALUES 	('admin', '$2b$10$rv3Vmhl6e.FjIsrilDbGcuv6z.2CYAKw3vt2OYglNjV3tYCMxlW7i', TRUE);

-- Create reviews for Cassia and Azmodan.
INSERT INTO reviews (hero_name, name, rating, description, author_account_id) 
VALUES 	('Thrall', 'admin', 4, 'I think this build is very good', 1),
		('Murky', 'admin', 5, 'I like to split push with this build', 1);
