"use client"

// import axios from "axios";
import { toast } from "react-hot-toast";
import { useCallback, useState } from "react";
import { signIn } from 'next-auth/react';
import { useRouter } from "next/navigation";

import useLoginModal from "../../../hooks/useLoginModal";
import useRegisterModal from "../../../hooks/useRegisterModal";

import Input from "../Input";
import Modal from "../Modal";
import axios from "axios";

const RegisterModal = () => {
  const loginModal = useLoginModal();
  const registerModal = useRegisterModal();

  const router = useRouter(); 

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [name, setName] = useState('');

  const [isLoading, setIsLoading] = useState(false);

  const onToggle = useCallback(() => {
    if (isLoading) {
      return;
    }
  
    registerModal.onClose();
    loginModal.onOpen();
  }, [loginModal, registerModal, isLoading]);

  const onSubmit = useCallback(async () => {
    try {
      setIsLoading(true);
      toast.success('Reached here'); 

      await axios.post('/api/register', {
        email, password, username, name 
      }); 

      toast.success('Account created!'); 

      await signIn('credentials', {
        email, 
        password, 
        redirect: false
      }); 

      toast.success('Signed in!'); 

      registerModal.onClose();

      router.push('/'); 

    } catch (error) {
      console.log(error); 
      toast.error('Noooo');
    } finally {
      setIsLoading(false);
    }
  }, [email, password, registerModal, username, name]);


  // const onSubmit = async () => {
  //   setIsLoading(true);
  //   await axios.post('/api/register', {
  //     email, password, username, name 
  //   })
  //   .then(() => toast.success('Account created!'))
  //   .catch(() => toast.error('Noooo'))
  //   setIsLoading(false);

  //   signIn('credentials', {
  //     email, 
  //     password, 
  //     redirect: false
  //   }); 

  //   registerModal.onClose();
  // }



  const bodyContent = (
    <div className="flex flex-col gap-4">
      <Input
        disabled={isLoading}
        placeholder="Email" 
        value={email} 
        onChange={(e) => setEmail(e.target.value)} 
      />
      <Input 
        disabled={isLoading}
        placeholder="Name" 
        value={name} 
        onChange={(e) => setName(e.target.value)} 
      />
      <Input 
        disabled={isLoading}
        placeholder="Username" 
        value={username} 
        onChange={(e) => setUsername(e.target.value)}
      />
      <Input 
        disabled={isLoading}
        placeholder="Password" 
        type="password" 
        value={password} 
        onChange={(e) => setPassword(e.target.value)}
      />
    </div>
  )

  const middleContent = (
    <div className="">
      <div className="grid justify-center space-y-4"> 
        <button className="group h-12 px-6 border-2 border-gray-400 rounded-full transition duration-300 hover:border-blue-500 focus:bg-blue-50 active:bg-blue-100">
            <div className="relative flex space-x-10 justify-center items-center">
                <img src="https://www.svgrepo.com/show/475656/google-color.svg"
                    className="absolute left-0 mr-10 w-5" alt="google logo" />
                <span
                    className="items-center ml-10 w-max font-semibold tracking-wide text-gray-700 dark:text-white text-sm transition duration-300 group-hover:text-blue-600 sm:text-base">Sign up
                    with Google
                </span>
            </div>
        </button>
        <button className="group h-12 px-6 border-2 border-gray-300 rounded-full transition duration-300 hover:border-blue-500 focus:bg-blue-50 active:bg-blue-100">
            <div className="relative flex items-center space-x-10 justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="absolute left-0 w-5 text-gray-700" viewBox="0 0 16 16">
                    <path
                      d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.012 8.012 0 0 0 16 8c0-4.42-3.58-8-8-8z">
                    </path>
                </svg>
                <span className="block w-max font-semibold tracking-wide text-gray-700 text-sm transition dark:text-white duration-300 group-hover:text-blue-600 sm:text-base">Sign up
                    with Github
                </span>
            </div>
        </button>
      </div>
      
      <div className="flex w-full items-center gap-2 py-8 px-14 sm:px-20 text-sm text-slate-600">
          <div className="h-px w-full bg-slate-200"></div>
          OR
          <div className="h-px w-full bg-slate-200"></div>
      </div>
    </div>
  )

  const footerContent = (
    <div className="text-neutral-400 text-center mt-4">
      <p>Already have an account?
        <span 
          onClick={onToggle} 
          className="
            text-white 
            cursor-pointer 
            hover:underline
          "
          > Sign in</span>
      </p>
    </div>
  )

  return (
    <Modal
      disabled={isLoading}
      isOpen={registerModal.isOpen}
      title="Create an account"
      actionLabel="Register"
      onClose={registerModal.onClose}
      onSubmit={onSubmit}
      body={bodyContent}
      footer={footerContent}
      middle={middleContent}
    />
  );
}

export default RegisterModal;