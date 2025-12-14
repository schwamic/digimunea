export default async function SubdomainPage({ params }: SubdomainPageProps) {
    const { subdomain } = await params;
    const apps: Record<string, { name: string }> = {
        notifications: { name: 'Push Notifications App' },
    };

    return (
        <div className="flex justify-center">
            <h1 className="font-mono text-2xl font-bold">Welcome to {apps[subdomain]?.name}</h1>
        </div>
    );
}

type SubdomainPageProps = {
    params: { subdomain: string };
};
