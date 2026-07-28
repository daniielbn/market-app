import type { Product } from "./Product.ts";

export interface ShoppingItem {

    id: string;

    product: Product;

    quantity: number;

    purchased: boolean;

}