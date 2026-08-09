interface HeaderProps {

    houseName: string | null;

    onChangeHouse: () => void;

}

export default function Header({

    houseName,

    onChangeHouse

}: HeaderProps) {

    return (

        <header
            style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "24px"
            }}
        >

            <h1>

                {houseName}

            </h1>

            <button onClick={onChangeHouse}>

                Cambiar casa

            </button>

        </header>

    );

}