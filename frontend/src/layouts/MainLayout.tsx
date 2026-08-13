import type { ReactNode } from "react";

import AppNavigation from "../components/Navegation/AppNavigation";

import "./MainLayout.css";

interface MainLayoutProps {

    children: ReactNode;

    houseId: string;

}

function MainLayout({
    children,
    houseId,
}: MainLayoutProps) {

    return (

        <div className="main-layout">

            <AppNavigation
                houseId={houseId}
            />

            {children}

        </div>

    );

}

export default MainLayout;