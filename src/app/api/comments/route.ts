import { NextApiRequest, NextApiResponse } from "next";

import serverAuth from "../../../../libs/serverAuth";
import prisma from "../../../../libs/prismadb"; 
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {

    try {
        const { currentUser } = await serverAuth(req);
        const Body = await req.json(); 
        const { body } = Body;

        const searchParams = req.nextUrl.searchParams; 
        const postid = searchParams.get('postId');  

        const postId = postid ? Number.parseInt(postid) : null; 

        if (!postId) {
            throw new Error('Invalid ID');
        }

        const comment = await prisma.comment.create({
            data: {
                body,
                userId: currentUser.id,
                postId
            }
        });

        try {
            const post = await prisma.post.findUnique({
                where: {
                    id: postId,
                }
            });

            if (post?.userId) {
                await prisma.notification.create({
                    data: {
                        body: 'Someone replied on your tweet!',
                        userId: post.userId
                    }
                });

                await prisma.user.update({
                    where: {
                        id: post.userId
                    },
                    data: {
                        hasNotification: true
                    }
                });
            }
            
        } catch (error) {
            console.log(error);
        }

        return NextResponse.json(comment, {status: 200}); 

    } catch (error) {
        console.log(error);
        return NextResponse.json({message: 'jhatuu'}, {status: 400}) 
    }

}
