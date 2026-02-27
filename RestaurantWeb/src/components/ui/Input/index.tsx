import clsx from "clsx";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    error?: string;
}

export const Input: React.FC<InputProps> = ({label, error, className, ...props}) => {
    return (
        <div className="w-full space-y-2">
            {label && (
                <label className="text-white text-lg font-medium">
                    {label}
                </label>
            )}

            <input
                className={clsx(
                    "w-full px-4 py-3 rounded-xl",
                    "bg-[#5E5E5E]/20 backdrop-blur-xl",
                    "border border-white/10",
                    "text-white placeholder-white/40",
                    "outline-none transition-all duration-200",
                    "focus:border-[#FF6B35] focus:ring-2 focus:ring-[#FF6B35]/30",
                    className
                )}
                {...props}
            />

            {error && (
                <p className="text-red-400 text-sm">{error}</p>
            )}
        </div>
    );
};