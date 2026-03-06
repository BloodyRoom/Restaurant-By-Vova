import {Outlet, useNavigate} from "react-router";
import SideBar from "../ui/Admin/SideBar";
import { getUserInfo } from "../../utils/tokenUtil";
import { useEffect } from "react";


const AdminLayout = () => {
    const navigator = useNavigate();   
    const user = getUserInfo();

    useEffect(() => {
        if (!user) {
            navigator("/auth/login");
        } else if (!user.roles.includes("Admin")) {
            navigator("/");
        }
    }, [])

    return (
        <>
            <div className="flex">    
                <div className="w-[400px] max-w-[400px] h-screen fixed">
                    <SideBar/>
                </div>
                <div className="w-full ml-[400px]">
                    <Outlet />
                </div>
            </div>
        </>
    )
}

export default AdminLayout;