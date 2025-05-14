CREATE DATABASE IF NOT EXISTS railway_db;
USE railway_db;

CREATE TABLE bookings (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100),
  train_no INT,
  seat_no INT
);
