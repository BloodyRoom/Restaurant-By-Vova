import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import {Button, Input} from "../components/ui";
import { useGetCartsQuery } from "../services/apiCart";
import { useDeliveryCreateMutation } from "../services/apiDelivery";
import {getUserInfo} from "../utils/tokenUtil";

const CheckoutPage = () => {
    const navigate = useNavigate();

    const { refetch } = useGetCartsQuery();

    const { data: carts = [] } = useGetCartsQuery();
    const [deliveryCreate] = useDeliveryCreateMutation();

    const user = getUserInfo();

    const [address, setAddress] = useState("");
    const [inputError, setInputError] = useState("")

    useEffect(() => {
        if (!user) {
            navigate("/auth/login");
        }
    }, [])

    useEffect(() => {
        if (carts.length === 0) {
            navigate("/cart");
        }
    }, [carts, navigate]);

    const totalPrice = carts.reduce(
        (sum, item) => sum + item.product.price * item.count,
        0
    );

    const handleSubmit = async () => {
        if (!address.trim()) {
            setInputError("Введіть адресу");
            return;
        }

        try {
            await deliveryCreate({ address });
            await refetch();
            navigate("/deliveries");
        } catch (error) {
            console.error("Delivery error:", error);
        }
    };

    return (
        <div className="w-full flex justify-center mt-30">
            <div className="w-[900px] px-4 flex flex-col gap-10">

                <h1 className="text-4xl font-bold text-white">
                    Оформлення доставки
                </h1>

                <div className="bg-[#1a1a1a] p-6 rounded-xl flex flex-col gap-4">
                    {carts.map(item => (
                        <div
                            key={item.id}
                            className="flex justify-between text-white"
                        >
                            <div>
                                {item.product.name} × {item.count}
                            </div>
                            <div>
                                {item.product.price * item.count} ₴
                            </div>
                        </div>
                    ))}

                    <div className="border-t border-white/10 pt-4 flex justify-between font-bold text-lg text-white">
                        <div>Разом:</div>
                        <div>{totalPrice} ₴</div>
                    </div>
                </div>

                <div className="flex flex-col gap-3">
                    <label className="text-white text-lg">
                        Адреса доставки
                    </label>

                    <Input
                        type="text"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        error={inputError}
                    />
                </div>

                <Button
                    size="lg"
                    onClick={handleSubmit}
                >
                    Підтвердити замовлення
                </Button>
            </div>
        </div>
    );
};

export default CheckoutPage;