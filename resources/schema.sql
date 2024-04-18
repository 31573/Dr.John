CREATE TABLE IF NOT EXISTS driver (
    driver_id INT PRIMARY KEY,
    carno INT,
	initials VARCHAR(3),
	name VARCHAR(50)
);


CREATE TABLE IF NOT EXISTS races (
    race_id INT PRIMARY KEY,
	date DATE,
	season INT,
	location VARCHAR(50),
	availablecompounds VARCHAR (25),
	comment VARCHAR,
	nolaps INT,
	nolapsplanned INT,
	tracklength INT
	  
);


CREATE TABLE IF NOT EXISTS fcyphases (
    fcyphases_id INT PRIMARY KEY,
	race_id INT,
	FOREIGN KEY (race_id) REFERENCES races(race_id),
	startracetime VARCHAR,
	endracetime VARCHAR,
	startraceprog REAL,
	endraceprog REAL,
	startlap INT,
	endlap INT,
	type VARCHAR(3)
   
);


CREATE TABLE IF NOT EXISTS laps (
    race_id INT,
	FOREIGN KEY (race_id) REFERENCES races(race_id),
    lapno INT,
    position INT,
	driver_id INT,
   	FOREIGN KEY (driver_id) REFERENCES driver(driver_id),
	laptime VARCHAR,
	racetime VARCHAR,
	gap VARCHAR,
	interval VARCHAR,
	compound VARCHAR(10),
	tireage INT,
	pitintime VARCHAR,
	pitstopduration	VARCHAR,
	nextcompound VARCHAR,	
	startlapprog_vsc VARCHAR,	
	endlapprog_vsc  VARCHAR,
	age_vsc	VARCHAR,	
	startlapprog_sc	VARCHAR,	
	endlapprog_sc VARCHAR,	
	age_sc	VARCHAR
	
);


CREATE TABLE IF NOT EXISTS qualifyings (
    race_id INT,
	FOREIGN KEY (race_id) REFERENCES races(race_id),
	position INT,
	driver_id INT,
   	FOREIGN KEY (driver_id) REFERENCES driver(driver_id),
	q1laptime VARCHAR,	
	q2laptime VARCHAR,	
	q3laptime VARCHAR,	
	speedtrap VARCHAR

);

CREATE TABLE IF NOT EXISTS retirements (
    season INT,
	driver_id INT,
   	FOREIGN KEY (driver_id) REFERENCES driver(driver_id),
	accidents VARCHAR,	
	failures VARCHAR	

);

CREATE TABLE IF NOT EXISTS starterfields (
    race_id INT,
	FOREIGN KEY (race_id) REFERENCES races(race_id),
	driver_id INT,
   	FOREIGN KEY (driver_id) REFERENCES driver(driver_id),
	team VARCHAR,	
	teamcolor VARCHAR,	
	enginemanufacturer VARCHAR,	
	gridposition INT,	
	status VARCHAR,	
	resultposition INT,	
	completedlaps INT,	
	speedtrap VARCHAR
	
);

DROP TABLE weather;

CREATE TABLE IF NOT EXISTS weather (
	id INT PRIMARY KEY,
	temp INT,	
	feels_like INT, 	
	humidity INT,
	clouds INT,	
	wind_speed FLOAT,	
	main VARCHAR,
	description VARCHAR,	
	icon VARCHAR,
	date Date,
	FOREIGN KEY (id) REFERENCES races(race_id)
	);

DROP TABLE location;
	
CREATE TABLE IF NOT EXISTS location (
	id INT PRIMARY KEY,
	lat FLOAT,
	long FLOAT,
	locality VARCHAR,
	country VARCHAR,
	season INT,
	round INT,
	FOREIGN KEY (id) REFERENCES weather(id)
	);

DROP TABLE meta_data_inclusive;

CREATE TABLE IF NOT EXISTS meta_data_inclusive (
	id SERIAL PRIMARY KEY,
	circuitName VARCHAR,
	lat FLOAT,
	long FLOAT,
	location VARCHAR,
	country VARCHAR,
	driver_id INT,
	carno INT,
	initials VARCHAR,
	name VARCHAR,
	race_id INT,
	team VARCHAR,
	teamcolor VARCHAR,
	enginemanufacturer VARCHAR,
	gridposition INT,
	status VARCHAR,
	resultposition INT,
	completedlaps INT,
	speedtrap FLOAT,
	date VARCHAR,
	season INT,
	availablecompounds VARCHAR,
	comment VARCHAR,
	nolaps INT,
	nolapsplanned INT,
	tracklength INT,
	accidents_per_driver_per_season INT,
	failures_per_driver_per_season INT
	);

SELECT * FROM driver;
SELECT * FROM races;
SELECT * FROM fcyphases;
SELECT * FROM laps;
SELECT * FROM qualifyings;
SELECT * FROM retirements;
SELECT * FROM starterfields;
SELECT * FROM weather;
SELECT * FROM location;
SELECT * FROM meta_data_inclusive;

CREATE TABLE race_joined_inner AS
SELECT s.race_id, s.driver_id, s.team, s.teamcolor, s.status, s.resultposition, s.speedtrap, r.date, r.season, r.location, r.comment, d.name
FROM starterfields as s
INNER JOIN races as r ON 
s.race_id = r.race_id
INNER JOIN driver as d ON
s.driver_id = d.driver_id

SELECT * FROM race_joined_inner;

DROP TABLE location_weather;

CREATE TABLE location_weather AS
SELECT *
FROM weather
INNER JOIN location USING (id);

SELECT * FROM location_weather;

CREATE TABLE race_location_weather AS
SELECT *
FROM race_joined_inner
FULL JOIN location_weather USING (season, date);

SELECT * FROM race_location_weather;

DROP TABLE race_loc_wea_ret;

CREATE TABLE race_loc_wea_ret AS
SELECT *
FROM race_location_weather
INNER JOIN retirements USING (driver_id, season);

SELECT * FROM race_loc_wea_ret;
