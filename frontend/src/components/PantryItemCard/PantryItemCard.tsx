import type { Product } from "../../types/Product";
import type { PantryItem } from "../../types/PantryItem";

import "./PantryItemCard.css";

interface PantryItemCardProps {

    item: PantryItem;

    product: Product;

}

function PantryItemCard({
    item,
    product,
}: PantryItemCardProps) {

    const expirationDate = new Date(
        `${item.expirationDate}T00:00:00`
    );

    const today = new Date();

    today.setHours(0, 0, 0, 0);

    const difference =
        expirationDate.getTime() -
        today.getTime();

    const daysUntilExpiration =
        Math.ceil(
            difference /
            (1000 * 60 * 60 * 24)
        );


    let expirationStatus =
        "pantry-item-card__expiration-dot--green";


    if (daysUntilExpiration <= 2) {

        expirationStatus =
            "pantry-item-card__expiration-dot--red";

    } else if (daysUntilExpiration <= 7) {

        expirationStatus =
            "pantry-item-card__expiration-dot--yellow";

    }


    return (

        <article className="pantry-item-card">

            <img
                src={product.image}
                alt={product.name}
                className="pantry-item-card__image"
            />

            <div className="pantry-item-card__content">

                <h3 className="pantry-item-card__name">

                    {product.name}

                </h3>

                <div className="pantry-item-card__expiration">

                    <span
                        className={`
                            pantry-item-card__expiration-dot
                            ${expirationStatus}
                        `}
                        aria-hidden="true"
                    />

                    <span>

                        Caduca el{" "}

                        {expirationDate.toLocaleDateString(
                            "es-ES"
                        )}

                    </span>

                </div>

            </div>

        </article>

    );

}

export default PantryItemCard;