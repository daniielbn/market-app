import { getHouseId, getHouseName } from "../utils/localStorage";

export function useHouse() {

    const houseId = getHouseId();

    const houseName = getHouseName();

    const isLogged = houseId !== null;

    return {
        houseId,
        houseName,
        isLogged,
    };

}