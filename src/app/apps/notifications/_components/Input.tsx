export default function Input({ className, ...props }: React.InputHTMLAttributes<HTMLInputElement>) {
    return <input className={`border-2 border-amber-100 rounded-md px-2 w-full ${className}`} {...props} />;
}
