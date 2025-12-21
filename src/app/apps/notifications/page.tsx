'use client';

import { useState, useEffect, useMemo } from 'react';
import { Share, Plus, CircleAlert, Megaphone, Github } from 'lucide-react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Button from '@src/app/apps/notifications/_components/Button';
import Input from '@src/app/apps/notifications/_components/Input';
import useApi from '@src/lib/hooks/useApi';

function urlBase64ToUint8Array(base64String: string) {
    const padding = '='.repeat((4 - (base64String.length % 4)) % 4);
    const base64 = (base64String + padding).replace(/-/g, '+').replace(/_/g, '/');
    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);
    for (let i = 0; i < rawData.length; ++i) {
        outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
}

function PushNotificationManager() {
    const { useUser, createUser, removeUser, sendMessage } = useApi();
    const [userId, setUserId] = useState<string | null>(null);
    const { data: user, isLoading, error } = useUser(userId);
    const [isSupported, setIsSupported] = useState(false);
    const [isGranted, setIsGranted] = useState<NotificationPermission>('default');
    const [message, setMessage] = useState('');
    const [nickname, setNickname] = useState('');
    const [email, setEmail] = useState('');
    const [channel, setChannel] = useState('');

    useEffect(() => {
        const isSupported = 'serviceWorker' in navigator && 'PushManager' in window && 'Notification' in window;
        setIsSupported(isSupported);
        if (isSupported) {
            const permission = Notification.permission;
            setIsGranted(permission);
        }
        const userId = localStorage.getItem('userId');
        setUserId(userId);
    }, []);

    async function initPushNotifications() {
        console.log('Push Notification supported:', isSupported);
        console.log('Notification permission:', isGranted);
        if (isGranted === 'default') {
            const permission = await Notification.requestPermission();
            setIsGranted(permission);
        }
        if (isGranted !== 'granted' || !isSupported) {
            console.log('Push notifications not granted or supported.');
            return;
        }
        const registration = await navigator.serviceWorker.register('/sw.js', {
            scope: '/',
            updateViaCache: 'none',
        });
        console.log('SW ready:', registration.active);
        const subscription = await registration.pushManager.subscribe({
            userVisibleOnly: true,
            applicationServerKey: urlBase64ToUint8Array(process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY!),
        });
        const serializedSub = JSON.parse(JSON.stringify(subscription));
        console.log('Push Subscription:', serializedSub);
        return serializedSub;
    }

    async function subscribe() {
        const serializedSub = await initPushNotifications();
        if (!serializedSub) return;
        const userData = {
            nickname,
            email,
            subscription: serializedSub,
            channels: [channel],
        };
        console.log('Creating user with data:', userData);
        const response = await createUser.mutateAsync(userData);
        if (response.success) {
            const createdUser = response.user;
            setUserId(createdUser.id);
            localStorage.setItem('userId', createdUser.id);
        }
    }

    async function unsubscribe() {
        const registration = await navigator.serviceWorker.ready;
        const subscription = await registration.pushManager.getSubscription();
        await subscription?.unsubscribe();
        await removeUser.mutateAsync(userId!);
        localStorage.removeItem('userId');
        setUserId(null);
    }

    async function sendTestNotification() {
        if (user && user.subscription && message.length > 0) {
            await sendMessage.mutateAsync({
                title: 'Test Notification',
                body: 'TEST TEST TEST! If you see this, push notifications are working.',
                userId: user.id,
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                channelId: user.channels.find((c: any) => c.channel.name === channel)?.channel.id || null,
            });
            setMessage('');
        }
    }

    return (
        <div className="text-lg mb-8 text-pretty">
            <div className="flex items-center mb-8">
                <h1 className="text-4xl font-bold mr-2">Push Notifications</h1>
                <Megaphone size={32} />
            </div>
            {!isSupported || isGranted === 'denied' ? (
                <div className="bg-red-800 font-medium rounded-lg p-6 flex items-start">
                    <CircleAlert className="mr-3 shrink-0 mt-0.5" />
                    <p>
                        Your browser does not support push notifications or has no permission to send them. Please try
                        to enable notifications in your browser settings.
                    </p>
                </div>
            ) : (
                <div className="border-2 border-amber-100 p-6 rounded-lg">
                    <h3 className="text-2xl font-bold mb-4">Subscription</h3>
                    {user && user.subscription ? (
                        <>
                            <div className="mb-6">
                                <p>You are subscribed to push notifications.</p>
                                <div className="flex flex-wrap break-all bg-amber-100 rounded-lg p-3 mt-2 text-black">
                                    {user.nickname} | {user.email}
                                </div>
                            </div>
                            <div className="mb-6">
                                <Input
                                    required
                                    className="mb-3"
                                    type="text"
                                    placeholder="Enter notification message"
                                    value={message}
                                    onChange={(e) => setMessage(e.target.value)}
                                />
                                <Button className="mt-1" onClick={sendTestNotification}>
                                    Send Test
                                </Button>
                            </div>
                            <div className="mb-6">
                                <Input
                                    required
                                    className="mb-3"
                                    type="text"
                                    placeholder="Channel to join (optional)"
                                    value={channel}
                                    onChange={(e) => setChannel(e.target.value)}
                                />
                                <Button className="mt-1" onClick={sendTestNotification}>
                                    Join Channel
                                </Button>
                            </div>
                            <div>
                                <p>To unsubscribe from push notifications, click the button below:</p>
                                <Button className="mt-2" onClick={unsubscribe}>
                                    Unsubscribe
                                </Button>
                            </div>
                        </>
                    ) : (
                        <>
                            <p className="mb-3 text-pretty">
                                Fill in the following fields to subscribe to push notifications:
                            </p>
                            <Input
                                required
                                className="mb-3"
                                type="text"
                                placeholder="Enter your nickname"
                                value={nickname}
                                onChange={(e) => setNickname(e.target.value)}
                            />
                            <Input
                                required
                                className="mb-3"
                                type="text"
                                placeholder="Enter your email address"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            <Input
                                required
                                className="mb-3"
                                type="text"
                                placeholder="Enter your channel (optional)"
                                value={channel}
                                onChange={(e) => setChannel(e.target.value)}
                            />
                            <Button className="mt-1" onClick={subscribe}>
                                Subscribe
                            </Button>
                        </>
                    )}
                </div>
            )}
        </div>
    );
}

function InstallPrompt() {
    const [isIOS, setIsIOS] = useState(false);
    const [isStandalone, setIsStandalone] = useState(false);

    useEffect(() => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        setIsIOS(/iPad|iPhone|iPod/.test(navigator.userAgent) && !(window as any).MSStream);
        setIsStandalone(window.matchMedia('(display-mode: standalone)').matches);
    }, []);

    if (isStandalone) {
        return null; // Don't show install button if already installed
    }

    return (
        <div className="bg-amber-600 p-6 rounded-lg text-lg font-medium text-pretty">
            <h3 className="text-2xl font-bold mb-4">Install App</h3>
            <p>To setup push notifactions, you need to install this tiny app:</p>
            <div className="my-4">
                <p className="font-bold">Android</p>
                <Button className="bg-amber-700 mt-1">Add to Home Screen</Button>
            </div>
            <div>
                <p className="font-bold">iOS</p>
                <p>
                    Tap the <span className="italic">Share Button</span> <Share className="inline" /> and then click on{' '}
                    <span className="italic">Add to Home Screen</span> <Plus className="inline" />.
                </p>
            </div>
        </div>
    );
}

const queryClient = new QueryClient();

export default function NotificationPage() {
    return (
        <QueryClientProvider client={queryClient}>
            <PushNotificationManager />
            <InstallPrompt />
            <div className="my-16 text-center">
                <a
                    className="text-shadow-amber-50 underline"
                    href="https://github.com/schwamic/digimunea/tree/main/src/app/apps"
                    target="_blank"
                >
                    P15Ns on Github <Github className="inline ml-1" />
                </a>
            </div>
        </QueryClientProvider>
    );
}
