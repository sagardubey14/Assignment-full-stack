const Post = require('../models/post');

// Controller function to create a new post
const createPost = async (req, res) => {
    try {
        const { content } = req.body;
        userId = req.userId

        // Create a new post instance
        const newPost = new Post({
            userId,
            content
        });

        // Save the post to the database
        await newPost.save();

        res.status(201).json({ message: 'Post created successfully', post: newPost ,token:req.token});
    } catch (error) {
        console.error('Error creating post:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

// Controller function to get all posts
const getPosts = async (req, res) => {
    console.log(req.userId);
    try {
        // Fetch all posts from the database
        const posts = await Post.find();
        const result = posts.filter(post => post.userId !== req.userId)
        res.status(200).json({arr:result,token:req.token});
    } catch (error) {
        console.error('Error fetching posts:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

module.exports = {
    createPost,
    getPosts
};
