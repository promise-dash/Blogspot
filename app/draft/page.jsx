"use client";

import { useState, useRef } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Form from "@components/Form";

const Draft = () => {

  const { data: session } = useSession({ required: true });
  const router = useRouter();
  const imageRef = useRef();
  const [coverImage, setCoverImage] = useState('');
  const [previewImage, setPreviewImage] = useState('');
  const [post, setPost] = useState({title: "", content: ""});
  const [submitting, setSubmitting] = useState(false);

  const CLOUD_NAME = 'dkzcn4z0p';
  const UPLOAD_PRESET = 'my_project_blogspot';

  const onImageChange = (e) => {
    if(e.target.files && e.target.files[0]){
      let img = e.target.files[0];
      setPreviewImage({
        image: URL.createObjectURL(img),
      });
    }
  };

  const uploadImage = async () => {

    const formData = new FormData();

    formData.append("file", coverImage);
    formData.append("upload_preset", UPLOAD_PRESET);

    try {
      const res = await fetch(`https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`, {
        method: "POST",
        body: formData
      })

      const data = await res.json();

      const imageUrl = data['secure_url'];

      return imageUrl;
    } catch (error) {
        console.log(error)
    }
  }
  
  const createBlog = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    try {

      const imageUrl = await uploadImage();

      const response = await fetch("/api/blog/new", {
        method: "POST",
        body: JSON.stringify({
          userId: session?.user.id,
          title: post.title,
          content: post.content,
          imageUrl,
        }),
      });

      if (response.ok) {
        router.push("/");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setSubmitting(false);
    }
  };


  return (
    <Form 
      type='Create'
      post={post}
      setPost={setPost}
      imageRef={imageRef}
      coverImage={coverImage}
      setCoverImage={setCoverImage}
      previewImage={previewImage}
      setPreviewImage={setPreviewImage}
      onImageChange={onImageChange}
      submitting={submitting}
      handleSubmit={createBlog}
    />
  )
} 

export default Draft;