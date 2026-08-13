import api from "../api/axios";

import type { PantryItemResponse } from "../types/dto/response/PantryItemResponse";
import type { CreatePantryItemRequest } from "../types/dto/request/CreatePantryItemRequest";

export async function getPantryItems(
    houseId: string
): Promise<PantryItemResponse[]> {

    const response = await api.get<PantryItemResponse[]>(
        `/houses/${houseId}/pantry-items`
    );

    return response.data;
}


export async function createPantryItem(
    houseId: string,
    request: CreatePantryItemRequest
): Promise<PantryItemResponse> {

    const response = await api.post<PantryItemResponse>(
        `/houses/${houseId}/pantry-items`,
        request
    );

    return response.data;
}


export async function deletePantryItem(
    houseId: string,
    pantryItemId: string
): Promise<void> {

    await api.delete(
        `/houses/${houseId}/pantry-items/${pantryItemId}`
    );

}