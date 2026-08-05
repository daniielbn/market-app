import { useState, useEffect } from "react";
import Modal from "../Modal/Modal";
import "./AddShoppingItemModal.css";

import type { Product } from "../../types/Product";

interface AddShoppingItemModalProps {

    open: boolean;

    product: Product | null;

    onCancel: () => void;

    onConfirm: (
        quantity: number,
        comment: string
    ) => Promise<void>;

}

function AddShoppingItemModal({

    open,

    product,

    onCancel,

    onConfirm,

}: AddShoppingItemModalProps) {

    const [quantity, setQuantity] = useState(1);

    const [comment, setComment] = useState("");

    const [loading, setLoading] = useState(false);

    useEffect(() => {

        if (open) {

            setQuantity(1);

            setComment("");

        }

    }, [open]);

    if (!product) {

        return null;

    }

    async function handleConfirm() {

        setLoading(true);

        try {

            await onConfirm(
                quantity,
                comment
            );

        }
        finally {

            setLoading(false);

        }

    }

    return (

        <Modal

            open={open}

            title="Añadir producto"

            onClose={onCancel}
        >

            {
                <div className="add-shopping-item-modal">

                    <img

                        src={product.image}

                        alt={product.name}

                        className="product-image"

                    />

                    <h3>

                        {product.name}

                    </h3>

                    <label>

                        Cantidad

                    </label>

                    <div className="quantity-selector">

                        <button

                            type="button"

                            onClick={() =>
                                setQuantity(Math.max(1, quantity - 1))
                            }

                        >

                            −

                        </button>

                        <span>

                            {quantity}

                        </span>

                        <button

                            type="button"

                            onClick={() =>
                                setQuantity(quantity + 1)
                            }

                        >

                            +

                        </button>

                    </div>

                    <label>

                        Comentario

                    </label>

                    <textarea

                        value={comment}

                        onChange={(event) =>
                            setComment(event.target.value)
                        }

                        rows={3}

                        placeholder="Opcional"

                    />

                    <button
                        type="button"
                        className="confirm-button"
                        onClick={handleConfirm}
                        disabled={loading}
                    >

                        {loading
                            ? "Añadiendo..."
                            : "Añadir"}

                    </button>

                    <div className="modal-actions">

                        <button

                            type="button"

                            className="cancel-button"

                            onClick={onCancel}

                        >

                            Cancelar

                        </button>

                    </div>

                </div>
            }

        </Modal>

    );

}

export default AddShoppingItemModal;