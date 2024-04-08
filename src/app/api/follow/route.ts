import { NextResponse } from "next/server";

import prisma from '../../../../libs/prismadb'; 
import serverAuth from "../../../../libs/serverAuth";
import { PrismaAdapter } from "@next-auth/prisma-adapter";

export async function POST(req: NextResponse) {

    try {

        const body = await req.json();

        const { userId } = body; 

        const { currentUser } = await serverAuth(req); 

        if(!userId) {
            throw new Error('Invalid Id'); 
        }

        const user = await prisma.user.findUnique({ 
            where: {
                id: Number.parseInt(userId)
            }       
        }); 

        if (!user) {
            throw new Error('Invalid Id'); 
        }

        let updatedFollowingIds = [...(user.followingIds || [])]; 

        updatedFollowingIds.push(userId);

        try {
            await prisma.notification.create({
                data: {
                    body: 'Someone followed you!',
                    userId,
                },
            });
    
            await prisma.user.update({
                where: {
                    id: userId,
                },
                data: {
                    hasNotification: true,
                }
            });
        } catch (error) {
            console.log(error);
        }

        const updatedUser = await prisma.user.update({ 
            where: {
                id: currentUser.id 
            }, 
            data: {
                followingIds: updatedFollowingIds
            }
        }); 

        return NextResponse.json(updatedUser, {status: 200})

    } catch (error) {

        console.log(error); 
        return NextResponse.json({message: 'Jhatuu'}, {status: 400}); 

    }
     
}


export async function DELETE(req: NextResponse) {

    try {

        const body = await req.json();

        const { userId } = body; 

        const { currentUser } = await serverAuth(req); 

        if(!userId) {
            throw new Error('Invalid Id'); 
        }

        const user = await prisma.user.findUnique({ 
            where: {
                id: Number.parseInt(userId)
            }       
        }); 

        if (!user) {
            throw new Error('Invalid Id'); 
        }

        let updatedFollowingIds = [...(user.followingIds || [])]; 

        updatedFollowingIds = updatedFollowingIds.filter(followingId => followingId !== userId); 

        const updatedUser = await prisma.user.update({ 
            where: {
                id: currentUser.id 
            }, 
            data: {
                followingIds: updatedFollowingIds
            }
        }); 

        return NextResponse.json(updatedUser, {status: 200})

    } catch (error) {

        console.log(error); 
        return NextResponse.json({message: 'Jhatuu'}, {status: 400}); 

    }
     
}