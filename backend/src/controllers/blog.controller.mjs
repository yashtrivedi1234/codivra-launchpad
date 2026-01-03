import { ObjectId } from "mongodb";
import { getDb } from "../db/mongo.mjs";
import {
  createBlogSchema,
  updateBlogSchema,
} from "../validation/blog.schema.mjs";

/**
 * GET /api/blog
 * Public endpoint to get all blog posts
 */
export async function handleGetBlog(req, res) {
  try {
    const db = await getDb();
    const posts = await db
      .collection("blog_posts")
      .find({})
      .sort({ created_at: -1 })
      .toArray();

    const normalizedPosts = posts.map((post) => ({
      ...post,
      _id: post._id.toString(),
    }));

    res.json({ items: normalizedPosts });
  } catch (error) {
    console.error("Error fetching blog posts:", error);
    res.status(500).json({ error: "Failed to fetch blog posts" });
  }
}

/**
 * GET /api/blog/:id
 * Public endpoint to get a single blog post by ID
 */
export async function handleGetBlogById(req, res) {
  try {
    const { id } = req.params;

    if (!ObjectId.isValid(id)) {
      return res.status(400).json({ error: "Invalid blog post ID" });
    }

    const db = await getDb();
    const post = await db
      .collection("blog_posts")
      .findOne({ _id: new ObjectId(id) });

    if (!post) {
      return res.status(404).json({ error: "Blog post not found" });
    }

    const normalizedPost = {
      ...post,
      _id: post._id.toString(),
    };

    res.json({ item: normalizedPost });
  } catch (error) {
    console.error("Error fetching blog post by ID:", error);
    res.status(500).json({ error: "Failed to fetch blog post" });
  }
}

/**
 * POST /api/admin/blog
 * Admin endpoint to create a new blog post
 */
export async function handleCreateBlogPost(req, res) {
  try {
    let value = { ...req.body };

    // Validate with schema
    value = createBlogSchema.parse(value);

    // Handle image according to schema
    let imageDetails = null;

    if (req.file) {
      value.image = req.file.path;
      imageDetails = {
        url: req.file.path,
        filename: req.file.filename,
        public_id: req.file.filename,
        size: req.file.size,
      };
    } else if (value.image === "") {
      delete value.image;
    }

    const db = await getDb();
    const post = {
      ...value,
      created_at: new Date(),
      updated_at: new Date(),
    };

    const result = await db.collection("blog_posts").insertOne(post);

    const responseData = {
      _id: result.insertedId.toString(),
      ...value,
      created_at: post.created_at,
      updated_at: post.updated_at,
    };

    res.json({
      status: "success",
      message: `Blog post "${value.title}" created successfully`,
      data: responseData,
      ...(imageDetails && { image: imageDetails }),
    });
  } catch (error) {
    if (error.name === "ZodError") {
      const fieldError = error.errors[0];
      const message = `${fieldError.path.join(".")}: ${fieldError.message}`;
      return res.status(400).json({ error: message });
    }
    console.error("Error creating blog post:", error);
    res.status(500).json({ error: "Failed to create blog post" });
  }
}

/**
 * PUT /api/admin/blog/:id
 * Admin endpoint to update a blog post
 */
export async function handleUpdateBlogPost(req, res) {
  try {
    const { id } = req.params;
    if (!ObjectId.isValid(id)) {
      return res.status(400).json({ error: "Invalid blog post ID" });
    }

    let value = { ...req.body };

    // Validate with schema
    value = updateBlogSchema.parse(value);

    const removeImageExplicitly = req.body?.image === "" && !req.file;

    // Handle image according to schema
    let imageDetails = null;

    if (req.file) {
      value.image = req.file.path;
      imageDetails = {
        url: req.file.path,
        filename: req.file.filename,
        public_id: req.file.filename,
        size: req.file.size,
      };
    }

    const db = await getDb();

    const updateQuery = {
      $set: {
        ...value,
        updated_at: new Date(),
      },
    };

    if (removeImageExplicitly) {
      updateQuery.$unset = { image: "" };
    }

    const result = await db
      .collection("blog_posts")
      .updateOne({ _id: new ObjectId(id) }, updateQuery);

    if (result.matchedCount === 0) {
      return res.status(404).json({ error: "Blog post not found" });
    }

    // Fetch the updated post to return in response
    const updatedPost = await db
      .collection("blog_posts")
      .findOne({ _id: new ObjectId(id) });

    res.json({
      status: "success",
      message: `Blog post "${updatedPost?.title}" updated successfully`,
      data: updatedPost,
      ...(imageDetails && { image: imageDetails }),
    });
  } catch (error) {
    if (error.name === "ZodError") {
      const fieldError = error.errors[0];
      const message = `${fieldError.path.join(".")}: ${fieldError.message}`;
      return res.status(400).json({ error: message });
    }
    console.error("Error updating blog post:", error);
    res.status(500).json({ error: "Failed to update blog post" });
  }
}

/**
 * DELETE /api/admin/blog/:id
 * Admin endpoint to delete a blog post
 */
export async function handleDeleteBlogPost(req, res) {
  try {
    const { id } = req.params;
    if (!ObjectId.isValid(id)) {
      return res.status(400).json({ error: "Invalid blog post ID" });
    }

    const db = await getDb();

    // Get the post first to use its title in the response
    const post = await db
      .collection("blog_posts")
      .findOne({ _id: new ObjectId(id) });

    if (!post) {
      return res.status(404).json({ error: "Blog post not found" });
    }

    const result = await db
      .collection("blog_posts")
      .deleteOne({ _id: new ObjectId(id) });

    if (result.deletedCount === 0) {
      return res.status(404).json({ error: "Failed to delete blog post" });
    }

    res.json({
      status: "success",
      message: `Blog post "${post.title}" deleted successfully`,
    });
  } catch (error) {
    console.error("Error deleting blog post:", error);
    res.status(500).json({ error: "Failed to delete blog post" });
  }
}
