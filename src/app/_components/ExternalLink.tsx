import { ExternalLink as Icon } from 'lucide-react';

export default function ExternalLink({ text, link }: ExternalLinkProps) {
    return (
        <a className="underline" href={link} target="_blank" rel="noopener noreferrer">
            {text}
            <Icon className="inline size-3 ml-0.5" />
        </a>
    );
}

type ExternalLinkProps = Readonly<{
    text: string;
    link: string;
}> &
    React.HTMLAttributes<HTMLAnchorElement>;
