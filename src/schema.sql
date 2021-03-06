CREATE TABLE service_user (
    id BIGSERIAl NOT NULL PRIMARY KEY,
    username VARCHAR(50) NOT NULL,
    email VARCHAR(100) NOT NULL,
    passwrd VARCHAR(100),
    user_role VARCHAR(10) DEFAULT 'basic'
);

CREATE TABLE service_alert (
    id BIGSERIAl NOT NULL PRIMARY KEY,
    geolocation VARCHAR(20) NOT NULL,
    stat VARCHAR(20) NOT NULL,
    alert_date DATE NOT NULL DEFAULT CURRENT_DATE,
    user_id BIGINT NOT NULL REFERENCES service_user (id)
);

