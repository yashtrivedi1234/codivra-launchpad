import { ObjectId } from "mongodb";
import { getDb } from "../db/mongo.mjs";
import {
  createServiceSchema,
  updateServiceSchema,
} from "../validation/services.schema.mjs";

/**
 * GET /api/services
 * Public endpoint to get all services
 */
export async function handleGetServices(req, res) {
  try {
    const db = await getDb();
    const services = await db
      .collection("services")
      .find({})
      .sort({ created_at: -1 })
      .toArray();

    res.json({ items: services });
  } catch (error) {
    console.error("Error fetching services:", error);
    res.status(500).json({ error: "Failed to fetch services" });
  }
}

/**
 * GET /api/admin/services
 * Admin endpoint to get all services
 */
export async function handleGetAllServices(req, res) {
  try {
    const db = await getDb();
    const services = await db
      .collection("services")
      .find({})
      .sort({ created_at: -1 })
      .toArray();

    res.json({ items: services });
  } catch (error) {
    console.error("Error fetching services:", error);
    res.status(500).json({ error: "Failed to fetch services" });
  }
}

/**
 * POST /api/admin/services
 * Admin endpoint to create a new service
 */
export async function handleCreateService(req, res) {
  try {
    const value = createServiceSchema.parse(req.body);

    // Add uploaded icon URL if file was uploaded
    if (req.file) {
      value.icon = req.file.path;
    }

    const db = await getDb();
    const service = {
      ...value,
      created_at: new Date(),
      updated_at: new Date(),
    };

    const result = await db.collection("services").insertOne(service);

    res.json({
      status: "success",
      message: `Service "${value.title}" created successfully`,
      data: {
        _id: result.insertedId.toString(),
        ...value,
        created_at: service.created_at,
        updated_at: service.updated_at,
      },
    });
  } catch (error) {
    if (error.name === "ZodError") {
      const fieldError = error.errors[0];
      const message = `${fieldError.path.join(".")}: ${fieldError.message}`;
      return res.status(400).json({ error: message });
    }
    console.error("Error creating service:", error);
    res.status(500).json({ error: "Failed to create service" });
  }
}

/**
 * PUT /api/admin/services/:id
 * Admin endpoint to update a service
 */
export async function handleUpdateService(req, res) {
  try {
    const { id } = req.params;
    if (!ObjectId.isValid(id)) {
      return res.status(400).json({ error: "Invalid service ID" });
    }

    const value = updateServiceSchema.parse(req.body);

    // Add uploaded icon URL if file was uploaded
    if (req.file) {
      value.icon = req.file.path;
    }

    const db = await getDb();
    const result = await db.collection("services").updateOne(
      { _id: new ObjectId(id) },
      {
        $set: {
          ...value,
          updated_at: new Date(),
        },
      }
    );

    if (result.matchedCount === 0) {
      return res.status(404).json({ error: "Service not found" });
    }

    // Fetch the updated service to return in response
    const updatedService = await db
      .collection("services")
      .findOne({ _id: new ObjectId(id) });

    res.json({
      status: "success",
      message: `Service "${updatedService?.title}" updated successfully`,
      data: updatedService,
    });
  } catch (error) {
    if (error.name === "ZodError") {
      const fieldError = error.errors[0];
      const message = `${fieldError.path.join(".")}: ${fieldError.message}`;
      return res.status(400).json({ error: message });
    }
    console.error("Error updating service:", error);
    res.status(500).json({ error: "Failed to update service" });
  }
}

/**
 * DELETE /api/admin/services/:id
 * Admin endpoint to delete a service
 */
export async function handleDeleteService(req, res) {
  try {
    const { id } = req.params;
    if (!ObjectId.isValid(id)) {
      return res.status(400).json({ error: "Invalid service ID" });
    }

    const db = await getDb();

    // Fetch service before deletion to get its title for message
    const serviceToDelete = await db
      .collection("services")
      .findOne({ _id: new ObjectId(id) });

    const result = await db
      .collection("services")
      .deleteOne({ _id: new ObjectId(id) });

    if (result.deletedCount === 0) {
      return res.status(404).json({ error: "Service not found" });
    }

    res.json({
      status: "success",
      message: `Service "${serviceToDelete?.title}" deleted successfully`,
    });
  } catch (error) {
    console.error("Error deleting service:", error);
    res.status(500).json({ error: "Failed to delete service" });
  }
}
