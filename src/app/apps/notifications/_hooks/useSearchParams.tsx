import { useEffect, useState } from 'react';

export default function useSearchParams() {
    const [searchParams, setSearchParams] = useState<URLSearchParams>(new URLSearchParams());

    useEffect(() => {
        const onChange = () => {
            const query = new URLSearchParams(window.location.search);
            setSearchParams(query);
        };
        onChange();
        window.addEventListener('focus', onChange);
        window.addEventListener('popstate', onChange);
        return () => {
            window.removeEventListener('focus', onChange);
            window.removeEventListener('popstate', onChange);
        };
    }, []);

    return searchParams;
}
