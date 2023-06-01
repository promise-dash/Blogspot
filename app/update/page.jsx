"use client"

import { useState, useRef, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Form from "@components/Form";

const Update = () => {

  const searchParams = useSearchParams();
  const blogId = searchParams.get('id');    
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

  useEffect(() => {
    const getBlogDetails = async () => {
        const response = await fetch(`/api/blog/${blogId}`);
        const data = await response.json();

        console.log(data);

        setPost({
            title: data.title,
            content: data.content
        });
        setPreviewImage(data.image);
        setCoverImage(data.image);
    }

    if(blogId) getBlogDetails();
  }, [blogId]);
  

  const updateBlog = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    if(!blogId) return alert('Blog bot found');

    try {

      const imageUrl = await uploadImage();

      const response = await fetch(`/api/blog/${blogId}`, {
        method: "PATCH",
        body: JSON.stringify({
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

  return (
    <Form 
      type='Edit'
      post={post}
      setPost={setPost}
      imageRef={imageRef}
      coverImage={coverImage}
      setCoverImage={setCoverImage}
      previewImage={previewImage}
      setPreviewImage={setPreviewImage}
      onImageChange={onImageChange}
      submitting={submitting}
      handleSubmit={updateBlog}
    />
  )
} 

export default Update