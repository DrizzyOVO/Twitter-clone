'use client'
import Header from '@/components/Header'
import { useRouter } from 'next/navigation'
import React from 'react'
import useUser from '../../../../hooks/useUser'
import { ClipLoader } from 'react-spinners'
import UserHero from '@/components/users/UserHero'
import UserBio from '@/components/users/UserBio'
import PostFeed from '@/components/posts/PostFeed'

const UserView = ({ params } : {params : any}) => {

    const router = useRouter(); 
    let userId = params.userId; 
    const { data: fetchedUser, isLoading } = useUser(userId); 

    if (isLoading || !fetchedUser) { 
        return ( 
            <div className="flex justify-center items-center h-full">
                <ClipLoader color="lightblue" size={80} />
            </div>
        )
    }

    return (
        <div>
            <Header showBackArrow label={fetchedUser?.name} />
            <UserHero userId={userId as string} />  
            <UserBio userId={userId as string} />  
            <PostFeed userId={userId as string} /> 
        </div>
    )
}

export default UserView