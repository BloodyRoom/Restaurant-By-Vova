import {useState} from "react";
import {
    useGetAllDeliveriesQuery,
    useDeliveryDeleteMutation
} from "../../../services/apiDelivery";

import {Button} from "../../../components/ui";
import DeliveryStatusModal from "./DeliveryStatusModal";
import ConfirmModal from "../../../components/ui/ConfirmDeleteModal/ConfirmModal";

const DeliveryAdminPage = () => {

    const {data: deliveries} = useGetAllDeliveriesQuery();
    const [deleteDelivery] = useDeliveryDeleteMutation();

    const [editDelivery, setEditDelivery] = useState<any>(null);
    const [deleteId, setDeleteId] = useState<number | null>(null);

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
        <div className="p-8 text-white">

            <h1 className="text-3xl font-bold mb-8">
                Керування доставками
            </h1>

            <div className="overflow-x-auto">

                <table className="w-full bg-[#1E1E1E] rounded-xl overflow-hidden">

                    <thead className="bg-[#2a2a2a]">
                        <tr>

                            <th className="p-3 text-left">ID</th>
                            <th className="p-3 text-left">Користувач</th>
                            <th className="p-3 text-left">Адреса</th>
                            <th className="p-3 text-left">Товари</th>
                            <th className="p-3 text-left">Статус</th>
                            <th className="p-3 text-left">Дії</th>

                        </tr>
                    </thead>

                    <tbody>

                        {deliveries?.map(delivery => (

                            <tr
                                key={delivery.id}
                                className="border-t border-[#333]"
                            >

                                <td className="p-3">
                                    #{delivery.id}
                                </td>

                                <td className="p-3">
                                    {delivery.user.email}
                                </td>

                                <td className="p-3">
                                    {delivery.address}
                                </td>

                                <td className="p-3">

                                    <div className="flex flex-col gap-1">

                                        {delivery.products.map(p => (
                                            <span key={p.product.id}>
                                                {p.product.name} × {p.count}
                                            </span>
                                        ))}

                                    </div>

                                </td>

                                <td className="p-3">

                                    <div
                                        className={`px-3 py-1 rounded-full text-sm font-medium w-fit ${getStatusColor(delivery.status)}`}
                                    >
                                        {getStatusName(delivery.status)}
                                    </div>

                                </td>

                                <td className="p-3 flex gap-2">

                                    <Button
                                        size="sm"
                                        variant="secondary"
                                        onClick={() => setEditDelivery(delivery)}
                                    >
                                        Статус
                                    </Button>

                                    <Button
                                        size="sm"
                                        variant="secondary"
                                        className="bg-red-500 hover:bg-red-600"
                                        onClick={() => setDeleteId(delivery.id)}
                                    >
                                        Видалити
                                    </Button>

                                </td>

                            </tr>

                        ))}

                    </tbody>

                </table>

            </div>

            {editDelivery && (
                <DeliveryStatusModal
                    delivery={editDelivery}
                    onClose={() => setEditDelivery(null)}
                />
            )}

            {deleteId && (
                <ConfirmModal
                    text={`Видалити доставку #${deleteId}?`}
                    onConfirm={async () => {
                        await deleteDelivery(deleteId);
                        setDeleteId(null);
                    }}
                    onClose={() => setDeleteId(null)}
                />
            )}

        </div>
    );
};

export default DeliveryAdminPage;