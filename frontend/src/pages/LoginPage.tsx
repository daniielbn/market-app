import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { validateHouse } from "../services/houseService";
import { saveHouse } from "../utils/localStorage";
import { useHouse } from "../hooks/useHouse";
import PageHeader from "../components/Header/PageHeader";

import "./LoginPage.css";

export default function LoginPage() {

    const [accessCode, setAccessCode] = useState("");

    const navigate = useNavigate();

    const { isLogged } = useHouse();

    useEffect(() => {

        if (isLogged) {

            const houseId =
                localStorage.getItem("houseId");

            if (!houseId) {
                return;
            }

            navigate(`/house/${houseId}`);

        }

    }, [isLogged, navigate]);

    async function handleLogin() {

        console.log("Intentando entrar...");

        const house = await validateHouse({
            accessCode,
        });

        saveHouse(
            house.houseId,
            house.houseName
        );

        navigate(`/house/${house.houseId}`);

    }

    return (

        <div>

            <PageHeader
                title="Market"
                subtitle="Introduce el código de acceso para entrar"
            />

            <main className="login-page">

                <section className="login-page__card">

                    <label
                        htmlFor="accessCode"
                        className="login-page__label"
                    >
                        Código de acceso
                    </label>

                    <div className="login-page__row">

                        <input
                            id="accessCode"
                            type="text"
                            value={accessCode}
                            onChange={(event) =>
                                setAccessCode(event.target.value)
                            }
                            placeholder="Escribe el código de tu casa"
                            className="login-page__input"
                        />

                        <button
                            type="button"
                            onClick={handleLogin}
                            className="login-page__button"
                        >
                            Entrar
                        </button>

                    </div>

                </section>

            </main>

        </div>

    );

}