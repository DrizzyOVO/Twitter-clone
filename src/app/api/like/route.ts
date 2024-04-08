import { NextRequest, NextResponse } from "next/server";
import serverAuth from "../../../../libs/serverAuth";
import prisma from "../../../../libs/prismadb"; 


export async function POST(req: NextRequest) { 
    try {

        const outerBody = await req.json();  
        const { postId } = outerBody;  

        const { currentUser } = await serverAuth(req); 

        if (!postId) {  
            throw new Error('Invalid Id'); 
        }

        const post = await prisma.post.findUnique({ 
            where: {
                id: Number.parseInt(postId)  
            }
        }); 

        if (!post) {
            throw new Error('Invalid Id'); 
        }

        let updatedLikedIds = [...(post.likedIds) || []]

        const curUserId = String(currentUser.id); 

        updatedLikedIds.push(curUserId);  

        try {

            const post = await prisma.post.findUnique({ 
                where: {
                    id: Number.parseInt(postId) 
                }
            }); 

            if(post?.userId) {
                await prisma.notification.create({ 
                    data: {
                        body: 'Someone liked your tweet!', 
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

        // if(post?.userId) {
        //     await prisma.notification.create({ 
        //         data: {
        //             body: 'Someone liked your tweet!', 
        //             userId: post.userId 
        //         }
        //     }); 

        //     await prisma.user.update({ 
        //         where: {
        //             id: post.userId
        //         }, 
        //         data: {
        //             hasNotification: true 
        //         }
        //     }); 

        // }

        const updatedPost = await prisma.post.update({ 
            where: {
                id: Number.parseInt(postId) 
            }, 
            data: {
                likedIds: updatedLikedIds
            }
        }); 

        return NextResponse.json(updatedPost, {status: 200}); 


    } catch (error) {
        console.log(error); 
        return NextResponse.json({message: 'Jhatuu'}, {status: 200}); 
    }
}


export async function DELETE(req: NextRequest) { 
    try {

        const outerBody = await req.json();  
        const { postId } = outerBody;   

        const { currentUser } = await serverAuth(req); 

        if (!postId) {  
            throw new Error('Invalid Id'); 
        }

        const post = await prisma.post.findUnique({ 
            where: {
                id: Number.parseInt(postId)  
            }
        }); 

        if (!post) {
            throw new Error('Invalid Id'); 
        }

        let updatedLikedIds = [...(post.likedIds) || []]

        const curUserId = String(currentUser?.id); 

        updatedLikedIds = updatedLikedIds.filter((likedId: string) => likedId !== curUserId);

        const updatedPost = await prisma.post.update({ 
            where: {
                id: Number.parseInt(postId) 
            }, 
            data: {
                likedIds: updatedLikedIds
            }
        }); 

        return NextResponse.json(updatedPost, {status: 200})
        // return NextResponse.json(postId, {status: 200}) 

    } catch (error) {
        console.log(error); 
        return NextResponse.json({message: 'Jhatuu'}, {status: 200}); 
    }
}
