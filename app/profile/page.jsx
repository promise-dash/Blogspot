"use client";

import Profile from '@components/Profile'
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

const MyProfile = () => {

    const {data: session} = useSession();
    const [posts, setPosts] = useState([]);
    const router = useRouter();

    useEffect(() => {
        const fetchPosts = async () => {
           const response = await fetch(`/api/users/${session?.user.id}/posts`);
           const data = await response.json();
       
           setPosts(data);
         }
     
        if (session?.user.id) fetchPosts();
    }, [posts.length]);
     

    const handleEdit = (post) => {
        router.push(`/update?id=${post._id}`);
    };
    const handleDelete = async (post) =>{
        const hasConfirmed = confirm("Are you sure you want to delete this blog?");
      
          if (hasConfirmed) {
            try {
              await fetch(`/api/blog/${post._id.toString()}`, {
                method: "DELETE",
              });
      
              const filteredPosts = posts.filter((item) => item._id !== post._id);
      
              setPosts(filteredPosts);
            } catch (error) {
              console.log(error);
            }
          }
    };

  return (
    <Profile 
        name="My"
        desc="Welcome to your personalized profile"
        data={posts}
        handleEdit={handleEdit}
        handleDelete={handleDelete}
    />
  )
}

export default MyProfile;