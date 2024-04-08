import "./globals.css";
import Header from "@/components/Header";
import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]/route";
import User from "@/components/User";
import FollowBar from "@/components/layout/FollowBar";
import useCurrentUser from "../../hooks/useCurrentUser";
import { useSession } from "next-auth/react";
import Form from "@/components/Form";
import PostFeed from "@/components/posts/PostFeed";

export default async function Home() {

  const session = await getServerSession(authOptions)
  // const { data: currentUser } = useCurrentUser(); 

  return (
    <div className="text-3xl text-sky-500">
      <Header label="Home" />
      <Form placeholder="What's happening" /> 
      {/* <pre>{JSON.stringify(session)}</pre> */}
      {/* <User /> */}
      <PostFeed />
    </div>
  );
}
