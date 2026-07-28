import { useEffect, useState } from "react";
import { getShoppingItems } from "../services/shoppingItemService";
import type { ShoppingItemResponse } from "../types/dto/ShoppingItemResponse";

function HousePage() {

    const [shoppingItems, setShoppingItems] = useState<ShoppingItemResponse[]>([]);

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const houseId = localStorage.getItem("houseId");
    const houseName = localStorage.getItem("houseName");


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


            {shoppingItems.length === 0 ? (

                <p>
                    La lista de la compra está vacía.
                </p>

            ) : (

                <div>

                    {shoppingItems.map((item) => (

                        <div key={item.id}>

                            <h3>
                                {item.product.name}
                            </h3>

                            <p>
                                Cantidad: {item.quantity}
                            </p>

                            <p>
                                Estado:{" "}
                                {item.purchased
                                    ? "Comprado"
                                    : "Pendiente"
                                }
                            </p>

                            {item.comment && (
                                <p>
                                    Comentario: {item.comment}
                                </p>
                            )}

                        </div>

                    ))}

                </div>

            )}

        </div>
    );
}

export default HousePage;