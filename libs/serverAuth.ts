import { NextApiRequest } from "next";
import { getSession } from "next-auth/react";
import { useSession } from "next-auth/react";

import prisma from "../libs/prismadb"; 
import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

const serverAuth = async (req: any) => {
    const session = await getServerSession(authOptions)

    if(!session?.user?.email) {
        throw new Error('Not signed in'); 
    }

    const currentUser = await prisma.user.findUnique({
        where: {
            email: session.user.email 
        }
    }); 

    if(!currentUser) {
        throw new Error('Not signed in'); 
    }

    return { currentUser }; 
    // return NextResponse.json(currentUser)
}; 

export default serverAuth; 
