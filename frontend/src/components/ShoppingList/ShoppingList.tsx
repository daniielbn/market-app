import type { ShoppingItem } from "../../types/ShoppingItem";

import ShoppingItemComponent from "../ShoppingItem/ShoppingItem";

interface ShoppingListProps {

    items: ShoppingItem[];

    onTogglePurchased: (item: ShoppingItem) => void;

    onDelete: (item: ShoppingItem) => void;

}

export default function ShoppingList({

    items,

    onTogglePurchased,

    onDelete

}: ShoppingListProps) {

    return (

        <ul>

            {items.map(item => (

                <ShoppingItemComponent

                    key={item.id}

                    item={item}

                    onTogglePurchased={onTogglePurchased}

                    onDelete={onDelete}

                />

            ))}

        </ul>

    );

}