const HOUSE_ID_KEY = "houseId";
const HOUSE_NAME_KEY = "houseName";

export function saveHouse(houseId: string, houseName: string): void {
    localStorage.setItem(HOUSE_ID_KEY, houseId);
    localStorage.setItem(HOUSE_NAME_KEY, houseName);
}

export function getHouseId(): string | null {
    return localStorage.getItem(HOUSE_ID_KEY);
}

export function getHouseName(): string | null {
    return localStorage.getItem(HOUSE_NAME_KEY);
}

export function clearHouse(): void {
    localStorage.removeItem(HOUSE_ID_KEY);
    localStorage.removeItem(HOUSE_NAME_KEY);
}