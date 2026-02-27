import clsx from "clsx";

interface CardProps {
    image: string;
    imageAlt?: string;
    children?: React.ReactNode;
    className?: string;
    onClick?: () => void;
}

export const Card: React.FC<CardProps> = ({image, imageAlt, children, className, onClick}) => {
    return (
        <div
            onClick={onClick}
            className={clsx(
                "bg-[#1E1E1E] w-[300px] rounded-3xl rounded-bl-lg p-4 transition-all duration-300",
                "hover:scale-[1.01] cursor-pointer",
                className
            )}
        >
            <div className="rounded-2xl overflow-hidden mb-4">
                <img
                    src={image}
                    alt={imageAlt}
                    className="w-full h-48 object-cover"
                />
            </div>

            <div className={"text-white"}>
                {children}
            </div>
        </div>
    );
};