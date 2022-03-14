-- List database use \l
-- create database use CREATE DATABASE database_name;


CREATE TABLE users (
    user_id uuid DEFAULT uuid_generate_v4 (),
    firstname VARCHAR(25),
    lastname VARCHAR(25),
    email VARCHAR (255) UNIQUE NOT NULL,
    password text NOT NULL,
    address text,
    city VARCHAR NOT NULL,
    country VARCHAR NOT NULL,
    currency VARCHAR NOT NULL,
    PRIMARY KEY (user_id)
);

ALTER TABLE users
DROP COLUMN user_id

INSERT INTO users (firstname, lastname, email, password, address, city, country,
currency) VALUES ('john', 'doe', 'jd@mail.com', 'password', '12 house street', 'london',
'GBR', 'GBP');