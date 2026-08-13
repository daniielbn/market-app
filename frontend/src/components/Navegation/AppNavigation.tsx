import { NavLink } from "react-router-dom";

import "./AppNavigation.css";

interface AppNavigationProps {
    houseId: string;
}

function AppNavigation({
    houseId,
}: AppNavigationProps) {

    return (

        <nav
            className="app-navigation"
            aria-label="Navegación principal"
        >

            <div className="app-navigation__inner">

                <NavLink
                    to={`/house/${houseId}`}
                    end
                    className={({ isActive }) =>
                        `app-navigation__link ${
                            isActive
                                ? "app-navigation__link--active"
                                : ""
                        }`
                    }
                >
                    Lista de la compra
                </NavLink>

                <NavLink
                    to={`/house/${houseId}/pantry`}
                    className={({ isActive }) =>
                        `app-navigation__link ${
                            isActive
                                ? "app-navigation__link--active"
                                : ""
                        }`
                    }
                >
                    Despensa
                </NavLink>

            </div>

        </nav>

    );
}

export default AppNavigation;