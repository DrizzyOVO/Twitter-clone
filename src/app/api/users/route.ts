import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../../libs/prismadb"; 
import { NextRequest, NextResponse } from "next/server";

// export default async function handler(req: NextApiRequest, res: NextApiResponse) {
//     if(req.method !== 'GET') {
//         return res.status(405).end();  
//     } 

//     try { 
        
//         const users = await prisma.user.findMany({ 
//             orderBy: {
//                createdAt: 'desc' 
//             }
//         }); 

//         return res.status(200).json(users); 

//     } catch (error) {
//         console.log(error); 
//         res.status(400).end(); 
//     }
// }

export async function GET(request: NextRequest) {

    const users = await prisma.user.findMany({
        orderBy: {
            createdAt: 'desc'
        }
    }); 

    return NextResponse.json({users}); 

    // return NextResponse.json(currentUser, {status: 200}); 

}
