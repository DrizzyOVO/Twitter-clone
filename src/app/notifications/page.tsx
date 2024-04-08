'use client' 
import Header from "@/components/Header";
import NotificationsFeed from "@/components/NotificationsFeed";
import useCurrentUser from "../../../hooks/useCurrentUser"; 
import { NextPageContext } from "next";
import { getSession, useSession } from "next-auth/react";
import type { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { useRouter } from "next/navigation";

// export async function getServerSideProps(context: NextPageContext) {
//   const session = await getSession(context);

//   if (!session) {
//     return {
//       redirect: {
//         destination: '/',
//         permanent: false,
//       }
//     }
//   }

//   return {
//     props: {
//       session
//     }
//   }
// }

const Page = () => {  

    const { data: currentUser } = useCurrentUser(); 
    const { data: session } = useSession();
    const router = useRouter(); 


    return ( 
        
        <>
            <Header showBackArrow label="Notifications" />
            <NotificationsFeed />
        </>

    ) 

}

export default Page; 