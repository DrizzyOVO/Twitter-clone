'use client'
import React, { useCallback, useEffect, useState } from 'react'
import useCurrentUser from '../../../hooks/useCurrentUser'
import useUser from '../../../hooks/useUser';
import useEditModal from '../../../hooks/useEditModal';
import toast from 'react-hot-toast';
import axios from 'axios';
import Modal from '../Modal';
import ImageUpload from '../ImageUpload';
import Input from '../Input';

const EditModal = () => {

    const { data: currentUser } = useCurrentUser(); 
    const { mutate: mutateFetchedUser } = useUser(currentUser?.id);   
    const editModal = useEditModal(); 

    const [profileImage, setProfileImage] = useState(''); 
    const [coverImage, setCoverImage] = useState(''); 
    const [name, setName] = useState(''); 
    const [username, setUsername] = useState(''); 
    const [bio, setBio] = useState(''); 

    useEffect(() => {
        setProfileImage(currentUser?.profileImage); 
        setCoverImage(currentUser?.coverImage); 
        setName(currentUser?.name); 
        setUsername(currentUser?.username); 
        setBio(currentUser?.bio); 
    }, [currentUser?.name, currentUser?.username, currentUser?.bio, currentUser?.profileImage, currentUser?.coverImage]);  

    const [isLoading, setIsLoading] = useState(false); 

    const onSubmit = useCallback(async () => {
        try { 

            setIsLoading(true);  

            await axios.patch('/api/edit', {
                name, 
                username, 
                bio, 
                profileImage, 
                coverImage
            }); 
            mutateFetchedUser(); 

            toast.success('Updated'); 

            editModal.onClose(); 

        } catch (error) {
            toast.error('Something went wrong'); 
        } finally {
            setIsLoading(false);  
        }

    }, [bio, name, username, profileImage, coverImage, editModal, mutateFetchedUser]); 

    const bodyContent = (
        <div className="flex flex-col gap-4">
          <ImageUpload value={profileImage} disabled={isLoading} onChange={(image) => setProfileImage(image)} label="Upload profile image" />
          <ImageUpload value={coverImage} disabled={isLoading} onChange={(image) => setCoverImage(image)} label="Upload cover image" />
          <Input
            placeholder="Name"
            onChange={(e) => setName(e.target.value)}
            value={name}
            disabled={isLoading}  
          />
          <Input 
            placeholder="Username"
            onChange={(e) => setUsername(e.target.value)}
            value={username}
            disabled={isLoading} 
          />
          <Input 
            placeholder="Bio"
            onChange={(e) => setBio(e.target.value)}
            value={bio}
            disabled={isLoading} 
          />
        </div>
      )

    return ( 

        <div>
            <Modal 
                disabled={isLoading} 
                isOpen={editModal.isOpen} 
                title='Edit your profile' 
                actionLabel='Save' 
                onClose={editModal.onClose} 
                onSubmit={onSubmit}  
                body={bodyContent}
            />
        </div>
    )
}

export default EditModal