import clsx from "clsx";

import Arrow from "../../../assets/icons/arrow-up-right.svg?react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: "primary" | "primary-link" | "secondary" | "secondary-link" | "none";
    size?: "sm" | "md" | "lg";
}

export const Button: React.FC<ButtonProps> = ({variant = "primary", size = "lg", className, children, ...props}) => {
    return (
        <button
            className={clsx(
                "rounded-full transition-all cursor-pointer font-bold",
                {
                    "bg-[#FF6B35] text-white hover:bg-[#FF6B35]/70 backdrop-blur-xl": variant === "primary" || variant === "primary-link",
                    "bg-[#5E5E5E]/20 text-white hover:bg-[#5E5E5E]/50 border-2 border-[#FFFFFF]/10 backdrop-blur-xl": variant === "secondary" || variant === "secondary-link",
                    "bg-transparent text-white hover:bg-[#5E5E5E]/50": variant === "none",

                    "px-3 py-1 text-sm": size === "sm",
                    "px-4 py-2 text-base": size === "md",
                    "px-6 py-3 text-lg": size === "lg",
                },
                className
            )}
            {...props}
        >
            <div className={clsx(
                "flex items-center justify-between w-full",
                {
                    "gap-1": size === "sm",
                    "gap-2": size === "md",
                    "gap-3": size === "lg",
                })
            }>
                {children}

                {(variant === "primary-link" || variant === "secondary-link") && (
                    <div>
                        <Arrow className={clsx({
                            "scale-75": size === "sm",
                            "scale-90": size === "md",
                            "scale-100": size === "lg",
                        })}/>
                    </div>
                )}
            </div>
        </button>
    );
};