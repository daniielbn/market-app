CREATE TABLE shopping_items (
    id UUID PRIMARY KEY,

    house_id UUID NOT NULL,

    name VARCHAR(150) NOT NULL,

    quantity INTEGER NOT NULL DEFAULT 1,

    purchased BOOLEAN NOT NULL DEFAULT FALSE,

    deleted_at TIMESTAMP,

    created_at TIMESTAMP NOT NULL,

    updated_at TIMESTAMP NOT NULL,

    CONSTRAINT fk_shopping_items_house
        FOREIGN KEY (house_id)
        REFERENCES houses(id)
        ON DELETE CASCADE
);

CREATE INDEX idx_shopping_items_house
    ON shopping_items(house_id);

CREATE INDEX idx_shopping_items_deleted
    ON shopping_items(deleted_at);