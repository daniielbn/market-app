import "./ShoppingItemCard.css";

import type { ChangeEvent } from "react";
import type { ShoppingItemResponse } from "../../types/dto/response/ShoppingItemResponse";

import crossIcon from "../../assets/icon/cross.svg";

interface ShoppingItemCardProps {

    item: ShoppingItemResponse;

    onUpdate: (
        shoppingItemId: string,
        request: {
            quantity?: number;
            purchased?: boolean;
            comment?: string;
        }
    ) => void;

    onDelete: (
        shoppingItemId: string
    ) => void;

}

function ShoppingItemCard({

    item,

    onUpdate,

    onDelete,

}: ShoppingItemCardProps) {

    const handlePurchasedChange = (
        event: ChangeEvent<HTMLInputElement>
    ) => {

        onUpdate(
            item.id,
            {
                purchased: event.target.checked,
            }
        );

    };

    const handleDecreaseQuantity = () => {

        onUpdate(item.id, {
            quantity: Math.max(1, item.quantity - 1),
        });

    };

    const handleIncreaseQuantity = () => {

        onUpdate(item.id, {
            quantity: item.quantity + 1,
        });

    };

    const handleDelete = () => {

        onDelete(item.id);

    };

    return (

        <article
            className={`shopping-item-card ${
                item.purchased
                    ? "shopping-item-card--purchased"
                    : ""
            }`}
        >

            <img
                src={item.product.image}
                alt={item.product.name}
                className="shopping-item-card__image"
            />

            <div className="shopping-item-card__content">

                <div className="shopping-item-card__header">

                    <h3>

                        {item.product.name}

                    </h3>

                    <div className="shopping-item-card__header-actions">

                        <button
                            type="button"
                            className="shopping-item-card__delete-button"
                            onClick={handleDelete}
                            aria-label={`Eliminar ${item.product.name}`}
                        >

                            <img
                                src={crossIcon}
                                alt=""
                            />

                        </button>

                        <label className="shopping-item-card__checkbox">

                            <input
                                type="checkbox"
                                checked={item.purchased}
                                onChange={handlePurchasedChange}
                            />

                            <span>Comprado</span>

                        </label>

                    </div>

                </div>

                <div className="shopping-item-card__controls">

                    <div className="shopping-item-card__quantity-control">

                        <button
                            type="button"
                            onClick={handleDecreaseQuantity}
                            disabled={item.quantity <= 1}
                            aria-label={`Reducir cantidad de ${item.product.name}`}
                        >

                            -

                        </button>

                        <span className="shopping-item-card__quantity-value">

                            {item.quantity}

                        </span>

                        <button
                            type="button"
                            onClick={handleIncreaseQuantity}
                            aria-label={`Aumentar cantidad de ${item.product.name}`}
                        >

                            +

                        </button>

                    </div>

                    {/* Sección de comentarios desactivada temporalmente para revisar la tarjeta en responsive.
                    <label className="shopping-item-card__comment-label">

                        <span>Escribe un comentario</span>

                        <textarea
                            value={comment}
                            onChange={(event) => setComment(event.target.value)}
                            placeholder="Añade una nota..."
                            rows={2}
                        />

                        <button
                            type="button"
                            className="shopping-item-card__comment-button"
                            onClick={handleSendComment}
                        >

                            Enviar comentario

                        </button>

                    </label>
                    */}

                </div>

                {/* Sección de comentario guardado desactivada temporalmente para revisar la tarjeta en responsive.
                <div className="shopping-item-card__saved-comment">

                    <span className="shopping-item-card__saved-comment-label">

                        Comentario guardado

                    </span>

                    {item.comment ? (

                        <p className="shopping-item-card__saved-comment-text">

                            {item.comment}

                        </p>

                    ) : (

                        <p className="shopping-item-card__saved-comment-empty">

                            Sin comentario todavía

                        </p>

                    )}

                </div>
                */}

            </div>

        </article>

    );

}

export default ShoppingItemCard;