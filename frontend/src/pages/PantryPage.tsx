import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import PantryItemCard
    from "../components/PantryItemCard/PantryItemCard";
import MainLayout from "../layouts/MainLayout";
import PageHeader from "../components/Header/PageHeader";

import AddPantryItemModal
    from "../components/AddPantryItemModal/AddPantryItemModal";

import {
    getPantryItems,
    createPantryItem,
} from "../services/pantryItemService";

import type { PantryItemResponse }
    from "../types/dto/response/PantryItemResponse";

import type { Product }
    from "../types/Product";

import { useProducts }
    from "../hooks/useProducts";

import "./PantryPage.css";


function PantryPage() {

    const { houseId } =
        useParams<{ houseId: string }>();

    const houseName =
        localStorage.getItem("houseName");


    const [pantryItems, setPantryItems] =
        useState<PantryItemResponse[]>([]);

    const [loading, setLoading] =
        useState(true);

    const [error, setError] =
        useState<string | null>(null);

    const [isAddModalOpen, setIsAddModalOpen] =
        useState(false);


    const {
        products,
    } = useProducts(houseId ?? null);


    useEffect(() => {

        if (!houseId) {

            setLoading(false);

            return;

        }


        const loadPantryItems = async () => {

            try {

                setLoading(true);

                setError(null);

                const items =
                    await getPantryItems(houseId);

                setPantryItems(items);

            } catch (error) {

                console.error(
                    "Error al obtener la despensa:",
                    error
                );

                setError(
                    "No se ha podido cargar la despensa."
                );

            } finally {

                setLoading(false);

            }

        };


        loadPantryItems();

    }, [houseId]);


    if (!houseId) {

        return (

            <div>

                <p>
                    No se ha encontrado la casa.
                </p>

            </div>

        );

    }


    const handleAddPantryItem = async (
        product: Product,
        expirationDate: string
    ) => {

        try {

            const pantryItem =
                await createPantryItem(
                    houseId,
                    {
                        productId: product.id,
                        expirationDate,
                    }
                );


            setPantryItems((currentItems) => {

                return [
                    ...currentItems,
                    pantryItem,
                ].sort(
                    (a, b) =>
                        new Date(a.expirationDate).getTime() -
                        new Date(b.expirationDate).getTime()
                );

            });


            setIsAddModalOpen(false);

        } catch (error) {

            console.error(
                "Error al añadir el producto a la despensa:",
                error
            );

            setError(
                "No se ha podido añadir el producto a la despensa."
            );

            throw error;

        }

    };


    return (

        <MainLayout
            houseId={houseId}
        >

            <PageHeader
                title={houseName ?? ""}
                subtitle="Despensa"
            />


            <main className="pantry-page">

                <button
                    type="button"
                    className="pantry-page__add-button"
                    onClick={() =>
                        setIsAddModalOpen(true)
                    }
                >
                    + Añadir producto
                </button>


                <div>

                    {loading && (

                        <p>
                            Cargando despensa...
                        </p>

                    )}


                    {!loading && error && (

                        <p>
                            {error}
                        </p>

                    )}


                    {!loading &&
                        !error &&
                        pantryItems.length === 0 && (

                            <p>
                                La despensa está vacía.
                            </p>

                        )}


                    {!loading &&
                        !error &&
                        pantryItems.length > 0 && (

                            <div>

                                {pantryItems.map(
                                    (item) => {

                                        const product = products.find(
                                            (product) =>
                                                product.id === item.productId
                                        );

                                        if (!product) {
                                            return null;
                                        }

                                        return (

                                            <PantryItemCard
                                                key={item.id}
                                                item={item}
                                                product={product}
                                            />

                                        );

                                    }
                                )}

                            </div>

                        )}

                </div>

            </main>


            <AddPantryItemModal

                open={isAddModalOpen}

                products={products}

                onCancel={() =>
                    setIsAddModalOpen(false)
                }

                onConfirm={
                    handleAddPantryItem
                }

            />

        </MainLayout>

    );

}


export default PantryPage;