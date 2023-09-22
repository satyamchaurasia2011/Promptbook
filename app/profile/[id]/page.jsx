"use client";

import Profile from "@components/Profile";
import { useSession } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const UserProfile = ({ params }) => {
  const [userPosts, setUserPosts] = useState([]);
  const [user, setUser] = useState('');
  const {data : session} = useSession();
  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch(`/api/users/${params?.id}/posts`);
      const data = await response.json();
      setUserPosts(data);
      setUser(data[0].creator)
    };
    if (params?.id) fetchPosts();
  }, [params?.id]);
  console.log(session)
  return (
    <Profile
      name={user.email === session?.user?.email ? 'My' : user.username}
      desc={`Welcome to ${user.email === session?.user?.email ? 'My' : user.username+` 's`} personalized profile page. 
                Explore ${user.email === session?.user?.email ? 'My' : user.username+`'s`} exceptional prompts and be inspired by the power of their
                imagination`}
      data={userPosts}
    />
  );
};

export default UserProfile;
