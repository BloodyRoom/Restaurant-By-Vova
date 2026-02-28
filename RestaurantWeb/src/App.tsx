// import './App.css'
import { Route, Routes } from "react-router";
import { Button, Card, Input } from "./components/ui";
import { Navbar } from "./components/ui/Navbar";
import IndexPage from "./pages/IndexPage";
import LoginPage from "./pages/Auth/LoginPage";
import RegisterPage from "./pages/Auth/RegisterPage";

function App() {

    return (
        <>
            <Navbar />
            <Routes>
                <Route path="/" element={<IndexPage />} />
                <Route path="/auth/login" element={<LoginPage />} />
                <Route path="/auth/register" element={<RegisterPage />} />
                {/* <Route path="/auth/profile" element={<ProfilePage />} /> */}
                {/* <Route path="/auth/forgot-password" element={<ForgotPassword />} /> */}
                {/* <Route path="/reset-password/:uid/:token" element={<ResetPassword />} /> */}
            </Routes>
        </>
    )
}

export default App
