export default function Button({ children, className, ...props }: React.ButtonHTMLAttributes<HTMLButtonElement>) {
    return (
        <button
            className={`bg-amber-800 text-sm rounded-lg px-3 py-1.5 font-bold cursor-pointer hover:bg-amber-900 ${className}`}
            {...props}
        >
            {children}
        </button>
    );
}
