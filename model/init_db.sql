DROP TABLE if exists reviews; 
CREATE TABLE reviews (id INT NOT NULL AUTO_INCREMENT, 
venue_id INT not null, date DATE not null, 
incident TEXT, PRIMARY KEY (id)
user VARCHAR(20)); 

DROP TABLE if exists venues; 
CREATE TABLE venues (id INT NOT NULL AUTO_INCREMENT, 
address TEXT, 
name VARCHAR(40), 
PRIMARY KEY (id));

