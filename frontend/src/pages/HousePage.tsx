import { useEffect, useState } from "react";
import { getShoppingItems, updateShoppingItem, deleteShoppingItem, clearShoppingItems, createShoppingItem } from "../services/shoppingItemService";
import type { ShoppingItemResponse } from "../types/dto/ShoppingItemResponse";
import ShoppingItemCard from "../components/ShoppingItem/ShoppingItemCard";
import trashIcon from "../assets/icon/trash.svg";
import MainLayout from "../layouts/MainLayout";
import PageHeader from "../components/Header/PageHeader";
import AddShoppingItemBar from "../components/AddShoppingItemBar/AddShoppingItemBar";
import { useProducts } from "../hooks/useProducts";
import { createProduct } from "../services/productService";
import ProductAutocomplete from "../components/ProductAutocomplete";
import type { Product } from "../types/Product";
import Toast from "../components/Toast/Toast";
import CreateProductModal from "../components/CreateProductModal/CreateProductModal";

import "./HousePage.css";

function HousePage() {

    const [shoppingItems, setShoppingItems] = useState<ShoppingItemResponse[]>([]);

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const houseId = localStorage.getItem("houseId");
    const houseName = localStorage.getItem("houseName");

    const {
        products,
        setProducts,
    } = useProducts(houseId);

    const [searchText, setSearchText] = useState("");

    const [isCreateProductModalOpen, setIsCreateProductModalOpen] = useState(false);

    const [toastMessage, setToastMessage] = useState<string | null>(null);

    const [toastType, setToastType] = useState<"success" | "error">("success");

    const handleUpdateShoppingItem = async (
        shoppingItemId: string,
        request: {
            quantity?: number;
            purchased?: boolean;
            comment?: string;
        }
    ) => {

        try {

            const updatedItem = await updateShoppingItem(
                shoppingItemId,
                request
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
                "Error al actualizar el producto:",
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

        const itemToDelete = shoppingItems.find(
            (item) => item.id === shoppingItemId
        );

        const confirmed = window.confirm(
            itemToDelete
                ? `¿Seguro que quieres eliminar ${itemToDelete.product.name} de la lista?`
                : "¿Seguro que quieres eliminar este producto de la lista?"
        );

        if (!confirmed) {
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

    const handleProductSelected = async (product: Product) => {

        if (!houseId) {
            return;
        }

        try {

            const shoppingItem = await createShoppingItem(
                houseId,
                {
                    productId: product.id,
                    quantity: 1,
                    comment: "",
                }
            );

            setShoppingItems(current => [
                shoppingItem,
                ...current,
            ]);

            setSearchText("");

        } catch (error) {

            console.error(
                "Error al añadir el producto a la lista:",
                error
            );

            setError(
                "No se ha podido añadir el producto a la lista."
            );

        }

    };

    const handleCreateProduct = () => {

        setIsCreateProductModalOpen(true);

    };

    const handleConfirmCreateProduct = async (
        name: string,
        image: File
    ): Promise<void> => {

        if (!houseId) {
            return;
        }

        try {

            const product = await createProduct(
                houseId,
                {
                    name,
                    image,
                }
            );

            setProducts(current => [
                product,
                ...current,
            ]);

            const shoppingItem = await createShoppingItem(
                houseId,
                {
                    productId: product.id,
                    quantity: 1,
                    comment: "",
                }
            );

            setShoppingItems(current => [
                shoppingItem,
                ...current,
            ]);

            showToast(
                "Producto creado correctamente",
                "success"
            );

            setIsCreateProductModalOpen(false);

            setSearchText("");

        }
        catch (error: any) {

            if (
                error.response?.status === 409
            ) {

                showToast(
                    "Ya existe un producto con ese nombre",
                    "error"
                );

                return;

            }

            showToast(
                "No se ha podido crear el producto",
                "error"
            );

            console.error(error);

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

    function showToast(
        message: string,
        type: "success" | "error"
    ) {

        setToastMessage(message);

        setToastType(type);

        setTimeout(() => {

            setToastMessage(null);

        }, 2500);

    }


    if (loading) {
        return (
            <MainLayout>

                <main className="house-page">

                    <section className="house-page__card">

                        <div className="house-page__empty-state">

                            <p className="house-page__empty-title">
                                Cargando lista de la compra...
                            </p>

                            <p className="house-page__empty-text">
                                Estamos obteniendo los productos de la casa.
                            </p>

                        </div>

                    </section>

                </main>

            </MainLayout>
        );
    }


    if (error) {
        return (
            <div className="mx-auto max-w-3xl px-6 py-12">
                <div className="rounded-2xl border border-[var(--border-light)] bg-white p-6 shadow-[var(--shadow)]">
                    <p className="text-sm font-medium text-[var(--text-secondary)]">
                        {houseName}
                    </p>

                    <h1 className="mt-1 text-xl font-semibold tracking-tight text-[var(--text)]">
                        No se ha podido cargar la lista
                    </h1>

                    <p className="mt-2 text-[var(--text-secondary)]">
                        {error}
                    </p>
                </div>
            </div>
        );
    }

    const sortedShoppingItems = [...shoppingItems].sort((a, b) => {

        // Primero los no comprados
        if (a.purchased !== b.purchased) {

            return Number(a.purchased) - Number(b.purchased);

        }

        // Dentro de cada grupo, más recientes primero
        return (
            new Date(b.createdAt).getTime() -
            new Date(a.createdAt).getTime()
        );

    });

    return (

        <MainLayout>

            <PageHeader
                title={houseName ?? ""}
            />

            <main className="house-page">

                <section className="house-page__card">

                    <div className="house-page__hero">

                        <div className="house-page__heading">

                            <h2 className="house-page__title">
                                Lista de la compra
                            </h2>

                            <p className="house-page__description">
                                Escribe un producto arriba para añadirlo al instante y edita cantidad o comentario desde cada tarjeta.
                            </p>

                            <div className="house-page__controls-row">

                                <div className="house-page__search-stack">

                                    <AddShoppingItemBar
                                        value={searchText}
                                        onChange={setSearchText}
                                    />

                                    <ProductAutocomplete
                                        products={products}
                                        searchText={searchText}
                                        onSelect={handleProductSelected}
                                        onCreate={handleCreateProduct}
                                    />

                                </div>

                                <button
                                    type="button"
                                    onClick={handleClearList}
                                    disabled={shoppingItems.length === 0}
                                    aria-label="Vaciar lista de la compra"
                                    className="house-page__clear-button"
                                >
                                    <img
                                        src={trashIcon}
                                        alt=""
                                        className="house-page__clear-icon"
                                    />
                                </button>

                            </div>

                        </div>

                    </div>

                    <div className="house-page__content">

                        {shoppingItems.length === 0 ? (

                            <div className="house-page__empty-state">

                                <p className="house-page__empty-title">
                                    La lista está vacía
                                </p>

                                <p className="house-page__empty-text">
                                    Escribe un producto arriba y selecciónalo para añadir 1 unidad automáticamente.
                                </p>

                            </div>

                        ) : (

                            <div className="house-page__list">

                                {sortedShoppingItems.map((item) => (
                                    <ShoppingItemCard
                                        key={item.id}
                                        item={item}
                                        onUpdate={handleUpdateShoppingItem}
                                        onDelete={handleDelete}
                                    />
                                ))}

                            </div>

                        )}

                    </div>

                </section>

            <CreateProductModal

                open={isCreateProductModalOpen}

                initialName={searchText}

                onClose={() => {

                    setIsCreateProductModalOpen(false);

                }}

                onConfirm={handleConfirmCreateProduct}

            />
            </main>

            {toastMessage && (

                <Toast
                    message={toastMessage}
                    type={toastType}
                />

            )}

        </MainLayout>

    );
}

export default HousePage;