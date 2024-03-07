const Post = require('../models/post');

// Controller function to create a new post
const createPost = async (req, res) => {
    try {
        const { title, content } = req.body;
        userId = req.userId

        // Create a new post instance
        const newPost = new Post({
            userId,
            title,
            content
        });

        // Save the post to the database
        await newPost.save();

        res.status(201).json({ message: 'Post created successfully', post: newPost});
    } catch (error) {
        console.error('Error creating post:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

// Controller function to get all posts
const getPosts = async (req, res) => {
    try {
        const page = Number(req.query.page)||1

        const pageSize = Number(req.query.pageSize) || 5;

        const totalCount = await Post.countDocuments()
        const totalPages = Math.ceil(totalCount / pageSize);

        if (page < 1 || page > totalPages) {
            return res.status(400).json({ message: 'Invalid page number' });
        }

        const adjustedPage = Math.min(page, totalPages);
        const skip = (adjustedPage - 1) * pageSize;
        
        const data = await Post.find().skip(skip).limit(pageSize);

        res.status(200).json({
            totalPages: totalPages,
            currentPage: page,
            arr: data
        });

    } catch (error) {
        console.error('Error fetching posts:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

module.exports = {
    createPost,
    getPosts
};
