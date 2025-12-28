export default function Header({ className }: React.HTMLAttributes<HTMLDivElement>) {
    return (
        <div className={`flex flex-col sm:flex-row items-center justify-center gap-5 ${className}`}>
            <div className="bg-livid-700 w-20 h-20 rounded-lg text-red-400 font-black">APP_ICON</div>
            <div>
                <h1 className="text-4xl font-bold text-livid-700">
                    {content.long}
                    <br />
                    <span className="font-medium">[{content.short}]</span>
                </h1>
            </div>
        </div>
    );
}

const content = {
    long: 'Push Notifications',
    short: 'P15Ns',
};
