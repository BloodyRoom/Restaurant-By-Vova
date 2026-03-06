import {useState} from "react";
import {
    useCategoryCreateMutation,
    useCategoryUpdateMutation
} from "../../../services/apiCategory";
import { Button, Input } from "../../../components/ui";

const CategoryModal = ({category, onClose}: any) => {

    const [create] = useCategoryCreateMutation();
    const [update] = useCategoryUpdateMutation();

    const [name, setName] = useState(category?.name ?? "");
    const [image, setImage] = useState<File | null>(null);

    const handleSubmit = async () => {

        if (category) {
            await update({
                id: category.id,
                name,
                image
            });
        } else {
            await create({
                name,
                image
            });
        }

        onClose();
    };

    return (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">

            <div className="bg-[#1E1E1E] w-[400px] p-6 rounded-2xl">

                <h2 className="text-xl font-bold mb-4">
                    {category ? "Редагувати" : "Створити"} категорію
                </h2>

                <Input
                    className="w-full mb-4 p-2 rounded bg-[#2a2a2a]"
                    placeholder="Назва"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />

                <Input
                    type="file"
                    onChange={(e) => setImage(e.target.files?.[0] ?? null)}
                />

                <div className="flex justify-end gap-3 mt-6">

                    <Button
                        onClick={onClose}
                        variant="secondary"
                        size="md"
                    >
                        Скасувати
                    </Button>

                    <Button
                        onClick={handleSubmit}
                        variant="primary"
                        size="md"
                    >
                        {category ? "Зберегти" : "Створити"}
                    </Button>

                </div>

            </div>

        </div>
    );
};

export default CategoryModal;