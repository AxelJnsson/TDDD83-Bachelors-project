

DROP TABLE IF EXISTS product CASCADE;
DROP TABLE IF EXISTS user CASCADE;
DROP TABLE IF EXISTS used_product CASCADE;
DROP TABLE IF EXISTS new_product CASCADE;

SELECT 'Creating tables' AS 'Message';

CREATE TABLE product (
    product_id INT,
    brand VARCHAR NOT NULL,
    model VARCHAR NOT NULL,
    name VARCHAR NOT NULL,
    price INT NOT NULL,
    color VARCHAR NOT NULL,
    year INT NOT NULL,
    type VARCHAR NOT NULL,
    new_or_not BOOLEAN NOT NULL,
    seller INT,
    CONSTRAINT pk_product PRIMARY KEY (product_id)
) 

CREATE TABLE user (
    user_id INT,
    email VARCHAR NOT NULL,
    first_name VARCHAR NOT NULL,
    last_name VARCHAR NOT NULL,
    is_admin BOOLEAN DEFAULT FALSE,
    password_hash VARCHAR NOT NULL,
    CONSTRAINT pk_user PRIMARY KEY (user_id)
)

CREATE TABLE used_product (
    product_id INT,
    brand VARCHAR NOT NULL,
    model VARCHAR NOT NULL,
    name VARCHAR NOT NULL,
    price INT NOT NULL,
    color VARCHAR NOT NULL,
    year INT NOT NULL,
    type VARCHAR NOT NULL,
    user_id INT,
    email VARCHAR NOT NULL,
    first_name VARCHAR NOT NULL,
    last_name VARCHAR NOT NULL
)

CREATE TABLE new_product (
    product_id INT,
    brand VARCHAR NOT NULL,
    model VARCHAR NOT NULL,
    name VARCHAR NOT NULL,
    price INT NOT NULL,
    color VARCHAR NOT NULL,
    year INT NOT NULL,
    type VARCHAR NOT NULL
)

INSERT INTO product VALUES
    ()

INSERT INTO user VALUES
    ()


INSERT INTO used_product (
        SELECT A.product_id, A.brand, A.model, A.name, A.price, A.color, A.year, A.type,
               B.user_id, B.email, B.first_name, B.last_name
        FROM product A, user B
        WHERE B.user_id IN (SELECT seller
                            FROM product
                            WHERE new_or_not = '0';)
)

INSERT INTO new_product (
        SELECT product_id, brand, model, name, price, color, year, type
        FROM product
        WHERE new_or_not = '1';
)