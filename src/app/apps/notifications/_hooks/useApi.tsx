import { NewUser, Message, UpdateUser } from '@src/app/api/notifications/route';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

const URL_API_NOTIFICATIONS = '/api/notifications';

export default function useApi() {
    const queryClient = useQueryClient();

    const useUser = (userId: string | null) => {
        return useQuery({
            queryKey: ['user'],
            queryFn: () => fetch(`${URL_API_NOTIFICATIONS}?userId=${userId}`).then((res) => res.json()),
            enabled: !!userId,
        });
    };

    const createUser = useMutation({
        mutationFn: (newUser: NewUser) =>
            fetch(URL_API_NOTIFICATIONS, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newUser),
            }).then((res) => res.json()),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['user'] });
        },
    });

    const removeUser = useMutation({
        mutationFn: (userId: string) =>
            fetch(`${URL_API_NOTIFICATIONS}`, {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ userId }),
            }).then((res) => res.json()),
        onSuccess: () => {
            queryClient.setQueryData(['user'], null);
        },
    });

    const updateUser = useMutation({
        mutationFn: (updateUser: UpdateUser) =>
            fetch(URL_API_NOTIFICATIONS, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(updateUser),
            }).then((res) => res.json()),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['user'] });
        },
    });

    const sendMessage = useMutation({
        mutationFn: (message: Message) =>
            fetch(`${URL_API_NOTIFICATIONS}?action=send`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(message),
            }).then((res) => res.json()),
    });

    return { createUser, updateUser, removeUser, useUser, sendMessage };
}
