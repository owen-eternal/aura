-- USER COLLECTION
CREATE TABLE service_user (
    id BIGSERIAl NOT NULL PRIMARY KEY,
    username VARCHAR(50) NOT NULL,
    email VARCHAR(100) NOT NULL,
    passwrd VARCHAR(20),
    user_role VARCHAR(10) DEFAULT 'basic'
);

-- ALERT COLLECTION
CREATE TABLE service_alert (
    id BIGSERIAl NOT NULL PRIMARY KEY,
    comment TEXT,
    geolocation VARCHAR(20) NOT NULL,
    stat VARCHAR(20) NOT NULL,
    user_id BIGINT NOT NULL REFERENCES service_user (id)
);

INSERT INTO service_user (username, email, passwrd, user_role) VALUES ('admin', 'admin@gmail.com', 'root', 'admin');