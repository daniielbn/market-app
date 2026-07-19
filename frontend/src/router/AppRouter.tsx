import { BrowserRouter, Routes, Route } from "react-router-dom";

import LoginPage from "../pages/LoginPage";
import ShoppingListPage from "../pages/ShoppingListPage";

export default function AppRouter() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<LoginPage />} />
                <Route path="/shopping-list" element={<ShoppingListPage />} />
            </Routes>
        </BrowserRouter>
    );
}