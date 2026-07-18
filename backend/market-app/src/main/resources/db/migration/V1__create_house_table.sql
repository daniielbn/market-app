CREATE TABLE houses (
    id UUID PRIMARY KEY,

    name VARCHAR(100) NOT NULL,

    access_code VARCHAR(20) NOT NULL UNIQUE,

    created_at TIMESTAMP NOT NULL,

    updated_at TIMESTAMP NOT NULL
);