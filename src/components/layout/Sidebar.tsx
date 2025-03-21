"use client"
import React, { useEffect, useState } from 'react'
import { BsHouseFill, BsBellFill } from 'react-icons/bs';
import { FaUser } from 'react-icons/fa';
import SidebarLogo from './SidebarLogo';
import SidebarItem from './SidebarItem';
import { BiLogOut } from 'react-icons/bi';
import { BsDot } from 'react-icons/bs'; 
import SidebarTweetButton from './SidebarTweetButton';
import useCurrentUser from '../../../hooks/useCurrentUser';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { signOut, useSession } from 'next-auth/react';
import axios from 'axios';
import useSWR from 'swr';


const Sidebar = () => {

  const { data: currentUser } = useCurrentUser(); 
  // const session = getServerSession(authOptions); 
  const { data: session } = useSession();  

    const items = [
        {
          icon: BsHouseFill,
          label: 'Home',
          href: '/',
        },
        {
          icon: BsBellFill,
          label: 'Notifications',
          href: '/notifications',
          auth: true,
          alert: currentUser?.hasNotification
        },
        {
          icon: FaUser,
          label: 'Profile',
          href: `/users/${currentUser?.id}`,
          auth: true,
        },
    ]

    return (
        <div className="col-span-1 h-full pr-4 md:pr-6">
        <div className="flex flex-col items-end">
          <div className="space-y-2 lg:w-[230px]">
            <SidebarLogo />
            {items.map((item) => (
              <SidebarItem
                key={item.href}
                href={item.href} 
                icon={item.icon} 
                label={item.label}
                auth={item.auth}
                alert={item.alert} 
              />
            ))}

            { currentUser && <SidebarItem onClick={async () => signOut()} icon={BiLogOut} label="Logout" /> }

            <SidebarTweetButton />
          </div>
        </div>
      </div>
  )
}

export default Sidebar; 

// { currentUser &&
//   <SidebarItem onClick={async () => {}} icon={BiLogOut} label="Logout" />
// }