import { NextRequest, NextResponse } from 'next/server';
import webpush from 'web-push';
import * as z from 'zod';
import prisma from '@src/lib/server/prisma';
import { User } from '@prisma/client';

export async function PUT(request: NextRequest) {
    const data: NewUser | UpdateUser = await request.json();
    const service = new NotificationService();
    try {
        const response = await service.upsertUser(data);
        return NextResponse.json(response, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to create or update user' }, { status: 500 });
    }
}

const ACTIONS = {
    send: 'send',
};

export async function POST(request: NextRequest) {
    const data = await request.json();
    const action = request.nextUrl.searchParams.get('action');
    const service = new NotificationService();
    switch (action) {
        case ACTIONS.send:
            try {
                const message = Message.parse(data);
                const response = await service.sendNotification(message);
                return NextResponse.json(response, { status: 200 });
            } catch (error) {
                console.error('Error in sending message:', error);
                return NextResponse.json({ error: 'Invalid message data' }, { status: 400 });
            }
        default:
            return NextResponse.json({ error: 'Invalid action' }, { status: 400 });
    }
}

export async function DELETE(request: NextRequest) {
    const data = await request.json();
    const service = new NotificationService();
    const response = await service.removeUser(data?.userId);
    return NextResponse.json(response, { status: 200 });
}

export async function GET(request: NextRequest) {
    const userId = request.nextUrl.searchParams.get('userId');
    const service = new NotificationService();
    const response = await service.getUser(userId);
    if (!response) {
        return NextResponse.json({ error: 'User not found' }, { status: 404 });
    } else {
        return NextResponse.json(response, { status: 200 });
    }
}

export async function PATCH() {
    return NextResponse.json({ message: 'Not implemented' }, { status: 501 });
}

class NotificationService {
    async upsertUser(data: NewUser | UpdateUser) {
        const isUpdate = 'id' in data;
        if (isUpdate) {
            const userData = UpdateUser.parse(data);
            const user = await prisma.user.update({
                where: { id: userData.id },
                include: {
                    channels: {
                        include: {
                            channel: true,
                        },
                    },
                },
                data: {
                    channels: {
                        deleteMany: {},
                        create: userData.channels.map((channelName) => ({
                            channel: {
                                connectOrCreate: {
                                    where: { name: channelName },
                                    create: { name: channelName },
                                },
                            },
                        })),
                    },
                },
            });
            return { success: true, user: user };
        } else {
            const userData = NewUser.parse(data);
            const user = await prisma.user.create({
                include: {
                    channels: {
                        include: {
                            channel: true,
                        },
                    },
                },
                data: {
                    nickname: userData.nickname,
                    email: userData.email,
                    subscription: userData.subscription,
                    channels: {
                        create: userData.channels.map((channelName) => ({
                            channel: {
                                connectOrCreate: {
                                    where: { name: channelName },
                                    create: { name: channelName },
                                },
                            },
                        })),
                    },
                },
            });
            return { success: true, user: user };
        }
    }

    async getUser(userId: string | null) {
        if (!userId) return null;
        const user = await prisma.user.findUnique({
            where: { id: userId },
            include: {
                channels: {
                    include: {
                        channel: true,
                    },
                },
            },
        });
        return user;
    }

    async removeUser(userId: string) {
        await prisma.$transaction([
            prisma.usersOnChannels.deleteMany({
                where: { userId },
            }),
            prisma.user.delete({
                where: { id: userId },
            }),
        ]);
        return { success: true };
    }

    async sendNotification(message: Message) {
        const user = await prisma.user.findUnique({ where: { id: message.userId } });
        const channel = await prisma.channel.findUnique({
            where: { id: message.channelId },
            include: {
                users: {
                    include: {
                        user: true,
                    },
                },
            },
        });
        if (!user || !channel) {
            throw new Error('Message could not be send: Missing user or channel.');
        }
        try {
            webpush.setVapidDetails(
                'https://digimunea.de',
                process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY!,
                process.env.VAPID_PRIVATE_KEY!,
            );
            await Promise.allSettled(
                channel.users.map(({ user }: ChannelUser) =>
                    webpush.sendNotification(
                        user.subscription as Subscription,
                        JSON.stringify({
                            title: message.title,
                            body: `${message.body} [User: ${user.nickname}, Channel: ${channel.name}]`,
                        }),
                    ),
                ),
            );
            return { success: true };
        } catch (error) {
            console.error('Error sending push notification:', error);
            return { success: false, error: 'Failed to send notification' };
        }
    }
}

const Subscription = z.object({
    endpoint: z.string(),
    expirationTime: z.number().nullable(),
    keys: z.object({
        p256dh: z.string(),
        auth: z.string(),
    }),
});

const Message = z.object({
    userId: z.cuid(),
    channelId: z.cuid(),
    title: z.string().min(1).max(100),
    body: z.string().min(1).max(500),
});

const NewUser = z.object({
    nickname: z.string().min(2).max(20),
    email: z.email(),
    subscription: Subscription,
    channels: z.array(z.string()).min(1).max(20),
});

const UpdateUser = z.object({
    id: z.cuid(),
    channels: z.array(z.string()).min(1).max(40),
});

export type Subscription = z.infer<typeof Subscription>;
export type Message = z.infer<typeof Message>;
export type NewUser = z.infer<typeof NewUser>;
export type UpdateUser = z.infer<typeof UpdateUser>;
type ChannelUser = { user: User };
