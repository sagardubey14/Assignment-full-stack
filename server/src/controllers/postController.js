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
        // Fetch all posts from the database
        const posts = await Post.find();

        const page = Number(req.query.page)||1
        const startIndex = (page-1)*5
        const endIndex = (page)*5
        console.log(req.userId);
        console.log(posts);
        const result = posts.filter(post => post.userId.toString() === req.userId.toString() )
        const finalResult = result.slice(startIndex,endIndex)
        res.status(200).json({arr:finalResult});

    } catch (error) {
        console.error('Error fetching posts:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

module.exports = {
    createPost,
    getPosts
};
