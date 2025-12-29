import Post from "../Models/Post.model.js";

/**
 * @desc    Get all posts
 * @route   GET /api/posts
 */
export const getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find().populate("author", "name email");

    if (posts.length === 0) {
      return res.status(404).json({ message: "No posts found" });
    }

    res.status(200).json({ message: "Posts fetched", data: posts });
  } catch (error) {
    res.status(500).json({ message: "Failed to get posts", error: error.message });
  }
};

/**
 * @desc    Create new post
 * @route   POST /api/posts
 */
export const createPost = async (req, res) => {
  try {
    const { title, content } = req.body;

    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    if (!title || !content) {
      return res.status(400).json({
        message: "Title and content are required",
      });
    }

    const post = await Post.create({
      title,
      content,
      author: req.user.userId,
    });

    res.status(201).json({ message: "Post created", data: post });
  } catch (error) {
    console.log("Add Post Error:", error);
    res.status(500).json({ message: "Failed to add post", error: error.message });
  }
};

/**
 * @desc    Get single post
 * @route   GET /api/posts/:id
 */
export const getSinglePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id).populate("author", "name email");

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    res.status(200).json({ message: "Post fetched", data: post });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

/**
 * @desc    Update post
 * @route   PUT /api/posts/:id
 */
export const updatePost = async (req, res) => {
  try {
    const { title, content } = req.body;

    const post = await Post.findByIdAndUpdate(
      req.params.id,
      { title, content },
      { new: true }
    );

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    res.status(200).json({ message: "Post updated", data: post });
  } catch (error) {
    res.status(500).json({ message: "Failed to update post", error: error.message });
  }
};

/**
 * @desc    Delete post
 * @route   DELETE /api/posts/:id
 */
export const deletePost = async (req, res) => {
  try {
    const post = await Post.findByIdAndDelete(req.params.id);

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    res.status(200).json({ message: "Post deleted" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete post", error: error.message });
  }
};
