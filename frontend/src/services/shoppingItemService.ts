import api from "../api/axios";
import type { ShoppingItemResponse } from "../types/dto/ShoppingItemResponse";

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

    console.log("Actualizando estado de compra del producto:", {
        shoppingItemId,
        purchased,
    });

    const response = await api.patch<ShoppingItemResponse>(
        `/shopping-items/${shoppingItemId}`,
        {
            purchased,
        }
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