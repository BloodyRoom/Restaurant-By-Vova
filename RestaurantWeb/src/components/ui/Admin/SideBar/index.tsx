import { useNavigate } from "react-router";
import { Button } from "../../Button";

const SideBar = () => {
    const navigator = useNavigate();


    return (
        <div className="flex w-full h-full p-6 bg-[#1A1A1A] text-white">
            <div className="w-full flex flex-col justify-between">

                <div>
                    <h2 className="text-xl font-semibold mb-6 tracking-wide text-zinc-300">
                        адмін панель
                    </h2>

                    <ul className="space-y-2">
                        <li className="group">
                            <Button
                                onClick={() => navigator("/admin/categories")}
                                variant="none"
                                className="relative w-full text-left px-4 py-3 rounded-lg transition-all duration-300 hover:bg-[#2A2A2A]"
                            >
                                <span className="absolute left-0 top-0 h-full w-1 bg-transparent group-hover:bg-white transition-all duration-300 rounded-r"></span>
                                Керування категоріями
                            </Button>
                        </li>

                        <li className="group">
                            <Button
                                onClick={() => navigator("/admin/menu")}
                                variant="none"
                                className="relative w-full text-left px-4 py-3 rounded-lg transition-all duration-300 hover:bg-[#2A2A2A]"
                            >
                                <span className="absolute left-0 top-0 h-full w-1 bg-transparent group-hover:bg-white transition-all duration-300 rounded-r"></span>
                                Керування меню
                            </Button>
                        </li>

                        <li className="group">
                            <Button
                                onClick={() => navigator("/admin/orders")}
                                variant="none"
                                className="relative w-full text-left px-4 py-3 rounded-lg transition-all duration-300 hover:bg-[#2A2A2A]"
                            >
                                <span className="absolute left-0 top-0 h-full w-1 bg-transparent group-hover:bg-white transition-all duration-300 rounded-r"></span>
                                Керування замовленнями
                            </Button>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default SideBar;