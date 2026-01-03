import { ObjectId } from "mongodb";
import { getDb } from "../db/mongo.mjs";
import {
  createPortfolioSchema,
  updatePortfolioSchema,
} from "../validation/portfolio.schema.mjs";

/**
 * GET /api/portfolio
 * Public endpoint to get all portfolio items
 */
export async function handleGetPortfolio(req, res) {
  try {
    const db = await getDb();
    const items = await db
      .collection("portfolio_items")
      .find({})
      .sort({ created_at: -1 })
      .toArray();

    res.json({ items });
  } catch (error) {
    console.error("Error fetching portfolio items:", error);
    res.status(500).json({ error: "Failed to fetch portfolio items" });
  }
}

/**
 * POST /api/admin/portfolio
 * Admin endpoint to create a new portfolio item
 */
export async function handleCreatePortfolioItem(req, res) {
  try {
    let value = { ...req.body };

    // Validate with schema
    value = createPortfolioSchema.parse(value);

    // Handle uploaded image
    let imageDetails = null;

    // Remove empty image string from body
    if (value.image === "") {
      delete value.image;
    }

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
    const item = {
      ...value,
      created_at: new Date(),
      updated_at: new Date(),
    };

    const result = await db.collection("portfolio_items").insertOne(item);

    const responseData = {
      _id: result.insertedId.toString(),
      ...value,
      created_at: item.created_at,
      updated_at: item.updated_at,
    };

    res.json({
      status: "success",
      message: `Portfolio item "${value.title}" created successfully`,
      data: responseData,
      ...(imageDetails && { image: imageDetails }),
    });
  } catch (error) {
    if (error.name === "ZodError") {
      const fieldError = error.errors[0];
      const message = `${fieldError.path.join(".")}: ${fieldError.message}`;
      return res.status(400).json({ error: message });
    }
    console.error("Error creating portfolio item:", error);
    res.status(500).json({ error: "Failed to create portfolio item" });
  }
}

/**
 * PUT /api/admin/portfolio/:id
 * Admin endpoint to update a portfolio item
 */
export async function handleUpdatePortfolioItem(req, res) {
  try {
    const { id } = req.params;
    if (!ObjectId.isValid(id)) {
      return res.status(400).json({ error: "Invalid portfolio item ID" });
    }

    let value = { ...req.body };

    // Validate with schema
    value = updatePortfolioSchema.parse(value);

    // Handle uploaded image
    let imageDetails = null;

    // Remove empty image string from body
    if (value.image === "") {
      delete value.image;
    }

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
    const result = await db.collection("portfolio_items").updateOne(
      { _id: new ObjectId(id) },
      {
        $set: {
          ...value,
          updated_at: new Date(),
        },
      }
    );

    if (result.matchedCount === 0) {
      return res.status(404).json({ error: "Portfolio item not found" });
    }

    // Fetch the updated item to return in response
    const updatedItem = await db
      .collection("portfolio_items")
      .findOne({ _id: new ObjectId(id) });

    res.json({
      status: "success",
      message: `Portfolio item "${updatedItem?.title}" updated successfully`,
      data: updatedItem,
      ...(imageDetails && { image: imageDetails }),
    });
  } catch (error) {
    if (error.name === "ZodError") {
      const fieldError = error.errors[0];
      const message = `${fieldError.path.join(".")}: ${fieldError.message}`;
      return res.status(400).json({ error: message });
    }
    console.error("Error updating portfolio item:", error);
    res.status(500).json({ error: "Failed to update portfolio item" });
  }
}

/**
 * DELETE /api/admin/portfolio/:id
 * Admin endpoint to delete a portfolio item
 */
export async function handleDeletePortfolioItem(req, res) {
  try {
    const { id } = req.params;
    if (!ObjectId.isValid(id)) {
      return res.status(400).json({ error: "Invalid portfolio item ID" });
    }

    const db = await getDb();

    // Get the item first to use its title in the response
    const item = await db
      .collection("portfolio_items")
      .findOne({ _id: new ObjectId(id) });

    if (!item) {
      return res.status(404).json({ error: "Portfolio item not found" });
    }

    const result = await db
      .collection("portfolio_items")
      .deleteOne({ _id: new ObjectId(id) });

    if (result.deletedCount === 0) {
      return res.status(404).json({ error: "Failed to delete portfolio item" });
    }

    res.json({
      status: "success",
      message: `Portfolio item "${item.title}" deleted successfully`,
    });
  } catch (error) {
    console.error("Error deleting portfolio item:", error);
    res.status(500).json({ error: "Failed to delete portfolio item" });
  }
}
