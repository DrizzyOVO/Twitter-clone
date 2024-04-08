import { NextApiRequest, NextApiResponse } from "next";
import serverAuth from "../../../../libs/serverAuth";
import { NextRequest, NextResponse } from "next/server";
import { useSession } from "next-auth/react";

// export default async function handler(
//     req: NextApiRequest, 
//     res: NextApiResponse
// ) {
//     if(req.method !== 'GET') {
//         return res.status(405).end(); 
//     }

//     try {

//         const { currentUser } = await serverAuth(req); 
        
//         return res.status(200).json(currentUser)

//     } catch (error) {
//         console.log(error); 
//         return res.status(400).end(); 
//     }
// }

export async function GET(request: Request){

    // const session = useSession(); 

    // if (session) {
    //     return NextResponse.json(session.data?.user, {status: 200}); 
    // } 

    const { currentUser } = await serverAuth(request);
    return NextResponse.json(currentUser, {status: 200}); 

}