import { useEffect, useState } from 'react';
import { useApi, usePushService } from '@src/app/apps/notifications/_hooks';
import { CreateUser } from '@src/app/api/notifications/route';

export default function useAccount() {
    const { useUser, createUser, removeUser, updateUser } = useApi();
    const { unsubscribePushService, subscribePushService } = usePushService();
    const [storedUserRef, setStoredUserRef] = useState<string | null>(null);
    const { data: user, error, isLoading, refetch } = useUser(storedUserRef);

    useEffect(() => {
        const userRef = localStorage.getItem('userRef');
        setStoredUserRef(userRef);
    }, []);

    useEffect(() => {
        if (!user && storedUserRef !== null) {
            refetch();
        }
    }, [storedUserRef]);

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
            setStoredUserRef(createdUser.email);
            localStorage.setItem('userRef', createdUser.email);
        }
    }

    async function updateChannels(channel: string) {
        await updateUser.mutateAsync({
            userRef: user.email,
            channels: [channel],
        });
    }

    async function unsubscribe() {
        await unsubscribePushService();
        await removeUser.mutateAsync(user.email);
        localStorage.removeItem('userRef');
        setStoredUserRef(null);
    }

    return { user, error, isLoading, updateChannels, subscribe, unsubscribe };
}
