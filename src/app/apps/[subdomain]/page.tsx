import {notFound} from 'next/navigation';

interface Props {
    params: { subdomain: string };
}

export default async function SubdomainPage({params}: Props) {
    const { subdomain } = await params;
    const apps: Record<string, { name: string }> = {
        "push": { name: 'Push Notifications App' },
    };
 
    const workspace = apps[subdomain] || null;

    if (!workspace) {
        return notFound();
    }

    return (
        <main className="flex justify-center">
            <h1 className="font-mono text-2xl font-bold">Welcome to {workspace.name}</h1>
        </main>
    );
}
