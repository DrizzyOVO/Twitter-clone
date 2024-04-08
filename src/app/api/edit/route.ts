import { NextApiRequest, NextApiResponse } from "next";

import serverAuth from "../../../../libs/serverAuth";
import prisma from '../../../../libs/prismadb'; 
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(req: NextRequest) { 

  try {
    const { currentUser } = await serverAuth(req);

    const body = await req.json(); 

    const { name, username, bio, profileImage, coverImage } = body; 

    if (!name || !username) {
      throw new Error('Missing fields');
    }

    const updatedUser = await prisma.user.update({
      where: {
        id: currentUser.id,
      },
      data: {
        name,
        username,
        bio,
        profileImage,
        coverImage
      }
    });

    return NextResponse.json(updatedUser); 
  } catch (error) {
    console.log(error);
    return NextResponse.json({message: "Jhatuu"}, {status: 400});
  }
}