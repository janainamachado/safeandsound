DROP TABLE if exists reviews; 
CREATE TABLE reviews (id INT NOT NULL AUTO_INCREMENT, 
venue_id INT not null, 
date DATE not null, 
incident TEXT not null, 
username VARCHAR(20),
PRIMARY KEY (id)); 

DROP TABLE if exists venues; 
CREATE TABLE venues (id INT NOT NULL AUTO_INCREMENT, 
address TEXT, 
venuename VARCHAR(40) not null,
lat DECIMAL (11, 8) NOT NULL,
longitude DECIMAL (11, 8) NOT NULL, 
PRIMARY KEY (id));

