import type { ChangeEvent } from "react";
import type { ShoppingItemResponse } from "../../types/dto/ShoppingItemResponse";
import crossIcon from "../../assets/icon/cross.svg";

interface ShoppingItemCardProps {
    item: ShoppingItemResponse;

    onPurchasedChange: (
        shoppingItemId: string,
        purchased: boolean
    ) => void;

    onDelete: (
        shoppingItemId: string
    ) => void;
}

function ShoppingItemCard({
    item,
    onPurchasedChange,
    onDelete,
}: ShoppingItemCardProps) {

    const handlePurchasedChange = (
        event: ChangeEvent<HTMLInputElement>
    ) => {

        onPurchasedChange(
            item.id,
            event.target.checked
        );

    };


    const handleDelete = () => {

        onDelete(item.id);

    };
    
    return (
        <div>

            <img
                src={item.product.image}
                alt={item.product.name}
                className="w-24 h-24 object-contain"
            />

            

            <h3>
                {item.product.name}
            </h3>

            <p>
                Cantidad: {item.quantity}
            </p>

            <label>

                <input
                    type="checkbox"
                    checked={item.purchased}
                    onChange={handlePurchasedChange}
                />

                Comprado

            </label>

            {item.comment && (
                <p>
                    Comentario: {item.comment}
                </p>
            )}

            <button
                type="button"
                onClick={handleDelete}
                aria-label={`Eliminar ${item.product.name}`}
            >
                <img
                    src={crossIcon}
                    alt="Eliminar"
                />
            </button>

        </div>
    );
}

export default ShoppingItemCard;