import { BrowserRouter, Routes, Route } from "react-router-dom";

import LoginPage from "../pages/LoginPage";
import HousePage from "../pages/HousePage";

export default function AppRouter() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<LoginPage />} />

                <Route path="/house/:houseId" 
                element={<HousePage />} />
                
            </Routes>
        </BrowserRouter>
    );
}