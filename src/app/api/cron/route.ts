import { NextRequest } from 'next/server';
import prisma from '@src/lib/server/prisma';

/**
 * Cron Job to delete notifications older than 2 days every day at 1 AM ("0 1 * * *")
 * https://vercel.com/digimuneas-projects/webseite/settings/cron-jobs
 */
export async function GET(request: NextRequest) {
    const authHeader = request.headers.get('authorization');
    if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
        return new Response('Unauthorized', {
            status: 401,
        });
    }
    await prisma.notification.deleteMany({
        where: {
            createdAt: {
                lt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
            },
        },
    });

    return Response.json({ success: true });
}
