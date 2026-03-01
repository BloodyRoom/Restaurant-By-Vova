import clsx from "clsx";
import { Button } from "../index";
import { useNavigate } from "react-router";

export const Navbar = () => {
    const navigator = useNavigate();
    return (
        <div className="w-full flex justify-center fixed z-10 top-6">
            <div className="w-[95%] max-w-6xl relative">
                <div
                    className={clsx(
                        "relative",
                        "rounded-full px-6 py-4",
                        "bg-white/5 backdrop-blur-2xl",
                        "border border-white/10",
                        "flex items-center justify-between"
                    )}
                >
                    {/* Left */}
                    <div className="flex items-center gap-4">
                        <div
                            className={clsx(
                                "flex items-center gap-1 overflow-hidden transition-all duration-300", "opacity-100 max-w-[500px]"
                            )}
                        >
                            <Button variant="secondary-link" className={"rounded-l-3xl rounded-r-lg"} size="sm">
                                Меню
                            </Button>

                            <Button variant="secondary-link" className={"rounded-l-lg rounded-r-3xl"} size="sm">
                                Доставка
                            </Button>
                        </div>
                    </div>

                    <div className="absolute left-1/2 -translate-x-1/2 text-white text-xl font-semibold">
                        У Вови
                    </div>

                    <div className="flex items-center gap-3">
                        <Button onClick={() => navigator("/auth/login")} variant="none" size="md">
                            Вхід
                        </Button>

                        <Button onClick={() => navigator("/auth/register")} variant="primary" size="md">
                            Реєстрація
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
};