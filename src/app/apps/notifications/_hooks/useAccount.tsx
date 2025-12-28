import { useEffect, useState } from 'react';
import { useApi, usePushService } from '@src/app/apps/notifications/_hooks';
import { CreateUser } from '@src/app/api/notifications/route';

export default function useAccount() {
    const { useUser, createUser, removeUser, updateUser } = useApi();
    const { unsubscribePushService, subscribePushService } = usePushService();
    const [storedUserId, setStoredUserId] = useState<string | null>(null);
    const { data: user, error, isLoading, refetch } = useUser(storedUserId);

    useEffect(() => {
        const userId = localStorage.getItem('userId');
        setStoredUserId(userId);
    }, []);

    useEffect(() => {
        if (!user && storedUserId !== null) {
            refetch();
        }
    }, [storedUserId]);

    async function subscribe({ nickname, email, channels }: CreateUser) {
        const subscription = await subscribePushService();
        if (!subscription) return;
        const userData = {
            nickname,
            email,
            subscription,
            channels,
        };
        console.log('Creating user with data:', userData);
        const response = await createUser.mutateAsync(userData);
        if (response.success) {
            const createdUser = response.user;
            setStoredUserId(createdUser.id);
            localStorage.setItem('userId', createdUser.id);
        }
    }

    async function updateChannels(channel: string) {
        await updateUser.mutateAsync({
            id: user.id,
            channels: [channel],
        });
    }

    async function unsubscribe() {
        await unsubscribePushService();
        await removeUser.mutateAsync(user.id);
        localStorage.removeItem('userId');
        setStoredUserId(null);
    }

    return { user, error, isLoading, updateChannels, subscribe, unsubscribe };
}
