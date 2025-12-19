import { ObjectId } from "mongodb";
import { getCollection } from "../db/mongo.mjs";
import { upsertPageSectionSchema } from "../validation/page.schema.mjs";

const COLLECTION = "page_sections";

export async function handleGetPage(req, res) {
  const { page } = req.params;

  try {
    const collection = await getCollection(COLLECTION);
    const sections = await collection
      .find({ page })
      .toArray();

    return res.json({
      page,
      sections,
    });
  } catch (err) {
    console.error("Error fetching page sections:", err);
    return res.status(500).json({
      error: "Failed to load page content",
    });
  }
}

export async function handleAdminListPages(_req, res) {
  try {
    const collection = await getCollection(COLLECTION);
    const sections = await collection
      .find({})
      .sort({ page: 1, key: 1 })
      .toArray();

    return res.json({ sections });
  } catch (err) {
    console.error("Error listing page sections:", err);
    return res.status(500).json({
      error: "Failed to list page content",
    });
  }
}

export async function handleAdminUpsertPageSection(req, res) {
  const parsed = upsertPageSectionSchema.safeParse(req.body);

  if (!parsed.success) {
    return res.status(400).json({
      error: "Invalid input",
      issues: parsed.error.flatten(),
    });
  }

  const { page, key, data } = parsed.data;

  try {
    const collection = await getCollection(COLLECTION);
    const result = await collection.updateOne(
      { page, key },
      {
        $set: {
          page,
          key,
          data,
          updated_at: new Date().toISOString(),
        },
        $setOnInsert: {
          created_at: new Date().toISOString(),
        },
      },
      { upsert: true }
    );

    return res.json({
      status: "ok",
      upsertedId: result.upsertedId ?? null,
    });
  } catch (err) {
    console.error("Error upserting page section:", err);
    return res.status(500).json({
      error: "Failed to save page content",
    });
  }
}

export async function handleAdminDeletePageSection(req, res) {
  const { id } = req.params;

  try {
    const collection = await getCollection(COLLECTION);
    const result = await collection.deleteOne({ _id: new ObjectId(id) });

    if (result.deletedCount === 0) {
      return res.status(404).json({ error: "Section not found" });
    }

    return res.json({ status: "ok" });
  } catch (err) {
    console.error("Error deleting page section:", err);
    return res.status(500).json({
      error: "Failed to delete page content",
    });
  }
}


