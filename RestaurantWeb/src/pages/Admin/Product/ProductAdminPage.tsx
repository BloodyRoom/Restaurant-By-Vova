import {useState} from "react";
import {
    useGetProductsQuery,
    useProductDeleteMutation
} from "../../../services/apiProduct";
import {useGetCategoriesQuery} from "../../../services/apiCategory";
import {Button, Card} from "../../../components/ui";
import ProductModal from "./ProductModal";
import ConfirmModal from "../../../components/ui/ConfirmDeleteModal/ConfirmModal";
import APP_ENV from "../../../env";

const ProductAdminPage = () => {

    const {data: products} = useGetProductsQuery();
    const {data: categories} = useGetCategoriesQuery();

    const [deleteProduct] = useProductDeleteMutation();

    const [modalOpen, setModalOpen] = useState(false);
    const [editProduct, setEditProduct] = useState<any>(null);

    const [deleteId, setDeleteId] = useState<number | null>(null);

    return (
        <div className="p-8 text-white">

            <div className="flex items-center mb-8 gap-5">

                <h1 className="text-3xl font-bold">
                    Керування продуктами
                </h1>

                <Button
                    onClick={() => {
                        setEditProduct(null);
                        setModalOpen(true);
                    }}
                >
                    + Створити
                </Button>

            </div>

            <div className="flex flex-wrap gap-6">

                {products?.map(product => (

                    <Card
                        key={product.id}
                        image={`${
                            product.image
                                ? APP_ENV.API_IMAGE_MEDIUM_URL
                                : APP_ENV.API_URL + "/images/"
                        }${product.image ? product.image : "noimage.jpg"}`}
                    >

                        <h2 className="text-xl font-semibold mb-1">
                            {product.name}
                        </h2>

                        <p className="text-sm opacity-70 mb-2">
                            {product.category.name}
                        </p>

                        <p className="mb-4 font-semibold">
                            {product.price} ₴
                        </p>

                        <div className="flex gap-2">

                            <Button
                                onClick={() => {
                                    setEditProduct(product);
                                    setModalOpen(true);
                                }}
                                variant="secondary"
                                size="md"
                                className="w-1/2"
                            >
                                Редагувати
                            </Button>

                            <Button
                                onClick={() => setDeleteId(product.id)}
                                variant="secondary"
                                size="md"
                                className="w-1/2 bg-red-500 hover:bg-red-600"
                            >
                                Видалити
                            </Button>

                        </div>

                    </Card>

                ))}

            </div>

            {modalOpen && (
                <ProductModal
                    product={editProduct}
                    categories={categories}
                    onClose={() => setModalOpen(false)}
                />
            )}

            {deleteId && (
                <ConfirmModal
                    text={`Видалити продукт "${products?.find(p => p.id === deleteId)?.name}"?`}
                    onConfirm={async () => {
                        await deleteProduct(deleteId);
                        setDeleteId(null);
                    }}
                    onClose={() => setDeleteId(null)}
                />
            )}

        </div>
    );
};

export default ProductAdminPage;