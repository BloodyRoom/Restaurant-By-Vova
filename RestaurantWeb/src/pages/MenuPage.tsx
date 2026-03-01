import { useMemo } from "react";
import { useSearchParams } from "react-router";
import { Button, Card } from "../components/ui";
import { IProduct } from "../types/product/IProduct";
import { useGetCategoriesQuery } from "../services/apiCategory";
import { useGetProductsQuery } from "../services/apiProduct";
import {useGetCartsQuery, useCartCreateMutation, useCartUpdateMutation} from "../services/apiCart";
import APP_ENV from "../env";
import { getUserInfo } from "../utils/tokenUtil";

const MenuPage = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const selectedCategory = searchParams.get("category");

    const user = getUserInfo();

    const { data: categories } = useGetCategoriesQuery();
    const { data: products } = useGetProductsQuery();

    const { data: carts } = useGetCartsQuery(undefined, {
        skip: !user
    });

    const [cartCreate] = useCartCreateMutation();
    const [cartUpdate] = useCartUpdateMutation();

    const filteredProducts: IProduct[] = useMemo(() => {
        if (!products) return [];
        if (!selectedCategory) return products;

        return products.filter(
            (p) => p.category.id === Number(selectedCategory)
        );
    }, [products, selectedCategory]);

    const handleCategoryClick = (id?: number) => {
        if (!id) {
            setSearchParams({});
            return;
        }
        setSearchParams({ category: id.toString() });
    };

    const handleAddToCart = async (productId: number) => {
        if (!user) return;

        const cartItems = carts ?? [];

        const existing = cartItems.find(
            (item) => item.product.id === productId
        );

        try {
            if (existing) {
                await cartUpdate({
                    id: existing.id,
                    count: existing.count + 1
                });
            } else {
                await cartCreate({
                    productId: productId,
                    count: 1
                });
            }
        } catch (error) {
            console.error("Cart error:", error);
        }
    };

    const getProductCount = (productId: number) => {
        const item = carts?.find(
            (x) => x.product.id === productId
        );
        return item?.count ?? 0;
    };

    return (
        <>
            <div className="w-full h-[30vh] flex justify-center relative">
                <div className="flex justify-center items-center flex-col w-[1000px] h-full pt-25 gap-6">
                    <h1 className="text-[64px] font-bold w-1/2 text-white text-center leading-15">
                        Меню
                    </h1>
                </div>

                <div className="w-full h-[100%] absolute z-0 top-0">
                    <img
                        src="/bg.png"
                        alt=""
                        className="select-none w-full h-full object-cover 2xl:rounded-b-[120px] rounded-b-2xl"
                    />
                </div>
            </div>

            <div className="w-full flex justify-center mt-10">
                <div className="w-[1200px] px-4">
                    <div className="rounded-xl px-8 py-4 flex justify-center gap-10">
                        <button
                            onClick={() => handleCategoryClick()}
                            className={`relative text-lg font-medium transition ${
                                !selectedCategory
                                    ? "text-white"
                                    : "text-gray-400 hover:text-white"
                            }`}
                        >
                            Все
                            {!selectedCategory && (
                                <span className="absolute -bottom-2 left-0 w-full h-[2px] bg-white rounded-full" />
                            )}
                        </button>

                        {categories?.map((cat) => {
                            const isActive =
                                selectedCategory === String(cat.id);

                            return (
                                <button
                                    key={cat.id}
                                    onClick={() =>
                                        handleCategoryClick(cat.id)
                                    }
                                    className={`relative text-lg font-medium transition ${
                                        isActive
                                            ? "text-white"
                                            : "text-gray-400 hover:text-white"
                                    }`}
                                >
                                    {cat.name}
                                    {isActive && (
                                        <span className="absolute -bottom-2 left-0 w-full h-[2px] bg-white rounded-full" />
                                    )}
                                </button>
                            );
                        })}
                    </div>
                </div>
            </div>

            <div className="w-full flex justify-center mt-10">
                <div className="w-[1200px] px-4 grid grid-cols-3 gap-6">
                    {filteredProducts.map((product) => (
                        <Card
                            key={product.id}
                            image={`${
                                product.image
                                    ? APP_ENV.API_IMAGE_MEDIUM_URL
                                    : APP_ENV.API_URL + "/images/"
                            }${
                                product.image
                                    ? product.image
                                    : "noimage.jpg"
                            }`}
                        >
                            <div className="flex flex-col gap-3">
                                <div className="flex justify-between font-medium">
                                    <div>{product.name}</div>
                                    <div>{product.price} ₴</div>
                                </div>

                                {user && (
                                    <Button
                                        size="md"
                                        onClick={() =>
                                            handleAddToCart(product.id)
                                        }
                                    >
                                        {getProductCount(product.id) > 0
                                            ? `В кошику (${getProductCount(
                                                product.id
                                            )})`
                                            : "Додати до кошика"}
                                    </Button>
                                )}
                            </div>
                        </Card>
                    ))}
                </div>
            </div>
        </>
    );
};

export default MenuPage;