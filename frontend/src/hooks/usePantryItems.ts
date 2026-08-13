import { useEffect, useState } from "react";

import type { PantryItemResponse } from "../types/dto/response/PantryItemResponse";

import {
    getPantryItems,
    createPantryItem,
    deletePantryItem,
} from "../services/pantryItemService";

import type { CreatePantryItemRequest } from "../types/dto/request/CreatePantryItemRequest";

export function usePantryItems(
    houseId: string | null
) {

    const [pantryItems, setPantryItems] =
        useState<PantryItemResponse[]>([]);

    const [loading, setLoading] =
        useState(true);

    const [error, setError] =
        useState<string | null>(null);


    useEffect(() => {

        if (!houseId) {

            setPantryItems([]);

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


    const addPantryItem = async (
        request: CreatePantryItemRequest
    ) => {

        if (!houseId) {
            return;
        }

        const pantryItem =
            await createPantryItem(
                houseId,
                request
            );

        setPantryItems(currentItems => [
            ...currentItems,
            pantryItem,
        ]);

    };


    const removePantryItem = async (
        pantryItemId: string
    ) => {

        if (!houseId) {
            return;
        }

        await deletePantryItem(
            houseId,
            pantryItemId
        );

        setPantryItems(currentItems =>
            currentItems.filter(
                item => item.id !== pantryItemId
            )
        );

    };


    return {
        pantryItems,
        setPantryItems,
        addPantryItem,
        removePantryItem,
        loading,
        error,
    };

}