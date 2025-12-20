import { ObjectId } from "mongodb";
import {
  careersApplicationSchema,
  createJobSchema,
  updateJobSchema,
} from "../validation/careers.schema.mjs";
import { getCollection, getDb } from "../db/mongo.mjs";

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

export async function handleGetJobs(req, res) {
  try {
    const db = await getDb();
    const jobs = await db
      .collection("jobs")
      .find({ is_active: true })
      .sort({ order: 1, created_at: -1 })
      .toArray();

    return res.json({ items: jobs });
  } catch (err) {
    console.error("Error fetching jobs:", err);
    return res.status(500).json({ error: "Failed to fetch jobs" });
  }
}

export async function handleGetAllJobs(req, res) {
  try {
    const db = await getDb();
    const jobs = await db
      .collection("jobs")
      .find({})
      .sort({ order: 1, created_at: -1 })
      .toArray();

    return res.json({ items: jobs });
  } catch (err) {
    console.error("Error fetching all jobs:", err);
    return res.status(500).json({ error: "Failed to fetch jobs" });
  }
}

export async function handleCreateJob(req, res) {
  try {
    const value = createJobSchema.parse(req.body);
    const db = await getDb();

    const doc = {
      ...value,
      is_active: value.is_active ?? true,
      order: value.order ?? 0,
      created_at: new Date(),
      updated_at: new Date(),
    };

    const result = await db.collection("jobs").insertOne(doc);

    return res.json({
      status: "success",
      message: "Job created",
      data: { _id: result.insertedId.toString(), ...doc },
    });
  } catch (err) {
    if (err.name === "ZodError") {
      const fieldError = err.errors[0];
      const message = `${fieldError.path.join(".")}: ${fieldError.message}`;
      return res.status(400).json({ error: message });
    }
    console.error("Error creating job:", err);
    return res.status(500).json({ error: "Failed to create job" });
  }
}

export async function handleUpdateJob(req, res) {
  const { id } = req.params;

  if (!ObjectId.isValid(id)) {
    return res.status(400).json({ error: "Invalid job ID" });
  }

  try {
    const value = updateJobSchema.parse(req.body);
    const db = await getDb();

    const result = await db.collection("jobs").findOneAndUpdate(
      { _id: new ObjectId(id) },
      {
        $set: {
          ...value,
          updated_at: new Date(),
        },
      },
      { returnDocument: "after" }
    );

    if (!result.value) {
      return res.status(404).json({ error: "Job not found" });
    }

    return res.json({
      status: "success",
      message: "Job updated",
      data: result.value,
    });
  } catch (err) {
    if (err.name === "ZodError") {
      const fieldError = err.errors[0];
      const message = `${fieldError.path.join(".")}: ${fieldError.message}`;
      return res.status(400).json({ error: message });
    }
    console.error("Error updating job:", err);
    return res.status(500).json({ error: "Failed to update job" });
  }
}

export async function handleDeleteJob(req, res) {
  const { id } = req.params;

  if (!ObjectId.isValid(id)) {
    return res.status(400).json({ error: "Invalid job ID" });
  }

  try {
    const db = await getDb();
    const result = await db
      .collection("jobs")
      .deleteOne({ _id: new ObjectId(id) });

    if (result.deletedCount === 0) {
      return res.status(404).json({ error: "Job not found" });
    }

    return res.json({ status: "success", message: "Job deleted" });
  } catch (err) {
    console.error("Error deleting job:", err);
    return res.status(500).json({ error: "Failed to delete job" });
  }
}
