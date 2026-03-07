import clsx from "clsx";
import { Button } from "../index";
import { useNavigate } from "react-router";
import {getUserInfo} from "../../../utils/tokenUtil";
import {useGetCartsQuery} from "../../../services/apiCart";
import {useAppDispatch} from "../../../store";
import {logout} from "../../../store/authSlice";

export const Navbar = () => {
    const navigator = useNavigate();

    const dispatch = useAppDispatch();

    const user = getUserInfo();

    const { data: carts = [] } = useGetCartsQuery(undefined, {
        skip: !user
    });

    const totalItems = carts.reduce(
        (sum, item) => sum + item.count,
        0
    );

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
                            <Button  onClick={() => navigator("/menu")} variant="secondary-link" className={"rounded-l-3xl rounded-r-lg"} size="sm">
                                Меню
                            </Button>

                            <Button  onClick={() => navigator("/deliveries")} variant="secondary-link" className={"rounded-l-lg rounded-r-3xl"} size="sm">
                                Доставка
                            </Button>
                        </div>
                    </div>

                    <div onClick={() => navigator("/")} className="cursor-pointer  left-1/2 -translate-x-1/2 text-white text-xl font-semibold">
                        У Вови
                    </div>

                    <div className="flex items-center gap-3">
                        {user ? (
                            <>
                                <p className={"text-white"}>{user.name}</p>

                                {user.roles.includes("Admin") && (
                                    <Button
                                        onClick={() => navigator("/admin")}
                                        variant="none"
                                        size="sm"
                                    >
                                        Адмін панель
                                    </Button>
                                )}

                                <Button
                                    onClick={() => navigator("/cart")}
                                    variant="none"
                                    size="sm"
                                >
                                    Кошик {totalItems > 0 && (<span>({totalItems})</span>)}
                                </Button>

                                <Button
                                    onClick={() => {
                                        dispatch(logout());
                                        navigator("/");
                                    }}
                                    variant="secondary"
                                    size="sm"
                                >
                                    Вийти
                                </Button>
                            </>
                        ) : (
                            <>
                                <Button onClick={() => navigator("/auth/login")} variant="none" size="md">
                                    Вхід
                                </Button>

                                <Button onClick={() => navigator("/auth/register")} variant="primary" size="md">
                                    Реєстрація
                                </Button>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};