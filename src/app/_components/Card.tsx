export default function Card({children, className, ...rest}: React.HTMLAttributes<HTMLDivElement>) {
    return (
        <div className={`p-6 rounded-3xl bg-black ${className}`} {...rest}>
            {children}
        </div>
    )
}
