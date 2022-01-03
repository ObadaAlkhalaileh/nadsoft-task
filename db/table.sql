-- activate line 2 in case this file has been executed once before
-- DROP DATABASE countries_info;

CREATE DATABASE countries_info;

USE countries_info;

CREATE TABLE countries (
  id INT AUTO_INCREMENT NOT NULL,
  is_deleted TINYINT DEFAULT 0,

  name TEXT(500) ,
  languages VARCHAR(255) ,
  cca2 VARCHAR(255) ,
  cca3 VARCHAR(255) ,
  ccn3 VARCHAR(255) ,
  region VARCHAR(255) ,
  currencies VARCHAR(255) ,
  lateAndLong VARCHAR(255) ,
  
  PRIMARY KEY (id)
);