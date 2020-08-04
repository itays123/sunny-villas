CREATE DATABASE sunnyvillas;

CREATE TABLE users(
    id SERIAL PRIMARY KEY,
    email VARCHAR(255),
    "password" VARCHAR(255),
    "name" VARCHAR(255)
);

CREATE TABLE deals(
    id SERIAL PRIMARY KEY,
    title VARCHAR(255),
    price INTEGER,
    "description" VARCHAR(255),
    ordered INTEGER,
    limited INTEGER
);

CREATE TABLE bookings (
    id SERIAL PRIMARY KEY,
    userId INTEGER,
    dealId INTEGER,
    "from" BIGINT,
    "to" BIGINT
);