DROP TABLE if exists reviews; 
CREATE TABLE reviews (id INT NOT NULL AUTO_INCREMENT, 
establishment_id INT not null, date DATE not null, 
incident TEXT, PRIMARY KEY (id)); 
DROP TABLE if exists venues; 
CREATE TABLE venues (id INT NOT NULL AUTO_INCREMENT, 
address TEXT, 
name VARCHAR(40), 
PRIMARY KEY (id));