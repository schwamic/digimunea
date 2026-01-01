import { useEffect, useState } from 'react';

export default function useSearchParams() {
    const [searchParams, setSearchParams] = useState<URLSearchParams | null>(null);

    useEffect(() => {
        const onChange = () => {
            const query = new URLSearchParams(window.location.search);
            setSearchParams(query);
        };
        window.addEventListener('popstate', onChange);
        return () => window.removeEventListener('popstate', onChange);
    }, []);

    return searchParams;
}
