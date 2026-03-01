import { Button, Card } from "../components/ui";
import {
    useGetCartsQuery,
    useCartUpdateMutation,
    useCartDeleteMutation
} from "../services/apiCart";
import APP_ENV from "../env";
import { useNavigate } from "react-router";
import {useEffect} from "react";
import {getUserInfo} from "../utils/tokenUtil";

const CartPage = () => {
    const navigate = useNavigate();

    const { data: carts = [] } = useGetCartsQuery();
    const [cartUpdate] = useCartUpdateMutation();
    const [cartDelete] = useCartDeleteMutation();

    const user = getUserInfo();

    useEffect(() => {
        if (!user) {
            navigate("/auth/login");
        }
    }, [])

    const handleIncrease = async (id: number, count: number) => {
        await cartUpdate({ id, count: count + 1 });
    };

    const handleDecrease = async (id: number, count: number) => {
        if (count <= 1) {
            await cartDelete(id);
            return;
        }

        await cartUpdate({ id, count: count - 1 });
    };

    const handleDelete = async (id: number) => {
        await cartDelete(id);
    };

    const totalPrice = carts.reduce(
        (sum, item) => sum + item.product.price * item.count,
        0
    );

    return (
        <div className="w-full flex justify-center mt-30">
            <div className="w-[1200px] px-6 flex flex-col gap-10">

                <h1 className="text-4xl font-bold text-white">
                    Кошик
                </h1>

                {carts.length === 0 && (
                    <div className="text-gray-400 text-lg">
                        Кошик порожній
                    </div>
                )}

                <div className={"flex gap-5 flex-wrap"}>
                    {carts.map((item) => (
                        <Card
                            key={item.id}
                            image={`${
                                item.product.image
                                    ? APP_ENV.API_IMAGE_MEDIUM_URL
                                    : APP_ENV.API_URL + "/images/"
                            }${
                                item.product.image
                                    ? item.product.image
                                    : "noimage.jpg"
                            }`}
                        >
                            <div className="flex justify-between justify-center flex-col gap-3 w-full">
                                <div className="flex justify-between">
                                    <div className="font-medium text-lg">
                                        {item.product.name}
                                    </div>

                                    <div className="text-gray-400">
                                        {item.product.price} ₴
                                    </div>
                                </div>

                                <div className="flex justify-between">
                                    <div className="flex items-center gap-4">
                                        <Button
                                            size="sm"
                                            onClick={() => handleDecrease(item.id, item.count)}
                                        >−</Button>

                                        <div className="text-lg font-medium w-6 text-center">
                                            {item.count}
                                        </div>

                                        <Button
                                            size="sm"
                                            onClick={() => handleIncrease(item.id, item.count)}
                                        >+</Button>
                                     </div>

                                    <div className="font-semibold text-lg w-24 text-right">
                                        {item.product.price * item.count} ₴
                                    </div>

                                    <Button
                                        size="sm"
                                        onClick={() => handleDelete(item.id)}
                                    >✕</Button>
                                </div>
                            </div>
                        </Card>
                    ))}
                </div>

                {carts.length > 0 && (
                    <div className="flex justify-between items-center mt-6 bg-[#1a1a1a] p-6 rounded-xl">

                        <div className="text-2xl font-bold text-white">
                            Разом: {totalPrice} ₴
                        </div>

                        <Button
                            size="lg"
                            onClick={() => navigate("/checkout")}
                        >
                            Оформити доставку
                        </Button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default CartPage;