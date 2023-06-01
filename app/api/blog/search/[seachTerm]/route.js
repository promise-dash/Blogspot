import Blog from "@models/blog";
import { connectToDB } from "@utils/database"

export const GET = async (req, { params }) => {
  try {
    await connectToDB();

    const searchTerm = params.searchTerm;

    const blogs = await Blog.find({
        $or: [
          { title: { $regex: new RegExp(searchTerm, 'i') } },
          { content: { $regex: new RegExp(searchTerm, 'i') } }
        ]
      }).populate('creator');

    if (!blogs || blogs.length === 0) {
      return new Response("Blog Not Found", { status: 404 });
    }

    return new Response(JSON.stringify(blogs), { status: 200 });

  } catch (error) {
    return new Response('Failed to fetch blog details', { status: 500 });
  }
};
