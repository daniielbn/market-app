import type { ShoppingItem } from "../../types/ShoppingItem";

interface ShoppingItemProps {

    item: ShoppingItem;

    onTogglePurchased: (item: ShoppingItem) => void;

    onDelete: (item: ShoppingItem) => void;

}

export default function ShoppingItem({

    item,

    onTogglePurchased,

    onDelete

}: ShoppingItemProps) {

    return (

        <li>

            <input
                type="checkbox"
                checked={item.purchased}
                onChange={() => onTogglePurchased(item)}
            />

            {item.name} x{item.quantity}

            <button onClick={() => onDelete(item)}>
                Eliminar
            </button>

        </li>

    );

}