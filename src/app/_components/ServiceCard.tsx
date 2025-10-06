import { useMemo } from 'react';
import Card from '@/app/_components/Card';
import Text from '@/app/_components/Text';

export default function ServiceCard({ title, description, symbol, style }: ServiceCardProps) {
    const isMono = useMemo(() => style === 'mono', [style]);

    return (
        <Card className={`box-border inline-block w-full ${isMono ? 'font-mono' : 'font-sans-monolike'}`}>
            <h3 className={`mb-4 ${isMono ? 'text-2xl' : 'text-2xl-monolike'}`}>{title}</h3>
            {/* @ts-expect-error literal object types */}
            <Text className={`${isMono ? 'text-lg' : 'text-lg-monolike'}`} content={description} />
            <div className={`float-right mt-1 -mb-2 ${symbol} scale-50`} />
        </Card>
    );
}

type ServiceCardProps = Readonly<{
    title: string;
    description: Array<{
        list?: Array<string>;
        text?: string;
        link?: string;
        route?: string;
        styles?: string;
    }>;
    symbol: 'circle' | 'square' | 'triangle';
    style: 'mono' | 'sans';
}> &
    React.HTMLAttributes<HTMLDivElement>;
