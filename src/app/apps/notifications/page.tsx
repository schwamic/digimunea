'use client';

import React, { useState, useEffect } from 'react';
import { Copy, Info, Plus, Share, TriangleAlert } from 'lucide-react';
import { Button, Input, Header, Card } from '@src/app/apps/notifications/_components';
import { useAccount, useApi, usePushService } from '@src/app/apps/notifications/_hooks';
import Markdown from 'markdown-to-jsx/react';

export default function NotificationsPage() {
    const { isSupported, isGranted } = usePushService();
    const { user, isLoading } = useAccount();

    return (
        <div>
            <div className="mb-8 text-pretty">
                <Header className="my-24" />
                {isSupported !== null && !isSupported && !isLoading && (
                    <StatusCard
                        className="mb-6"
                        size="large"
                        data={{
                            message:
                                'Dein Browser unterstützt keine Push-Benachrichtigungen. Verwende einen anderen Browser wie zum Beispiel Firefox, Safari oder Chrome.',
                        }}
                    />
                )}
                {isGranted === 'denied' && !isLoading && (
                    <StatusCard
                        className="mb-6"
                        size="large"
                        data={{
                            message:
                                'Du hast die Berechtigungen für Push-Benachrichtigungen in deinen Browsereinstellungen deaktiviert. Bitte aktiviere sie, um Push-Benachrichtigungen zu erhalten.',
                        }}
                    />
                )}
                {isSupported && !isLoading && !user && <SetupGuide />}
                {isSupported && isGranted === 'granted' && !isLoading && user && (
                    <>
                        <Card className="bg-livid-400 mb-6" size="small">
                            <h3 className="text-2xl font-bold mb-6">Benachrichtigungen</h3>
                            <StatusCard
                                icon="info"
                                data={{
                                    title: 'Noch Funkstille, aber das kann sich schnell ändern ✨',
                                    message:
                                        'Schicke dir eine Testnachricht oder nutze den Beispiel-Code, um dir Benachrichtigungen zu schicken.',
                                }}
                            />
                            {/* TODO: List Push-Notifications */}
                        </Card>
                        <Card className="bg-livid-400" size="small">
                            <h3 className="text-2xl font-bold mb-6">Dein Zugang</h3>
                            <TestingSection className="mb-6" />
                            <SampleSection className="mb-6" />
                            <AccountSection />
                        </Card>
                    </>
                )}
            </div>
        </div>
    );
}

function SetupGuide() {
    const [isStandalone, setIsStandalone] = useState(false);
    const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);

    useEffect(() => {
        setIsStandalone(window.matchMedia('(display-mode: standalone)').matches);
        const handler = (e: Event) => {
            e.preventDefault();
            setDeferredPrompt(e as BeforeInstallPromptEvent);
        };
        window.addEventListener('beforeinstallprompt', handler);
        return () => {
            window.removeEventListener('beforeinstallprompt', handler);
        };
    }, []);

    const promptInstall = async () => {
        if (!deferredPrompt) return;
        await deferredPrompt.prompt();
    };

    return (
        <Card className="bg-livid-400">
            {!isStandalone ? (
                <>
                    <h3 className="text-2xl font-bold mb-4">App installieren</h3>
                    <p>
                        Damit du Push Notifications senden und erhalten kannst, ist es nötig P15Ns als App zu
                        installieren:
                    </p>
                    <Card className="my-4 bg-livid-700 text-livid-100" size="small">
                        <p className="font-bold">Android</p>
                        <Button
                            onClick={promptInstall}
                            className="bg-livid-100 text-livid-700 mt-2 disabled:cursor-not-allowed disabled:opacity-50 w-56"
                            disabled={!deferredPrompt}
                        >
                            App installieren
                        </Button>
                    </Card>
                    <Card className="bg-livid-700 text-livid-100" size="small">
                        <p className="font-bold mb-1">iOS</p>
                        <ol className="list-decimal list-inside">
                            <li>
                                Tippe auf den <span className="italic font-bold">Teilen-Button</span>{' '}
                                <Share className="inline" />.
                            </li>
                            <li>
                                Wähle <span className="italic font-bold">Zum Startbildschirm hinzufügen</span>{' '}
                                <Plus className="inline" /> aus
                            </li>
                        </ol>
                    </Card>
                </>
            ) : (
                <>
                    <h3 className="text-2xl font-bold mb-4">Zugang erstellen</h3>
                    <p className="mb-4">
                        Die Nutzung von P15Ns ist kostenlos und nur für private Hobby-Projekte erlaubt. Mit der
                        Erstellung deines Kontos stimmst du diesen Nutzungsbedingungen zu. Es werden keine weiteren
                        Daten gespeichert!
                    </p>
                    <AccountSection />
                </>
            )}
        </Card>
    );
}

function AccountSection({ className }: React.HTMLAttributes<HTMLDivElement>) {
    const { user, subscribe, unsubscribe, updateChannels } = useAccount();
    const [nickname, setNickname] = useState(user?.nickname || '');
    const [email, setEmail] = useState(user?.email || '');
    const [channel, setChannel] = useState(user?.channels?.[0]?.channel?.name ?? '');
    const [isLoading, setIsLoading] = useState(false);

    async function submit() {
        if (isLoading) return;
        const isNicknameValid = nickname.length > 0;
        const isEmailValid = email.length > 0 && email.includes('@');
        const isChannelValid = channel.length > 0;
        if (!isNicknameValid || !isEmailValid || !isChannelValid) {
            alert('Ups, da stimmt noch nicht alles – schau bitte nochmal drüber 👀');
            return;
        }
        setIsLoading(true);
        if (!user) {
            await subscribe({ nickname, email, channels: [channel] });
        } else {
            await updateChannels(channel);
        }
        setIsLoading(false);
    }

    async function deleteAccount() {
        if (isLoading) return;
        const confirm = window.confirm('Konto löschen? Dramatische Musik setzt ein 🎻');
        if (!confirm) return;
        setIsLoading(true);
        await unsubscribe();
        setIsLoading(false);
    }

    return (
        <Card className={`bg-violet-400 ${className}`} size="small">
            <h3 className="font-bold text-xl mb-4 text-violet-900">Dein Konto</h3>
            <Input
                id="nickname"
                label="*Dein Name"
                labelStyle="text-violet-700"
                inputStyle="mb-3 text-violet-900 bg-livid-100 disabled:cursor-not-allowed disabled:opacity-50"
                type="text"
                disabled={user}
                value={nickname}
                onChange={(e) => setNickname(e.target.value)}
            />
            <Input
                id="email"
                label="*Deine E-Mail-Adresse"
                labelStyle="text-violet-700"
                inputStyle="mb-3 text-violet-900 bg-livid-100 disabled:cursor-not-allowed disabled:opacity-50"
                type="text"
                disabled={user}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <Input
                id="channel"
                label="*Kanal (kann von mehreren Personen verwendet werden)"
                labelStyle="text-violet-700"
                inputStyle="mb-3 text-violet-900 bg-livid-100"
                type="text"
                value={channel}
                onChange={(e) => setChannel(e.target.value)}
            />
            <div className="flex flex-wrap justify-center gap-3 mt-4">
                <Button className="bg-violet-700 text-livid-100 w-56" onClick={submit} disabled={isLoading}>
                    {!user ? 'Kostenlos anmelden' : 'Einstellungen speichern'}
                </Button>
                {user && (
                    <Button className="text-red-500 border-red-500! w-56" onClick={deleteAccount} disabled={isLoading}>
                        Konto löschen
                    </Button>
                )}
            </div>
        </Card>
    );
}

function TestingSection({ className }: React.HTMLAttributes<HTMLDivElement>) {
    const { user } = useAccount();
    const { sendMessage } = useApi();
    const [message, setMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    async function sendTestNotification() {
        if (isLoading) return;
        const isMessageValid = message.length > 0;
        if (!isMessageValid) {
            alert('Bitte gib eine Nachricht ein. Gedankenübertragung ist noch im Beta-Test 😜');
            return;
        }
        setIsLoading(true);
        await sendMessage.mutateAsync({
            title: 'Testnachricht',
            body: message,
            userId: user.id,
            channelId: user.channels[0].channelId,
        });
        setMessage('');
        setIsLoading(false);
    }

    return (
        <Card className={`mb-6 bg-livid-700 flex flex-col items-center ${className}`}>
            <Input
                id="message"
                inputStyle="mb-6 text-livid-800 bg-livid-100"
                type="text"
                placeholder="Enter notification message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
            />
            <Button className="bg-red-400 text-livid-100 w-56" onClick={sendTestNotification} disabled={isLoading}>
                Testnachricht senden
            </Button>
        </Card>
    );
}

function SampleSection({ className }: React.HTMLAttributes<HTMLDivElement>) {
    const { user } = useAccount();
    const sampleCode = `
    #include <WiFi.h>
    #include <HTTPClient.h>
    #include <WiFiManager.h>  // https://github.com/tzapu/WiFiManager

    char* apiUrl = "https://digimunea.de/api/notifications";
    char* userId = "${user?.id}";
    char* channelId = "${user?.channels?.[0]?.channelId}";
    char* title = "Test";
    char* body = "Testbenachrichtigung von deinem IoT-Gerät!";

    void setupWiFi() {}
    void sendData(float moistureVoltage, float moisturePercent, float batteryVoltage) { 
        if (WiFi.status() == WL_CONNECTED) { 
            HTTPClient http; 
            http.begin(apiUrl);
            http.addHeader("Content-Type", "application/json");
            String json = "{";
            json += "\"userId\": \"" + String(userId) + "\",";
            json += "\"channelId\": \"" + String(channelId) + "\",";
            json += "\"title\": \"" + String(title) + "\",";
            json += "\"body\": \"" + String(body) + "\",";
            int httpResponseCode = http.POST(json);
            Serial.println("Response: " + String(httpResponseCode));        
            Serial.println("Payload: " + json);
            http.end();
        } else { 
            Serial.println("WiFi not connected, skipping data send.");
        }
    }`;

    const copyCode = async () => {
        try {
            await navigator.clipboard.writeText(sampleCode);
            alert('Kopiert & einsatzbereit 🚀');
        } catch (error) {
            alert('Oje… Kopieren fehlgeschlagen 😅');
            console.error('Fehler beim Kopieren des Codes:', error);
        }
    };

    return (
        <Card className={`mb-6 bg-livid-700 text-livid-100 ${className}`} size="small">
            <div className="flex justify-between items-start">
                <h3 className="font-bold text-xl mb-4">Beispiel-Code</h3>
                <button type="button" onClick={copyCode}>
                    <Copy className="text-red-400 hover:cursor-pointer" />
                </button>
            </div>
            <div className="mb-6 font-mono text-sm [&_pre]:whitespace-pre-wrap [&_pre]:overflow-x-auto [&_code]:break-words]">
                <Markdown>{sampleCode}</Markdown>
            </div>
            <div className="flex justify-center">
                <Button onClick={copyCode} className="bg-red-400 text-livid-100 w-56">
                    Code kopieren
                </Button>
            </div>
        </Card>
    );
}

function StatusCard({ data, style = 'warning', icon = 'warning', size = 'small', className }: ErrorCardProps) {
    return (
        <Card
            className={`${style === 'info' ? 'bg-livid-700' : 'bg-red-400'} flex items-start ${className}`}
            size={size}
        >
            {icon === 'info' ? (
                <Info strokeWidth={3} className="shrink-0 mt-1 mr-2" />
            ) : (
                <TriangleAlert strokeWidth={3} className="shrink-0 mt-1 mr-2" />
            )}
            <div>
                <p className={`${size === 'small' ? 'text-xl mb-2' : 'text-2xl mb-4'} font-bold`}>
                    {data?.title || 'Schade Marmelade'}
                </p>
                <p>{data.message}</p>
            </div>
        </Card>
    );
}

type ErrorCardProps = Readonly<{
    data: {
        title?: string;
        message: string;
    };
    icon?: 'warning' | 'info';
    style?: 'warning' | 'info';
    size?: 'small' | 'large';
}> &
    React.HTMLAttributes<HTMLDivElement>;

type BeforeInstallPromptEvent = {
    prompt(): Promise<void>;
} & Event;
