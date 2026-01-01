import { NextRequest, NextResponse } from 'next/server';
import webpush from 'web-push';
import * as z from 'zod';
import prisma from '@src/lib/server/prisma';
import { Prisma } from '@prisma/client';

export async function PUT(request: NextRequest) {
    const data: NewUser | UpdateUser = await request.json();
    const service = new NotificationService();
    try {
        const response = await service.upsertUser(data);
        return NextResponse.json(response, { status: 200 });
    } catch (error) {
        console.error('Error:', error);
        return NextResponse.json({ error: `Failed to create or update user: ${error}` }, { status: 400 });
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
                console.error('Error:', error);
                return NextResponse.json({ error: `Failed to send message: ${error}` }, { status: 400 });
            }
        default:
            return NextResponse.json({ error: `Failed to perform action "${action}"` }, { status: 500 });
    }
}

export async function DELETE(request: NextRequest) {
    const data = await request.json();
    const service = new NotificationService();
    const response = await service.removeUser(data?.userRef);
    return NextResponse.json(response, { status: 200 });
}

export async function GET(request: NextRequest) {
    const userRef = request.nextUrl.searchParams.get('userRef');
    const service = new NotificationService();
    const response = await service.getUser(userRef);
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
        const isUpdate = 'userRef' in data;
        if (isUpdate) {
            const userData = UpdateUser.parse(data);
            const user = await prisma.user.update({
                where: { email: userData.userRef },
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
                        create: userData.channels.map((channelRef) => ({
                            channel: {
                                connectOrCreate: {
                                    where: { name: channelRef },
                                    create: { name: channelRef },
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
                    subscriptions: [userData.subscription],
                    channels: {
                        create: userData.channels.map((channelRef) => ({
                            channel: {
                                connectOrCreate: {
                                    where: { name: channelRef },
                                    create: { name: channelRef },
                                },
                            },
                        })),
                    },
                },
            });
            return { success: true, user: user };
        }
    }

    async getUser(userRef: string | null) {
        if (!userRef) return null;
        const user = await prisma.user.findUnique({
            where: { email: userRef },
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

    async removeUser(userRef: string) {
        await prisma.$transaction([
            prisma.usersOnChannels.deleteMany({
                where: { userRef },
            }),
            prisma.user.delete({
                where: { email: userRef },
            }),
        ]);
        return { success: true };
    }

    async sendNotification(message: Message) {
        const user = await prisma.user.findUnique({ where: { email: message.userRef } });
        const channel = await prisma.channel.findUnique({
            where: { name: message.channelRef },
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
                channel.users.flatMap(({ user: channelUser }: ChannelUser) =>
                    channelUser.subscriptions.map((subscription) =>
                        webpush.sendNotification(
                            subscription as Subscription,
                            JSON.stringify({
                                title: message.title,
                                body: `${message.body} [Sender: ${user.nickname}, Channel: ${channel.name}]`,
                            }),
                        ),
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
    expirationTime: z.number().nullable().optional(),
    keys: z.object({
        p256dh: z.string(),
        auth: z.string(),
    }),
});

const Message = z.object({
    userRef: z.email(),
    channelRef: z.string(),
    title: z.string().min(1).max(100),
    body: z.string().min(1).max(500),
});

const CreateUser = z.object({
    nickname: z.string().min(2).max(20),
    email: z.email(),
    channels: z.array(z.string()).min(1).max(20),
});

const NewUser = CreateUser.extend({
    subscription: Subscription,
});

const UpdateUser = z.object({
    userRef: z.email(),
    channels: z.array(z.string()).min(1).max(40),
});

export type Subscription = z.infer<typeof Subscription>;
export type Message = z.infer<typeof Message>;
export type NewUser = z.infer<typeof NewUser>;
export type CreateUser = z.infer<typeof CreateUser>;
export type UpdateUser = z.infer<typeof UpdateUser>;
type ChannelUser = { user: Prisma.UserGetPayload<{ select: { subscriptions: true; nickname: true } }> };
