// import './App.css'
import { Route, Routes } from "react-router";
import IndexPage from "./pages/IndexPage";
import LoginPage from "./pages/Auth/LoginPage";
import RegisterPage from "./pages/Auth/RegisterPage";
import MainLayout from "./components/layouts/MainLayout";
import AdminLayout from "./components/layouts/AdminLayout";
import MenuPage from "./pages/MenuPage";
import CartPage from "./pages/CartPage";
import CheckoutPage from "./pages/CheckoutPage";
import DeliveriesPage from "./pages/DeliveriesPage";

import IndexAdminPage from "./pages/Admin/IndexAdminPage";
import CategoryAdminPage from "./pages/Admin/Category/CategoryAdminPage";

function App() {

    return (
        <>
            <Routes>
                <Route path={"/"} element={<MainLayout/>}>
                    <Route index element={<IndexPage />} />
                    <Route path={"/menu"} element={<MenuPage />} />
                    <Route path={"/cart"} element={<CartPage />} />
                    <Route path={"/checkout"} element={<CheckoutPage />} />
                    <Route path={"/deliveries"} element={<DeliveriesPage />} />


                    <Route path="/auth/login" element={<LoginPage />} />
                    <Route path="/auth/register" element={<RegisterPage />} />
                </Route>
                <Route path={"/admin"} element={<AdminLayout />}>
                    <Route index element={<IndexAdminPage />} />
                    <Route path="/admin/categories" element={<CategoryAdminPage />} />
                </Route>
            </Routes>
        </>
    )
}

export default App
