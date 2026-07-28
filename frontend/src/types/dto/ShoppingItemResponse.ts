import type { Product } from "../Product";

export interface ShoppingItemResponse {
    id: string;
    product: Product;
    quantity: number;
    purchased: boolean;
    comment: string | null;
}