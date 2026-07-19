import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { validateHouse } from "../services/houseService";
import { saveHouse } from "../utils/localStorage";
import { useHouse } from "../hooks/useHouse";

export default function LoginPage() {

    const [accessCode, setAccessCode] = useState("");

    const navigate = useNavigate();

    const { isLogged } = useHouse();

    useEffect(() => {

        if (isLogged) {
            navigate("/shopping-list");
        }

    }, [isLogged, navigate]);

    async function handleLogin() {

        const house = await validateHouse({
            accessCode
        });

        saveHouse(
            house.houseId,
            house.houseName
        );

        navigate("/shopping-list");

    }

    return (
        <div>

            <h1>Market App</h1>

            <p>Introduce el código de acceso</p>

            <input
                type="text"
                value={accessCode}
                onChange={(event) => setAccessCode(event.target.value)}
            />

            <button onClick={handleLogin}>
                Entrar
            </button>

        </div>
    );

}