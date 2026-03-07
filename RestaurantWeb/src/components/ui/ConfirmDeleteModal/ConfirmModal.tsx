import { Button } from "..";

const ConfirmModal = ({text, onConfirm, onClose}: any) => {

    return (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">

            <div className="bg-[#1E1E1E] p-6 rounded-2xl w-[350px]">

                <h2 className="text-lg mb-6">
                    {text}
                </h2>

                <div className="flex justify-between gap-3">

                    <Button
                        onClick={onClose}
                        variant="secondary"
                        size="md"
                        className="w-1/2"
                    >
                        Скасувати
                    </Button>

                    <Button
                        onClick={onConfirm}
                        variant="primary"
                        className="bg-red-500 hover:bg-red-600 w-1/2"
                        size="md"
                    >
                        Видалити
                    </Button>

                </div>

            </div>

        </div>
    );
};

export default ConfirmModal;