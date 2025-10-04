export default function ServiceCard({title, description, symbol, style = "sans"}: ServiceCardProps) {
    return (
        <div className={`box-border inline-block w-full p-6 rounded-3xl bg-black ${style === "mono" ? "font-mono" : "font-sans"}`}>
            <h3 className="text-2xl mb-4">{title}</h3>
            {Array.isArray(description) ? 
            <ul className="list-disc list-inside text-lg">{description.map((item, idx) => <li key={idx}>{item}</li>)}</ul> : <p className="text-lg">{description}</p>}
            {symbol &&<div className={`float-right mt-1 -mb-2 ${symbol} scale-50`} />}
        </div>
    )
}

interface ServiceCardProps {
    title: string,
    description: string | string[],
    symbol: "circle" | "square" | "triangle",
    style?: "mono" | "sans"
}
