import api from "../api/axios";
import type { ProductResponse } from "../types/dto/ProductResponse";

export async function getProducts(
    houseId: string
): Promise<ProductResponse[]> {

    const response = await api.get<ProductResponse[]>(
        `/houses/${houseId}/products`
    );

    return response.data;
}