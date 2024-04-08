import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../../../libs/prismadb"; 
import { NextRequest, NextResponse } from "next/server";
import { stringify } from "querystring";

// export default async function handler(req: NextApiRequest, res: NextApiResponse) {
//     if(req.method !== 'GET') {
//         return res.status(405).end(); 
//     }

//     try {

//         const { userId } = req.query; 

//         if(!userId || typeof userId !== 'number') {
//             throw new Error('Invalid Id');  
//         }

//         const existingUser = await prisma.user.findUnique({ 
//             where: {
//                 id: userId 
//             }
//         }); 

//         const followersCount = await prisma.user.count({ 
//             where: {
//                 followingIds: {
//                     has: userId
//                 }
//             }
//         }); 

//         return res.status(200).json({ ...existingUser, followersCount }); 

//     } catch (error) {
//         console.log(error);  
//         return res.status(400).end(); 
//     }

// }


export async function GET(req: any, context: any) { 

    try {

        // const { userId } = req.query; 
        // const userId = new URL(req.url);
        const { params } = context; 
        const userid = params.userId; 
        
        // console.log("userId + " + userId); 

        let userId = Number.parseInt(userid)

        if(!userId || typeof userId !== 'number') {
            throw new Error('Invalid Id');  
        }

        const existingUser = await prisma.user.findUnique({ 
            where: {
                id: userId 
            }
        }); 

        const userIdString = String(userId)

        const followersCount = await prisma.user.count({ 
            where: {
                followingIds: {
                    has: userIdString
                }
            }
        }); 

        return NextResponse.json({ ...existingUser, followersCount });
        
        // return NextResponse.json({ userId: userId });

    } catch (error) {
        console.log(error);  
        return NextResponse.json({message: "Jhatuu"}, {status: 400}); 
    }

}