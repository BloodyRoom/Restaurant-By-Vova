// import './App.css'
import { Route, Routes } from "react-router";
import IndexPage from "./pages/IndexPage";
import LoginPage from "./pages/Auth/LoginPage";
import RegisterPage from "./pages/Auth/RegisterPage";
import MainLayout from "./components/layouts/MainLayout";
import MenuPage from "./pages/MenuPage";

function App() {

    return (
        <>
            <Routes>
                <Route path={"/"} element={<MainLayout/>}>
                    <Route index element={<IndexPage />} />
                    <Route path={"/menu"} element={<MenuPage />} />
                    <Route path="/auth/login" element={<LoginPage />} />
                    <Route path="/auth/register" element={<RegisterPage />} />
                </Route>
            </Routes>
        </>
    )
}

export default App
