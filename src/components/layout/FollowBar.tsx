'use client'
import React, { useEffect, useState } from "react";
import useUsers from "../../../hooks/useUsers";
import axios from "axios";
import Avatar from "../Avatar";

const FollowBar = () => {

  const [users, setUsers] = useState([]);  

  const find = async () => {
    const response = await axios.get('/api/users'); 
    const ans = response.data.users; 
    setUsers(ans); 
  }

  useEffect(() => {  
    find(); 
  }, [find])


  return (
    <div className="px-6 py-4 hidden lg:block">
      <div className="bg-neutral-800 rounded-xl p-4">
        <h2 className="text-white text-xl font-semibold">Who to follow</h2>
        <div className="flex flex-col gap-6 mt-4">
          {users.map((user: Record<string, any>) => (
            <div key={user.id} className="flex flex-row gap-4">
              <Avatar userId={user.id} />
              <div className="flex flex-col">
                <p className="text-white font-semibold text-sm">{user.name}</p>
                <p className="text-neutral-400 text-sm">@{user.username}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FollowBar;
