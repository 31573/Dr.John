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



