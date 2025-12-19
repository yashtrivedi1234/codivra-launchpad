import { careersApplicationSchema } from "../validation/careers.schema.mjs";
import { getCollection } from "../db/mongo.mjs";

export async function handleCreateApplication(req, res) {
  const parsed = careersApplicationSchema.safeParse(req.body);

  if (!parsed.success) {
    return res.status(400).json({
      error: "Invalid input",
      issues: parsed.error.flatten(),
    });
  }

  try {
    const collection = await getCollection("job_applications");
    const doc = {
      ...parsed.data,
      created_at: new Date().toISOString(),
    };
    const result = await collection.insertOne(doc);

    return res.json({
      status: "ok",
      id: result.insertedId,
      message: "Application submitted successfully",
    });
  } catch (err) {
    console.error("Error saving job application:", err);
    return res.status(500).json({
      status: "error",
      error: "Failed to save application",
      details: err && err.message ? err.message : String(err),
    });
  }
}


