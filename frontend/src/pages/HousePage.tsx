import { useEffect, useState } from "react";
import { getShoppingItems, updateShoppingItemPurchased, deleteShoppingItem, clearShoppingItems } from "../services/shoppingItemService";
import type { ShoppingItemResponse } from "../types/dto/ShoppingItemResponse";
import ShoppingItemCard from "../components/ShoppingItem/ShoppingItemCard";
import trashIcon from "../assets/icon/trash.svg";

function HousePage() {

    const [shoppingItems, setShoppingItems] = useState<ShoppingItemResponse[]>([]);

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const houseId = localStorage.getItem("houseId");
    const houseName = localStorage.getItem("houseName");

    const handlePurchasedChange = async (
        shoppingItemId: string,
        purchased: boolean
    ) => {

        if (!houseId) {
            return;
        }

        try {

            const updatedItem = await updateShoppingItemPurchased(
                shoppingItemId,
                purchased
            );

            setShoppingItems((currentItems) =>
                currentItems.map((item) =>
                    item.id === updatedItem.id
                        ? updatedItem
                        : item
                )
            );

        } catch (error) {

            console.error(
                "Error al actualizar el estado del producto:",
                error
            );

            setError(
                "No se ha podido actualizar el producto."
            );

        }
    };

    const handleDelete = async (
        shoppingItemId: string
    ) => {

        if (!houseId) {
            return;
        }

        try {

            await deleteShoppingItem(
                houseId,
                shoppingItemId
            );

            setShoppingItems((currentItems) =>
                currentItems.filter(
                    (item) => item.id !== shoppingItemId
                )
            );

        } catch (error) {

            console.error(
                "Error al eliminar el producto:",
                error
            );

            setError(
                "No se ha podido eliminar el producto."
            );

        }
    };

    const handleClearList = async () => {

        if (!houseId) {
            return;
        }

        if (shoppingItems.length === 0) {
            return;
        }

        const confirmed = window.confirm(
            "¿Seguro que quieres eliminar todos los productos de la lista?"
        );

        if (!confirmed) {
            return;
        }

        try {

            await clearShoppingItems(houseId);

            setShoppingItems([]);

        } catch (error) {

            console.error(
                "Error al vaciar la lista de la compra:",
                error
            );

            setError(
                "No se ha podido vaciar la lista de la compra."
            );

        }
    };

    useEffect(() => {

        if (!houseId) {
            setLoading(false);
            return;
        }

        const loadShoppingItems = async () => {

            try {

                setLoading(true);
                setError(null);

                const items = await getShoppingItems(houseId);

                console.log("Shopping items recibidos:", items);

                setShoppingItems(items);

            } catch (error) {

                console.error(
                    "Error al obtener la lista de la compra:",
                    error
                );

                setError(
                    "No se ha podido cargar la lista de la compra."
                );

            } finally {

                setLoading(false);

            }
        };

        loadShoppingItems();

    }, [houseId]);


    if (loading) {
        return (
            <div>
                <p>Cargando lista de la compra...</p>
            </div>
        );
    }


    if (error) {
        return (
            <div>
                <h1>{houseName}</h1>

                <p>{error}</p>
            </div>
        );
    }


    return (
        <div>

            <h1>{houseName}</h1>

            <h2>Lista de la compra</h2>

            <button
                type="button"
                onClick={handleClearList}
                disabled={shoppingItems.length === 0}
                aria-label="Vaciar lista de la compra"
            >
                <img
                    src={trashIcon}
                    alt="Vaciar lista"
                    className="w-5 h-5"
                />
            </button>


            {shoppingItems.length === 0 ? (

                <p>
                    La lista de la compra está vacía.
                </p>

            ) : (

                <div>

                    {shoppingItems.map((item) => (
                        <ShoppingItemCard
                            key={item.id}
                            item={item}
                            onPurchasedChange={handlePurchasedChange}
                            onDelete={handleDelete}
                        />
                    ))}

                </div>

            )}

        </div>
    );
}

export default HousePage;