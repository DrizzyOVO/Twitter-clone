"use client"
import React, { useCallback } from 'react';
import { IconType } from "react-icons";
import { useRouter } from 'next/navigation';
import { BsDot } from 'react-icons/bs';
import { useSession } from 'next-auth/react';
import useLoginModal from '../../../hooks/useLoginModal';

interface SidebarItemProps {
  label: string;
  icon: IconType;
  href?: string;
  onClick?: () => void;
  auth?: boolean;
  alert?: boolean;
}

const SidebarItem: React.FC<SidebarItemProps> = ({ label, icon: Icon, href, auth, onClick, alert }) => {
  const router = useRouter();
  const { data: session } = useSession();  
  const loginModal = useLoginModal(); 

  const handleClick = useCallback(() => {
    if(onClick) {
      return onClick(); 
    }

    if(auth && !session){
      loginModal.onOpen(); 
    } else if (href) {
      router.push(href);
    }

  }, [router, onClick, href, session, auth, loginModal]); 

  return (
    <div onClick={handleClick} className="flex flex-row items-center">
      <div className="
        relative
        rounded-full 
        h-14
        w-14
        flex
        items-center
        justify-center 
        p-4
        hover:bg-slate-300 
        hover:bg-opacity-10 
        cursor-pointer 
        lg:hidden
      ">
        <Icon size={28} color="white" />
        {alert ? <BsDot className="text-sky-500 absolute -top-4 left-0" size={70} /> : null}
      </div>
      <div className="
        relative
        hidden 
        lg:flex 
        items-row 
        gap-4 
        p-4 
        rounded-full 
        hover:bg-slate-300 
        hover:bg-opacity-10 
        cursor-pointer
        items-center
      ">
        <Icon size={24} color="white" />
        <p className="hidden lg:block text-white text-xl">
          {label}
        </p>
        {alert ? <BsDot className="text-sky-500 absolute -top-4 left-0" size={70} /> : null}
      </div>
    </div>
  );
}

export default SidebarItem;