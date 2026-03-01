
import {Navbar} from "../ui/Navbar";
import {Outlet} from "react-router";


const MainLayout = () => {
    return (
        <>
            <Navbar />
            <div className="pb-12">
                <Outlet />
            </div>
        </>
    )
}

export default MainLayout;