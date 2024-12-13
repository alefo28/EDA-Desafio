CREATE TABLE IF NOT EXISTS balances (
    ID VARCHAR(36) PRIMARY KEY,
    AccountID VARCHAR(36) NOT NULL,
    Balance DECIMAL(10, 2) NOT NULL,
    CreatedAt DATE NOT NULL,
    UpdatedAt DATE NOT NULL
);

INSERT INTO balances (ID, AccountID, Balance, CreatedAt, UpdatedAt)
VALUES 
    ('34d9df1f-2fe4-4dfd-9306-f25f33bee8bc', '7e22e7aa-6ef0-4959-bdd4-9a95b82153af', 1000.00, NOW(), NOW()),
    ('70878fa3-7855-4746-b603-dcb514deca4e', '416e55a1-3c84-4ed5-9686-733b5f61f187', 500.00,  NOW(), NOW()),
    