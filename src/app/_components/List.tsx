export default function List({ items, className }: ListProps) {
    return (
        <ul className={`list-disc list-inside ${className}`}>
            {items.map((item, idx) => (
                <li key={idx}>{item}</li>
            ))}
        </ul>
    );
}

type ListProps = Readonly<{
    items: string[];
}> &
    React.HTMLAttributes<HTMLUListElement>;
