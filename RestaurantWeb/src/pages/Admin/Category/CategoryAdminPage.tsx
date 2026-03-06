import {useState} from "react";
import {
    useGetCategoriesQuery,
    useCategoryDeleteMutation
} from "../../../services/apiCategory";
import { Button, Card } from "../../../components/ui";
import CategoryModal from "./CategoryModal";
import ConfirmModal from "./ConfirmModal";
import APP_ENV from "../../../env";

const CategoryAdminPage = () => {

    const {data: categories} = useGetCategoriesQuery();
    const [deleteCategory] = useCategoryDeleteMutation();

    const [modalOpen, setModalOpen] = useState(false);
    const [editCategory, setEditCategory] = useState<any>(null);

    const [deleteId, setDeleteId] = useState<number | null>(null);

    return (
        <div className="p-8 text-white">

            <div className="flex items-center mb-8 gap-5">

                <h1 className="text-3xl font-bold">
                    Керування категоріями
                </h1>

                <Button
                    onClick={() => {
                        setEditCategory(null);
                        setModalOpen(true);
                    }}
                    
                >
                    + Створити
                </Button>

            </div>

            <div className="flex flex-wrap gap-6">

                {categories?.map(category => (

                    <Card
                        key={category.id}
                        image={`${
                            category.image
                                ? APP_ENV.API_IMAGE_MEDIUM_URL
                                : APP_ENV.API_URL + "/images/"
                            }${category.image ? category.image : "noimage.jpg"}`}
                    >

                        <h2 className="text-xl font-semibold mb-4">
                            {category.name}
                        </h2>

                        <div className="flex gap-2">

                            <Button
                                onClick={() => {
                                    setEditCategory(category);
                                    setModalOpen(true);
                                }}
                                variant="secondary"
                                size="md"
                                className="w-1/2"
                            >
                                Редагувати
                            </Button>

                            <Button
                                onClick={() => setDeleteId(category.id)}
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
                <CategoryModal
                    category={editCategory}
                    onClose={() => setModalOpen(false)}
                />
            )}

            {deleteId && (
                <ConfirmModal
                    text={`Видалити категорію "${categories?.find(c => c.id === deleteId)?.name}"?`}
                    onConfirm={async () => {
                        await deleteCategory(deleteId);
                        setDeleteId(null);
                    }}
                    onClose={() => setDeleteId(null)}
                />
            )}

        </div>
    );
};

export default CategoryAdminPage;