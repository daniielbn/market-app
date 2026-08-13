import api from "../api/axios";

import type { ValidateHouseRequest } from "../types/dto/request/ValidateHouseRequest";
import type { ValidateHouseResponse } from "../types/dto/response/ValidateHouseResponse";

export async function validateHouse(
    request: ValidateHouseRequest
): Promise<ValidateHouseResponse> {

    const response = await api.post<ValidateHouseResponse>(
        "/houses/validate",
        request
    );

    return response.data;
}