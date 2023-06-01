import Blog from "@models/blog";
import { connectToDB } from "@utils/database"

export const GET = async (req, { params }) => {

    try {
        await connectToDB();

        const blog = await Blog.findById(params.id).populate('creator');

        if (!blog) return new Response("Blog Not Found", { status: 404 });

        return new Response(JSON.stringify(blog), { status: 200 });

    } catch (error) {
        return new Response('Failed to fetch blog details', { status: 500 });
    }
}


export const PATCH = async (req, { params }) => {

    const { title, content, imageUrl } = await req.json();
    try {
        await connectToDB();

        const existingBlog = await Blog.findById(params.id);

        if (!existingBlog) {
            return new Response("Blog not found", { status: 404 });
        }

        existingBlog.title = title;
        existingBlog.content = content;
        existingBlog.image = imageUrl;

        await existingBlog.save();

        return new Response("Successfully updated the blogs", { status: 200 });
    } catch (error) {
        return new Response("Error updating Blog", { status: 500 });
    }
}


export const DELETE = async (req, { params }) => {
    try {
        await connectToDB();

        await Blog.findByIdAndRemove(params.id);

        return new Response("Blog deleted successfully", { status: 200 });
    } catch (error) {
        return new Response("Error deleting blog", { status: 500 });
    }
};