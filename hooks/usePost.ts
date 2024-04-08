// 'use client'
import useSWR from "swr";
import fetcher from "../libs/fetcher";

const usePost = (postId: string) => {  

    let url = postId ? `/api/posts/${postId}` : null;   
    
    console.log(url); 

    const { 
        data, 
        error, 
        isLoading, 
        mutate 
    } = useSWR(url, fetcher);  

    return {
        data, 
        error, 
        isLoading, 
        mutate
    }
}; 

export default usePost;    

