CREATE TABLE houses (
    id UUID PRIMARY KEY,

    name VARCHAR(100) NOT NULL,

    access_code VARCHAR(20) NOT NULL UNIQUE,

    created_at TIMESTAMP NOT NULL,

    updated_at TIMESTAMP NOT NULL
);

CREATE TABLE products (
    id UUID PRIMARY KEY,

    name VARCHAR(255) NOT NULL,

    image BYTEA,

    image_content_type VARCHAR(100),

    house_id UUID NOT NULL,

    created_at TIMESTAMP NOT NULL,

    updated_at TIMESTAMP NOT NULL,

    CONSTRAINT fk_products_house
        FOREIGN KEY (house_id)
        REFERENCES houses(id)
        ON DELETE CASCADE
);

CREATE TABLE shopping_items (
    id UUID PRIMARY KEY,

    quantity INTEGER NOT NULL,

    purchased BOOLEAN NOT NULL DEFAULT FALSE,

    comment TEXT,

    deleted_at TIMESTAMP,

    house_id UUID NOT NULL,

    product_id UUID NOT NULL,

    created_at TIMESTAMP NOT NULL,

    updated_at TIMESTAMP NOT NULL,

    CONSTRAINT fk_shopping_items_house
        FOREIGN KEY (house_id)
        REFERENCES houses(id)
        ON DELETE CASCADE,

    CONSTRAINT fk_shopping_items_product
        FOREIGN KEY (product_id)
        REFERENCES products(id)
        ON DELETE CASCADE
);

CREATE TABLE pantry_items (
    id UUID PRIMARY KEY,

    expiration_date DATE NOT NULL,

    house_id UUID NOT NULL,

    product_id UUID NOT NULL,

    created_at TIMESTAMP NOT NULL,

    updated_at TIMESTAMP NOT NULL,

    CONSTRAINT fk_pantry_items_house
        FOREIGN KEY (house_id)
        REFERENCES houses(id)
        ON DELETE CASCADE,

    CONSTRAINT fk_pantry_items_product
        FOREIGN KEY (product_id)
        REFERENCES products(id)
        ON DELETE CASCADE
);