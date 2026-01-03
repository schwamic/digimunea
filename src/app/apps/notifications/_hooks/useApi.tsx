import { NewUser, UserMessage, UpdateUser } from '@src/app/api/notifications/route';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

const URL_API_NOTIFICATIONS = '/api/notifications';

export default function useApi() {
    const queryClient = useQueryClient();

    const useUser = (userRef: string | null) => {
        return useQuery({
            queryKey: ['user'],
            queryFn: () => fetch(`${URL_API_NOTIFICATIONS}?userRef=${userRef}`).then(handleResponse),
            enabled: !!userRef,
            refetchInterval: 2000,
        });
    };

    const upsertUser = useMutation({
        mutationFn: (newUser: NewUser | UpdateUser) =>
            fetch(URL_API_NOTIFICATIONS, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newUser),
            }).then(handleResponse),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['user'] });
        },
    });

    const removeUser = useMutation({
        mutationFn: (userRef: string) =>
            fetch(`${URL_API_NOTIFICATIONS}`, {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ userRef }),
            }).then(handleResponse),
        onSuccess: () => {
            queryClient.setQueryData(['user'], null);
        },
    });

    const sendMessage = useMutation({
        mutationFn: (message: UserMessage) =>
            fetch(`${URL_API_NOTIFICATIONS}?action=send`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(message),
            }).then(handleResponse),
    });

    return { upsertUser, removeUser, useUser, sendMessage };
}

function handleResponse(res: Response) {
    if (!res.ok) {
        throw new Error(JSON.stringify({ status: res.status, message: res.statusText }));
    }
    return res.json();
}
