export default function Header({title, subtitle, size = 'small', }: HeaderProps) {
    return (
        <header className="flex flex-col items-center space-y-4">
            <h1 className={`font-header ${size === 'large' ? 'text-8xl' : 'text-6xl'}`}>{title}</h1>
            {subtitle && <h2 className="text-xl text-stone-400">{subtitle[0].text} <span className="text-sm">{subtitle[1].text}</span></h2>}
        </header>
    )
}

interface HeaderProps {
    title: string,
    subtitle?: {text: string}[],
    size?: 'small' | 'large',
}
