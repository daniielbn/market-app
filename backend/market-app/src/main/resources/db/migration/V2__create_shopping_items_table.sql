CREATE TABLE shopping_items (
    id UUID PRIMARY KEY,

    house_id UUID NOT NULL,

    name VARCHAR(150) NOT NULL,

    purchased BOOLEAN NOT NULL DEFAULT FALSE,

    created_at TIMESTAMP NOT NULL,

    updated_at TIMESTAMP NOT NULL,

    deleted_at TIMESTAMP NULL,

    CONSTRAINT fk_shopping_items_house
        FOREIGN KEY (house_id)
        REFERENCES houses(id)
);