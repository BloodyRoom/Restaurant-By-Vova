import {
    useGetDeliveriesQuery,
} from "../services/apiDelivery";
import {useEffect} from "react";
import {useNavigate} from "react-router";
import {getUserInfo} from "../utils/tokenUtil";

const DeliveriesPage = () => {
    const { data: deliveries = [] } = useGetDeliveriesQuery();

    const navigate = useNavigate();
    const user = getUserInfo();

    useEffect(() => {
        if (!user) {
            navigate("/auth/login");
        }
    }, [])

    const getStatusColor = (status: string) => {
        switch (status) {
            case "Created":
                return "bg-yellow-500/20 text-yellow-400";
            case "Delivering":
                return "bg-blue-500/20 text-blue-400";
            case "Completed":
                return "bg-green-500/20 text-green-400";
            case "Cancelled":
                return "bg-red-500/20 text-red-400";
            default:
                return "bg-white/10 text-white";
        }
    };


    const getStatusName = (status: string) => {
        switch (status) {
            case "Created":
                return "Створено";
            case "Delivering":
                return "Доставляється";
            case "Completed":
                return "Виконано";
            case "Cancelled":
                return "Скасовано";
            default:
                return "оу фак";
        }
    };

    return (
        <div className="w-full flex justify-center mt-30">
            <div className="w-[1000px] px-4 flex flex-col gap-8">

                <h1 className="text-4xl font-bold text-white">
                    Мої замовлення
                </h1>

                {deliveries.length === 0 && (
                    <div className="text-gray-400">
                        У вас ще немає замовлень
                    </div>
                )}

                {deliveries.map((delivery) => {
                    const total = delivery.products.reduce(
                        (sum, item) =>
                            sum + item.product.price * item.count,
                        0
                    );

                    return (
                        <div
                            key={delivery.id}
                            className="rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 p-6 flex flex-col gap-6"
                        >
                            <div className="flex justify-between items-center">
                                <div className="text-lg font-semibold text-white">
                                    Замовлення #{delivery.id}
                                </div>

                                <div
                                    className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(
                                        delivery.status
                                    )}`}
                                >
                                    {getStatusName(delivery.status)}
                                </div>
                            </div>

                            <div className="text-gray-300">
                                Адреса доставки: {delivery.address}
                            </div>

                            <div className="flex flex-col gap-2">
                                {delivery.products.map((item, index) => (
                                    <div
                                        key={index}
                                        className="flex justify-between text-white"
                                    >
                                        <div>
                                            {item.product.name} ×{" "}
                                            {item.count}
                                        </div>
                                        <div>
                                            {item.product.price *
                                                item.count} ₴
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="border-t border-white/10 pt-4 flex justify-between items-center">
                                <div className="font-bold text-lg text-white">
                                    Разом: {total} ₴
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default DeliveriesPage;