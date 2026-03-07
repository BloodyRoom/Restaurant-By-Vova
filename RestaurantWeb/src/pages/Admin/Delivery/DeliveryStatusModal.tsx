import {useState} from "react";
import {useDeliveryUpdateMutation} from "../../../services/apiDelivery";
import {Button} from "../../../components/ui";

const DeliveryStatusModal = ({delivery, onClose}: any) => {

    const [update] = useDeliveryUpdateMutation();

    const [status, setStatus] = useState(delivery.status);

    const handleSave = async () => {

        await update({
            id: delivery.id,
            status
        });

        onClose();
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
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">

            <div className="bg-[#1E1E1E] w-[400px] p-6 rounded-2xl">

                <h2 className="text-xl font-bold mb-4">
                    Змінити статус доставки
                </h2>

                <select
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                    className="w-full bg-[#2a2a2a] p-2 rounded"
                >

                    <option value="Created">
                        {getStatusName("Created")}
                    </option>

                    <option value="Delivering">
                        {getStatusName("Delivering")} 
                    </option>

                    <option value="Completed">
                        {getStatusName("Completed")}
                    </option>

                    <option value="Cancelled">
                        {getStatusName("Cancelled")} 
                    </option>

                </select>

                <div className="flex justify-end gap-3 mt-6">

                    <Button
                        variant="secondary"
                        onClick={onClose}
                        size="md"
                    >
                        Скасувати
                    </Button>

                    <Button
                        variant="primary"
                        onClick={handleSave}
                        size="md"
                    >
                        Зберегти
                    </Button>

                </div>

            </div>

        </div>
    );
};

export default DeliveryStatusModal;