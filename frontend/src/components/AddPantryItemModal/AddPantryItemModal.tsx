import { useState } from "react";
import type { Product } from "../../types/Product";
import ProductAutocomplete from "../ProductAutocomplete";

import "./AddPantryItemModal.css";

interface AddPantryItemModalProps {

    open: boolean;

    products: Product[];

    onCancel: () => void;

    onConfirm: (
        product: Product,
        expirationDate: string
    ) => Promise<void>;

}

function AddPantryItemModal({
    open,
    products,
    onCancel,
    onConfirm,
}: AddPantryItemModalProps) {

    const [searchText, setSearchText] =
        useState("");

    const [selectedProduct, setSelectedProduct] =
        useState<Product | null>(null);

    const [expirationDate, setExpirationDate] =
        useState("");

    const [saving, setSaving] =
        useState(false);


    if (!open) {
        return null;
    }


    const handleProductSelected = (
        product: Product
    ) => {

        setSelectedProduct(product);

        setSearchText(product.name);

    };


    const handleConfirm = async () => {

        if (!selectedProduct || !expirationDate) {
            return;
        }

        try {

            setSaving(true);

            await onConfirm(
                selectedProduct,
                expirationDate
            );

            setSearchText("");

            setSelectedProduct(null);

            setExpirationDate("");

        } finally {

            setSaving(false);

        }

    };


    const handleCancel = () => {

        setSearchText("");

        setSelectedProduct(null);

        setExpirationDate("");

        onCancel();

    };


    return (

        <div className="add-pantry-item-modal-overlay">

            <div
                className="add-pantry-item-modal"
                role="dialog"
                aria-modal="true"
                aria-labelledby="add-pantry-item-title"
            >

                <div className="add-pantry-item-modal__header">

                    <h2 id="add-pantry-item-title">
                        Añadir a la despensa
                    </h2>

                    <button
                        type="button"
                        className="add-pantry-item-modal__close"
                        onClick={handleCancel}
                        aria-label="Cerrar"
                    >
                        ×
                    </button>

                </div>


                <div className="add-pantry-item-modal__content">

                    <div className="add-pantry-item-modal__field">

                        <label htmlFor="pantry-product-search">
                            Producto
                        </label>

                        <input
                            id="pantry-product-search"
                            type="text"
                            value={searchText}
                            onChange={(event) => {

                                setSearchText(
                                    event.target.value
                                );

                                setSelectedProduct(null);

                            }}
                            placeholder="¿Qué producto quieres añadir?"
                            autoComplete="off"
                        />

                        <ProductAutocomplete
                            products={products}
                            searchText={searchText}
                            onSelect={handleProductSelected}
                            onCreate={() => {}}
                            showCreate={false}
                        />

                    </div>


                    {selectedProduct && (

                        <div className="add-pantry-item-modal__selected-product">

                            <img
                                src={selectedProduct.image}
                                alt={selectedProduct.name}
                            />

                            <span>
                                {selectedProduct.name}
                            </span>

                        </div>

                    )}


                    <div className="add-pantry-item-modal__field">

                        <label htmlFor="pantry-expiration-date">
                            Fecha de caducidad
                        </label>

                        <input
                            id="pantry-expiration-date"
                            type="date"
                            value={expirationDate}
                            onChange={(event) =>
                                setExpirationDate(
                                    event.target.value
                                )
                            }
                        />

                    </div>

                </div>


                <div className="add-pantry-item-modal__actions">

                    <button
                        type="button"
                        className="add-pantry-item-modal__cancel"
                        onClick={handleCancel}
                        disabled={saving}
                    >
                        Cancelar
                    </button>

                    <button
                        type="button"
                        className="add-pantry-item-modal__confirm"
                        onClick={handleConfirm}
                        disabled={
                            !selectedProduct ||
                            !expirationDate ||
                            saving
                        }
                    >
                        {saving
                            ? "Guardando..."
                            : "Guardar"}
                    </button>

                </div>

            </div>

        </div>

    );

}

export default AddPantryItemModal;