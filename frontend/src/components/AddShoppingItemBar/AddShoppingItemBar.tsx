interface Props {

    value: string;

    onChange: (
        text: string
    ) => void;

}

import "./AddShoppingItemBar.css";

function AddShoppingItemBar({
    value,
    onChange,
}: Props) {

    function handleChange(
        event: React.ChangeEvent<HTMLInputElement>
    ) {

        onChange(event.target.value);

    }

    return (

        <div className="shopping-search">

            <input
                type="text"
                placeholder="¿Qué necesitas comprar?"
                value={value}
                onChange={handleChange}
                className="shopping-search__input"
            />

        </div>

    );

}

export default AddShoppingItemBar;