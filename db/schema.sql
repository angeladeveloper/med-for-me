DROP DATABASE IF EXISTS med_for_me;
CREATE DATABASE med_for_me;


CREATE TABLE `user` (
  `id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(45) NOT NULL,
  `first_name` varchar(45) NOT NULL,
  `last_name` varchar(45) NOT NULL,
  `email` varchar(45) NOT NULL,
  `password` varchar(45) NOT NULL,
  `past_meds` text,
  `current_meds` text,
  PRIMARY KEY (`id`)
) 

CREATE TABLE `medication` (
  `id` int NOT NULL AUTO_INCREMENT,
  `med_name` varchar(45) NOT NULL,
  `med_descrip` text NOT NULL,
  `med_generic_name` varchar(45) NOT NULL,
  `nda_id` varchar(45) NOT NULL,
  PRIMARY KEY (`id`)
) 

CREATE TABLE `med_data` (
  `id` int NOT NULL AUTO_INCREMENT,
  `med_id` int NOT NULL,
  `user_id` int NOT NULL,
  `comment` text,
  `dose` decimal(10,0) NOT NULL,
  `rating` int NOT NULL,
  PRIMARY KEY (`id`)
) 
