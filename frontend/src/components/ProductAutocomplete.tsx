import type { Product } from "../types/Product";

import "./ProductAutocomplete.css";

interface ProductAutocompleteProps {

    products: Product[];

    searchText: string;

    onSelect: (product: Product) => void;

    onCreate: () => void;

    showCreate?: boolean;

}

function ProductAutocomplete({
    products,
    searchText,
    onSelect,
    onCreate,
    showCreate = true,
}: ProductAutocompleteProps) {

    if (searchText.trim() === "") {
        return null;
    }

    const filteredProducts = products.filter((product) =>
        product.name
            .toLowerCase()
            .includes(searchText.toLowerCase())
    );

    const exactMatch = products.some(
        product =>
            product.name.toLowerCase().trim() ===
            searchText.toLowerCase().trim()
    );

    const hasResults = filteredProducts.length > 0;

    return (

        <div className="product-autocomplete">

            {!hasResults && (

                <div className="product-autocomplete__empty">

                    No hay coincidencias exactas para "{searchText}".

                </div>

            )}

            {filteredProducts.map((product) => (

                <button
                    key={product.id}
                    type="button"
                    onClick={() => onSelect(product)}
                    className="product-autocomplete__item"
                >

                    <img
                        src={product.image}
                        alt={product.name}
                        className="product-autocomplete__image"
                    />

                    <span className="product-autocomplete__name">

                        {product.name}

                    </span>

                </button>

            ))}

            {showCreate && !exactMatch && (

                <button
                    type="button"
                    onClick={onCreate}
                    className="product-autocomplete__create"
                >

                    + Crear "{searchText}"

                </button>

            )}

        </div>

    );

}

export default ProductAutocomplete;