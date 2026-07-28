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