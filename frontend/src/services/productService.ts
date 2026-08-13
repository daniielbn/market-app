import api from "../api/axios";

import type { ProductResponse } from "../types/dto/response/ProductResponse";
import type { CreateProductRequest } from "../types/dto/request/CreateProductRequest";

export async function getProducts(
    houseId: string
): Promise<ProductResponse[]> {

    const response = await api.get<ProductResponse[]>(
        `/houses/${houseId}/products`
    );

    return response.data;

}

export async function createProduct(
    houseId: string,
    request: CreateProductRequest
): Promise<ProductResponse> {

    const formData = new FormData();

    formData.append(
        "name",
        request.name
    );

    formData.append(
        "image",
        request.image
    );

    const response = await api.post<ProductResponse>(
        `/houses/${houseId}/products`,
        formData,
        {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        }
    );

    return response.data;

}