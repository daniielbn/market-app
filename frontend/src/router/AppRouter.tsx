import { BrowserRouter, Routes, Route } from "react-router-dom";

import LoginPage from "../pages/LoginPage";
import HousePage from "../pages/HousePage";
import PantryPage from "../pages/PantryPage";

export default function AppRouter() {

    return (

        <BrowserRouter>

            <Routes>

                <Route
                    path="/"
                    element={<LoginPage />}
                />

                <Route
                    path="/house/:houseId"
                    element={<HousePage />}
                />

                <Route
                    path="/house/:houseId/pantry"
                    element={<PantryPage />}
                />

            </Routes>

        </BrowserRouter>

    );

}