import ExternalLink from '@/app/home/_components/ExternalLink';
import Link from 'next/link';
import List from '@/app/home/_components/List';
import { useMemo } from 'react';

export default function Text({ content, className }: TextProps) {
    const isList = useMemo(() => content.every((item) => Array.isArray(item.list)) && content.length === 1, [content]);

    return isList ? (
        <List className={className} items={content[0].list!} />
    ) : (
        <p className={className}>
            {content.map((item, idx) =>
                item.route ? (
                    <Link key={idx} className="underline" href={item.route}>
                        {item.text}
                    </Link>
                ) : item.link ? (
                    <ExternalLink key={idx} link={item.link} text={item.text!} />
                ) : (
                    <span key={idx} className={`${item.styles}`}>
                        {item.text}
                    </span>
                ),
            )}
        </p>
    );
}

type TextProps = Readonly<{
    content: Array<{
        list?: Array<string>;
        text?: string;
        link?: string;
        route?: string;
        styles?: string;
    }>;
}> &
    React.HTMLAttributes<HTMLParagraphElement>;
