import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import {
    getShoppingItems,
    updateShoppingItem,
    deleteShoppingItem,
    clearShoppingItems,
    createShoppingItem,
} from "../services/shoppingItemService";

import type { ShoppingItemResponse } from "../types/dto/response/ShoppingItemResponse";

import ShoppingItemCard from "../components/ShoppingItem/ShoppingItemCard";

import trashIcon from "../assets/icon/trash.svg";

import MainLayout from "../layouts/MainLayout";
import PageHeader from "../components/Header/PageHeader";
import AddShoppingItemBar from "../components/AddShoppingItemBar/AddShoppingItemBar";

import { useProducts } from "../hooks/useProducts";
import { createProduct } from "../services/productService";
import CreateProductModal from "../components/CreateProductModal/CreateProductModal";

import ProductAutocomplete from "../components/ProductAutocomplete";

import type { Product } from "../types/Product";

import AddShoppingItemModal from "../components/AddShoppingItemModal/AddShoppingItemModal";


function HousePage() {

    const { houseId } =
        useParams<{ houseId: string }>();

    const [shoppingItems, setShoppingItems] =
        useState<ShoppingItemResponse[]>([]);

    const [loading, setLoading] =
        useState(true);

    const [error, setError] =
        useState<string | null>(null);

    const houseName =
        localStorage.getItem("houseName");

    const {
        products,
        setProducts,
    } = useProducts(houseId ?? null);

    const [searchText, setSearchText] =
        useState("");

    const [selectedProduct, setSelectedProduct] =
        useState<Product | null>(null);

    const [isAddModalOpen, setIsAddModalOpen] =
        useState(false);

    const [isCreateProductModalOpen, setIsCreateProductModalOpen] =
        useState(false);


    const handleUpdate = async (
        shoppingItemId: string,
        request: {
            quantity?: number;
            purchased?: boolean;
            comment?: string;
        }
    ) => {

        try {

            const updatedItem =
                await updateShoppingItem(
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

        const itemToDelete =
            shoppingItems.find(
                (item) =>
                    item.id === shoppingItemId
            );

        const confirmed =
            window.confirm(
                itemToDelete
                    ? `¿Seguro que quieres eliminar ${itemToDelete.product.name} de la lista?`
                    : "¿Seguro que quieres eliminar este producto de la lista?"
            );

        if (!confirmed) {
            return;
        }


        try {

            await deleteShoppingItem(
                houseId!,
                shoppingItemId
            );

            setShoppingItems((currentItems) =>
                currentItems.filter(
                    (item) =>
                        item.id !== shoppingItemId
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

        if (shoppingItems.length === 0) {
            return;
        }

        const confirmed =
            window.confirm(
                "¿Seguro que quieres eliminar todos los productos de la lista?"
            );

        if (!confirmed) {
            return;
        }


        try {

            await clearShoppingItems(
                houseId!
            );

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


    const handleProductSelected = (
        product: Product
    ) => {

        setSelectedProduct(product);

        setIsAddModalOpen(true);

    };


    const handleCreateProduct = () => {

         setIsCreateProductModalOpen(true);

    };

    const handleConfirmCreateProduct = async (
        name: string,
        image: File
    ): Promise<void> => {

        try {

            // Crear el producto
            const product =
                await createProduct(
                    houseId!,
                    {
                        name,
                        image,
                    }
                );

            // Añadirlo automáticamente a la lista
            const shoppingItem =
                await createShoppingItem(
                    houseId!,
                    {
                        productId: product.id,
                        quantity: 1,
                        comment: "",
                    }
                );

            // Actualizar productos
            setProducts((currentProducts) => [
                ...currentProducts,
                product,
            ]);

            // Actualizar lista de la compra
            setShoppingItems((currentItems) => [
                ...currentItems,
                shoppingItem,
            ]);

            // Cerrar el modal de creación
            setIsCreateProductModalOpen(false);

            // Limpiar búsqueda
            setSearchText("");

        } catch (error) {

            console.error(
                "Error al crear el producto:",
                error
            );

        }

    };


    const handleConfirmAddShoppingItem = async (
        quantity: number,
        comment: string
    ): Promise<void> => {

        if (!selectedProduct) {
            return;
        }

        try {

            const shoppingItem =
                await createShoppingItem(
                    houseId!,
                    {
                        productId:
                            selectedProduct.id,

                        quantity,

                        comment,
                    }
                );

            setShoppingItems(current => [
                ...current,
                shoppingItem,
            ]);

            setIsAddModalOpen(false);

            setSelectedProduct(null);

            setSearchText("");

        } catch (error) {

            console.error(error);

        }

    };


    useEffect(() => {

        if (!houseId) {
            setLoading(false);
            return;
        }

        const loadShoppingItems =
            async () => {

                try {

                    setLoading(true);

                    setError(null);

                    const items =
                        await getShoppingItems(
                            houseId
                        );

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


    if (!houseId) {

        return (
            <div>
                <p>
                    No se ha encontrado la casa.
                </p>
            </div>
        );

    }


    if (loading) {

        return (

            <MainLayout
                houseId={houseId}
            >

                <PageHeader
                    title={houseName ?? ""}
                    subtitle="Lista de la compra"
                />

                <div>
                    <p>
                        Cargando lista de la compra...
                    </p>
                </div>

            </MainLayout>

        );

    }


    if (error) {

        return (

            <MainLayout
                houseId={houseId}
            >

                <PageHeader
                    title={houseName ?? ""}
                    subtitle="Lista de la compra"
                />

                <main>

                    <p>
                        {error}
                    </p>

                </main>

            </MainLayout>

        );

    }


    const sortedShoppingItems =
        [...shoppingItems].sort(
            (a, b) => {

                // Primero los no comprados

                if (
                    a.purchased !==
                    b.purchased
                ) {

                    return (
                        Number(a.purchased) -
                        Number(b.purchased)
                    );

                }

                // Dentro de cada grupo,
                // más recientes primero

                return (
                    new Date(
                        b.createdAt
                    ).getTime() -
                    new Date(
                        a.createdAt
                    ).getTime()
                );

            }
        );


    return (

        <MainLayout
            houseId={houseId}
        >

            <PageHeader
                title={houseName ?? ""}
                subtitle="Lista de la compra"
            />

            <main
                className="
                    max-w-4xl
                    mx-auto
                    p-6
                "
            >

                <div>
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


                    <button
                        type="button"
                        onClick={handleClearList}
                        disabled={
                            shoppingItems.length === 0
                        }
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

                            {sortedShoppingItems.map(
                                (item) => (

                                    <ShoppingItemCard
                                        key={item.id}
                                        item={item}
                                        onUpdate={handleUpdate}
                                        onDelete={handleDelete}
                                    />

                                )
                            )}

                        </div>

                    )}

                </div>

                <CreateProductModal

                    open={isCreateProductModalOpen}

                    initialName={searchText}

                    onClose={() => {

                        setIsCreateProductModalOpen(false);

                    }}

                    onConfirm={
                        handleConfirmCreateProduct
                    }

                />


                <AddShoppingItemModal

                    open={isAddModalOpen}

                    product={selectedProduct}

                    onCancel={() => {

                        setIsAddModalOpen(false);

                        setSelectedProduct(null);

                    }}

                    onConfirm={
                        handleConfirmAddShoppingItem
                    }

                />

            </main>

        </MainLayout>

    );

}


export default HousePage;