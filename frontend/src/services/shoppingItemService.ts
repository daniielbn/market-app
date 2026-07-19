import api from "../api/axios";

import type { ShoppingItem } from "../types/ShoppingItem";

import type { CreateShoppingItemRequest } from "../types/dto/CreateShoppingItemRequest";

import type { UpdateShoppingItemRequest } from "../types/dto/UpdateShoppingItemRequest";

export async function getShoppingItems(
    houseId: string
): Promise<ShoppingItem[]> {

    const response = await api.get<ShoppingItem[]>(
        `/houses/${houseId}/shopping-items`
    );

    return response.data;
}

export async function createShoppingItem(
    houseId: string,
    request: CreateShoppingItemRequest
): Promise<ShoppingItem> {

    const response = await api.post<ShoppingItem>(
        `/houses/${houseId}/shopping-items`,
        request
    );

    return response.data;
}

export async function updateShoppingItem(
    shoppingItemId: string,
    request: UpdateShoppingItemRequest
): Promise<ShoppingItem> {

    const response = await api.patch<ShoppingItem>(
        `/shopping-items/${shoppingItemId}`,
        request
    );

    return response.data;
}

export async function deleteShoppingItem(
    shoppingItemId: string
): Promise<void> {

    await api.delete(
        `/shopping-items/${shoppingItemId}`
    );

}