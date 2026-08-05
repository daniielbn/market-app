import { useEffect, useState } from "react";
import type { Product } from "../types/Product";
import { getProducts } from "../services/productService";

export function useProducts(houseId: string | null) {

    const [products, setProducts] = useState<Product[]>([]);

    useEffect(() => {

        if (!houseId) {
            return;
        }

        getProducts(houseId)
            .then(setProducts)
            .catch(console.error);

    }, [houseId]);

    return {
        products,
        setProducts,
    };

}