'use client' 
import React from 'react'
import usePost from '../../../../hooks/usePost';
import { ClipLoader } from 'react-spinners';
import Header from '@/components/Header';
import PostItem from '@/components/posts/PostItem';
import Form from '@/components/Form';
import CommentFeed from '@/components/posts/CommentFeed';

const page = ({ params } : {params : any}) => { 

    const postId = params.postId; 

    const { data: fetchedPost, isLoading } = usePost(postId as string); 

    if(isLoading || !fetchedPost) {
        return (
            <div className='flex justify-center items-center h-full'>
                <ClipLoader color='lightblue' size={80} /> 
            </div>
        )
    }

    return (
        <div>
            <Header label='Tweet' showBackArrow /> 
            <PostItem data={fetchedPost} />
            <Form
                postId={postId as string} 
                isComment 
                placeholder='Tweet your reply' 
            />
            <CommentFeed comments={fetchedPost?.comments} />
        </div>
    )
}

export default page