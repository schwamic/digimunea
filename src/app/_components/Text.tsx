import ExternalLink from "@/app/_components/ExternalLink";
import Link from "next/link";

export default function Text({content, className}: TextProps) {
    return (
        <p className={className}>
            {content.map((item, idx) => {
                if (item.route) {
                    return <Link key={idx} className="underline" href={item.route}>{item.text}</Link>;
                } else if (item.link) {
                    return <ExternalLink key={idx} link={item.link} text={item.text} />;
                } else {
                    return <span key={idx} className={item.color ?? ""}>{item.text}</span>;
                }
            })}
        </p>
    )
}

type TextProps = Readonly<{
    content: Array<{
        text: string;
        link?: string;
        route?: string;
        color?: string;
    }>
}> & React.HTMLAttributes<HTMLParagraphElement>;
