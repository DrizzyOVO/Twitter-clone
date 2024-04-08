import { NextApiRequest, NextApiResponse } from "next";

import prisma from '../../../../../libs/prismadb'; 
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, context: any) {  

    try {
        const { params } = context; 
        const userId = params.userId;  

        if (!userId) {
            throw new Error('Invalid ID');
        }

        const notifications = await prisma.notification.findMany({
            where: {
                id: Number.parseInt(userId),
            },
            orderBy: {
                createdAt: 'desc'
            }
        });

        await prisma.user.update({
            where: {
                id: Number.parseInt(userId) 
            },
            data: {
                hasNotification: false,
            }
        });

        // return res.status(200).json(notifications);
        return NextResponse.json(notifications, {status: 200});  

    } catch (error) {
        console.log(error);
        return NextResponse.json({message: 'Jhatuu'}, {status: 400}) 
    }
}