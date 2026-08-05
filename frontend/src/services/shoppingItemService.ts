import api from "../api/axios";
import type { ShoppingItemResponse } from "../types/dto/ShoppingItemResponse";
import type { CreateShoppingItemRequest } from "../types/dto/CreateShoppingItemRequest";

export interface UpdateShoppingItemRequest {
    quantity?: number;
    purchased?: boolean;
    comment?: string;
}

export async function getShoppingItems(
    houseId: string
): Promise<ShoppingItemResponse[]> {

    const response = await api.get<ShoppingItemResponse[]>(
        `/houses/${houseId}/shopping-items`
    );

    return response.data;
}


export async function updateShoppingItemPurchased(
    shoppingItemId: string,
    purchased: boolean
): Promise<ShoppingItemResponse> {

    return updateShoppingItem(shoppingItemId, {
        purchased,
    });

}

export async function updateShoppingItem(
    shoppingItemId: string,
    request: UpdateShoppingItemRequest
): Promise<ShoppingItemResponse> {

    const response = await api.patch<ShoppingItemResponse>(
        `/shopping-items/${shoppingItemId}`,
        request
    );

    return response.data;
}


export async function deleteShoppingItem(
    houseId: string,
    shoppingItemId: string
): Promise<void> {

    await api.delete(
        `/houses/${houseId}/shopping-items/${shoppingItemId}`
    );
}


export async function clearShoppingItems(
    houseId: string
): Promise<void> {

    await api.delete(
        `/houses/${houseId}/shopping-items`
    );
}

export async function createShoppingItem(
    houseId: string,
    request: CreateShoppingItemRequest
): Promise<ShoppingItemResponse> {

    const response = await api.post<ShoppingItemResponse>(
        `/houses/${houseId}/shopping-items`,
        request
    );

    return response.data;

}