import {useState} from "react";
import {
    useProductCreateMutation,
    useProductUpdateMutation
} from "../../../services/apiProduct";
import {Button, Input} from "../../../components/ui";

const ProductModal = ({product, categories, onClose}: any) => {

    const [create] = useProductCreateMutation();
    const [update] = useProductUpdateMutation();

    const [name, setName] = useState(product?.name ?? "");
    const [description, setDescription] = useState(product?.description ?? "");
    const [price, setPrice] = useState(product?.price ?? 0);
    const [categoryId, setCategoryId] = useState(product?.category?.id ?? 0);
    const [image, setImage] = useState<File | null>(null);

    const handleSubmit = async () => {

        const model = {
            id: product?.id,
            name,
            description,
            price: Number(price),
            categoryId,
            image
        };

        if (product) {
            await update(model);
        } else {
            await create(model);
        }

        onClose();
    };

    return (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">

            <div className="bg-[#1E1E1E] w-[450px] p-6 rounded-2xl">

                <h2 className="text-xl font-bold mb-4">
                    {product ? "Редагувати" : "Створити"} продукт
                </h2>

                <div className="flex flex-col gap-3">

                    <Input
                        placeholder="Назва"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />

                    <Input
                        placeholder="Опис"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />

                    <Input
                        type="number"
                        placeholder="Ціна"
                        value={price}
                        onChange={(e) => setPrice(Number(e.target.value))}
                    />

                    <select
                        value={categoryId}
                        onChange={(e) => setCategoryId(Number(e.target.value))}
                        className="bg-[#2a2a2a] p-2 rounded"
                    >
                        <option value={0}>
                            Оберіть категорію
                        </option>

                        {categories?.map((c: any) => (
                            <option key={c.id} value={c.id}>
                                {c.name}
                            </option>
                        ))}

                    </select>

                    <Input
                        type="file"
                        onChange={(e) => setImage(e.target.files?.[0] ?? null)}
                    />

                </div>

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
                        {product ? "Зберегти" : "Створити"}
                    </Button>

                </div>

            </div>

        </div>
    );
};

export default ProductModal;