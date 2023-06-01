import Blog from "@models/blog";
import { connectToDB } from "@utils/database";

export const POST = async (req ) => {
    const { userId, title, content, imageUrl } = await req.json();

    try {
        await connectToDB();
        const newBlog = new Blog({ 
            creator: userId, 
            title,
            content, 
            image: imageUrl
         });

        await newBlog.save();
        return new Response(JSON.stringify(newBlog), { status: 201 })
    } catch (error) {
        return new Response("Failed to create a new blog", { status: 500 });
    }
};
