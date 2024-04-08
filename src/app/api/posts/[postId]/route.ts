import { NextRequest, NextResponse } from "next/server";

import prisma from '../../../../../libs/prismadb'; 

export async function GET(request: NextRequest, context: any){  

    try {

        const { params } = context; 
        const postId = params.postId;  

        if(!postId) {
            throw new Error('Invalid Id'); 
        }

        const post = await prisma.post.findUnique({ 
            where: {
                id: Number.parseInt(postId) 
            }, 
            include: { 
                user: true, 
                comments: { 
                    include: {
                        user: true 
                    }, 
                    orderBy: {
                        createdAt: 'desc' 
                    }
                }
            }
        }); 

        return NextResponse.json(post, {status: 200}); 

    } catch (error) {

    }

}