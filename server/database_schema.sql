DROP TABLE IF EXISTS product ;
DROP TABLE IF EXISTS user ;
DROP TABLE IF EXISTS used_product ;
DROP TABLE IF EXISTS new_product ;

SELECT 'Creating tables' AS 'Message';


CREATE TABLE IF NOT EXISTS product (
product_id INTEGER PRIMARY KEY AUTOINCREMENT,
brand TEXT NOT NULL,
model TEXT NOT NULL,
name TEXT NOT NULL,
price INTEGER NOT NULL,
color TEXT NOT NULL,
year INTEGER NOT NULL,
type TEXT NOT NULL,
new_or_not INTEGER DEFAULT 1,
seller INTEGER NOT NULL
);

CREATE TABLE user (
    user_id INTEGER,
    email TEXT NOT NULL,
    first_name TEXT NOT NULL,
    last_name TEXT NOT NULL,
    is_admin INTEGER DEFAULT 0,
    password_hash TEXT NOT NULL,
    CONSTRAINT pk_user PRIMARY KEY (user_id)
);

CREATE TABLE  used_product (
    product_id INTEGER PRIMARY KEY,
    brand TEXT NOT NULL,
    model TEXT NOT NULL,
    name TEXT NOT NULL,
    price INTEGER NOT NULL,
    color TEXT NOT NULL,
    year INTEGER NOT NULL,
    type TEXT NOT NULL,
    user_id INTEGER,
    email TEXT NOT NULL,
    first_name TEXT NOT NULL,
    last_name TEXT NOT NULL   
);

CREATE TABLE new_product (
product_id INTEGER PRIMARY KEY,
brand TEXT NOT NULL,
model TEXT NOT NULL,
name TEXT NOT NULL,
price INTEGER NOT NULL,
color TEXT NOT NULL,
year INTEGER NOT NULL,
type TEXT NOT NULL
);

INSERT INTO product (brand,model,name, price , color, year, type, new_or_not, seller) VALUES
('Yamaha', 'CFX ENPRO Disklavier', 'Yamaha CFX ENPRO Disklavier', 1845000, 'Black', 2022, 'Piano', 1, 1);

SELECT * 
FROM product;
--INSERT INTO user VALUES ();