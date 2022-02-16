use flexy;
DROP  TABLE IF EXISTS users ;
DROP  TABLE IF EXISTS course_module ;

DROP  TABLE IF EXISTS course ;

CREATE TABLE users(
	user_id varchar(37) PRIMARY KEY UNIQUE, 
    username varchar(40) NOT NULL UNIQUE,
    password varchar(32) NOT NULL,
    wallet bigint
);

CREATE TABLE course(
    course_id varchar(37) PRIMARY KEY,
    course_name varchar(100) NOT NULL, 
    course_thumbnail longblob NOT NULL,
    total_modules int NOT NULL
);

CREATE TABLE course_module(
    course_id varchar(37),
    texts varchar(5000),
    audio longblob,
    FOREIGN KEY(course_id) REFERENCES course(course_id) ON DELETE CASCADE 
);

CREATE TABLE certifications(
	user_id varchar(37),
    course_id varchar(37),
    course_name varchar(100)
);
use flexy;
SELECT * from course_module;