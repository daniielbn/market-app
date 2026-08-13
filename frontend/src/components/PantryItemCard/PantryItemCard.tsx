import type { Product } from "../../types/Product";
import type { PantryItem } from "../../types/PantryItem";

import crossIcon from "../../assets/icon/cross.svg";

import "./PantryItemCard.css";

interface PantryItemCardProps {

    item: PantryItem;

    product: Product;

    onDelete: (
        pantryItemId: string
    ) => void;

}

function PantryItemCard({
    item,
    product,
    onDelete,
}: PantryItemCardProps) {

    const handleDelete = () => {

        onDelete(item.id);

    };

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

                <div className="pantry-item-card__header">

                    <h3 className="pantry-item-card__name">

                        {product.name}

                    </h3>

                    <button
                        type="button"
                        className="pantry-item-card__delete-button"
                        onClick={handleDelete}
                        aria-label={`Eliminar ${product.name} de la despensa`}
                    >

                        <img
                            src={crossIcon}
                            alt=""
                        />

                    </button>

                </div>

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