'use server'
import bcrypt from 'bcrypt'; 
import { NextApiRequest, NextApiResponse } from 'next';
import { NextResponse } from 'next/server';
import { NextRequest } from 'next/server';

// import prisma from '../../../../libs/prismadb'

import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient(); 

// export default async function handler(req: NextApiRequest, res: NextApiResponse) {
//     if(req.method !== 'POST') {
//         return res.status(405).end(); 
//     }

//     try {

//         const { email, username, name, password } = req.body; 
//         console.log(email + " " + password);

//         const hashedPassword = await bcrypt.hash(password, 12); 

//         const user = await prisma.user.create({
//             data: {
//                 email: email, 
//                 username: username, 
//                 name: name, 
//                 hashedPassword: hashedPassword
//             }
//         }); 

//         return res.status(200).json(user); 

//     } catch (error) {
//         console.log(error); 
//         return res.status(400).end()
//     }
// }


export async function POST(request: NextRequest){
    const body = await request.json(); 
    const { name, username, password, email } = body; 
    console.log(username);

    if(!name || !username || !password || !email) {
        return new NextResponse('Missing fields', {status: 400}); 
    }

    const hashedPassword = await bcrypt.hash(password, 12); 

    const user = await prisma.user.create({
        data: {
            email: email, 
            username: username, 
            name: name, 
            hashedPassword: hashedPassword
        }
    }); 

    return NextResponse.json(user); 


}
