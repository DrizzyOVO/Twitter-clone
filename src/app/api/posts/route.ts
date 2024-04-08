import { NextApiRequest, NextApiResponse } from "next";

import serverAuth from '../../../../libs/serverAuth' 
import prisma from '../../../../libs/prismadb'
import { type NextRequest, NextResponse } from "next/server";
import { useSearchParams } from "next/navigation";


export async function GET(request: NextRequest, context: any) {  
    
    try {

        // const { params } = context; 
        // const useri = params.userId;

        const searchParams = request.nextUrl.searchParams; 
        const userid = searchParams.get('userId'); 

        let posts;

        const userId = userid ? Number.parseInt(userid) : null;   


        console.log("userId: " + userid); 

        if (userId) {
            posts = await prisma.post.findMany({
                where: {
                    userId
                },
                include: {
                    user: true,
                    comments: true
                },
                orderBy: {
                    createdAt: 'desc'
                },
            });
        } else {
            posts = await prisma.post.findMany({
                include: {
                    user: true,
                    comments: true
                },
                orderBy: {
                    createdAt: 'desc'
                }
            });
        }

        return NextResponse.json(posts, {status: 200}); 

    } catch (error) {
        console.log(error);  
        return NextResponse.json({message: "Jhatuu"}, {status: 400});
    }

}

export async function POST(req: NextRequest) {

    try {
        const { currentUser } = await serverAuth(req);
        // const { body } = req.body;
        const outerBody = await req.json();  

        const { body } = outerBody; 

        const post = await prisma.post.create({
            data: {
                body,
                userId: currentUser.id
            }
        });

        return NextResponse.json(post, {status: 200}); 

    } catch (error) {
        console.log(error);  
        return NextResponse.json({message: "Jhatuu"}, {status: 400});
    }

}

