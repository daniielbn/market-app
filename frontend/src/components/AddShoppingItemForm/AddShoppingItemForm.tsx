interface AddShoppingItemFormProps {

    name: string;

    quantity: number;

    onNameChange: (value: string) => void;

    onQuantityChange: (value: number) => void;

    onSubmit: () => void;

}

export default function AddShoppingItemForm({

    name,

    quantity,

    onNameChange,

    onQuantityChange,

    onSubmit

}: AddShoppingItemFormProps) {

    return (

        <>

            <input

                placeholder="Producto"

                value={name}

                onChange={(e) => onNameChange(e.target.value)}

            />

            <input

                type="number"

                min={1}

                value={quantity}

                onChange={(e) => onQuantityChange(Number(e.target.value))}

            />

            <button onClick={onSubmit}>

                Añadir producto

            </button>

        </>

    );

}