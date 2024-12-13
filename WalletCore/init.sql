CREATE TABLE IF NOT EXISTS clients (
    id VARCHAR(255) PRIMARY KEY,
    name VARCHAR(255),
    email VARCHAR(255),
    created_at DATE
);

CREATE TABLE IF NOT EXISTS accounts (
    id VARCHAR(255) PRIMARY KEY,
    client_id VARCHAR(255),
    balance INT,
    created_at DATE,
    FOREIGN KEY (client_id) REFERENCES clients(id)
);

CREATE TABLE IF NOT EXISTS transactions (
    id VARCHAR(255) PRIMARY KEY,  
    account_id_from VARCHAR(255) NOT NULL, 
    account_id_to VARCHAR(255) NOT NULL,   
    amount DECIMAL(10, 2) NOT NULL,         
    created_at DATE NOT NULL              
);

INSERT INTO clients(id, name, email, created_at) VALUES 
('34d9df1f-2fe4-4dfd-9306-f25f33bee8bc', 'Jane Doe', 'j@q.com', '2024-12-02'),
('70878fa3-7855-4746-b603-dcb514deca4e', 'Josh Doe', 'ja@q.com', '2024-12-02');

INSERT INTO accounts(id, client_id, balance, created_at) VALUES 
('7e22e7aa-6ef0-4959-bdd4-9a95b82153af', '34d9df1f-2fe4-4dfd-9306-f25f33bee8bc', 1000, '2024-12-02'),
('416e55a1-3c84-4ed5-9686-733b5f61f187', '70878fa3-7855-4746-b603-dcb514deca4e', 500, '2024-12-02');
