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
  console.log("[GET /api/services] Request received");
  try {
    console.log("[GET /api/services] Fetching services from database");
    const db = await getDb();
    const services = await db
      .collection("services")
      .find({})
      .sort({ created_at: -1 })
      .toArray();
    console.log("[GET /api/services] Services fetched successfully. Count:", services.length);
    res.json({ items: services });
  } catch (error) {
    console.log("[GET /api/services] Error occurred");
    console.error("Error fetching services:", error);
    res.status(500).json({ error: "Failed to fetch services" });
  }
}

/**
 * GET /api/admin/services
 * Admin endpoint to get all services
 */
export async function handleGetAllServices(req, res) {
  console.log("[GET /api/admin/services] Admin request received");
  try {
    console.log("[GET /api/admin/services] Fetching all services from database");
    const db = await getDb();
    const services = await db
      .collection("services")
      .find({})
      .sort({ created_at: -1 })
      .toArray();
    console.log("[GET /api/admin/services] Services fetched successfully. Count:", services.length);
    res.json({ items: services });
  } catch (error) {
    console.log("[GET /api/admin/services] Error occurred");
    console.error("Error fetching services:", error);
    res.status(500).json({ error: "Failed to fetch services" });
  }
}

/**
 * POST /api/admin/services
 * Admin endpoint to create a new service
 */
export async function handleCreateService(req, res) {
  console.log("[POST /api/admin/services] Create service request received");
  console.log("[POST /api/admin/services] Request body:", req.body);
  try {
    console.log("[POST /api/admin/services] Validating request body with Zod");
    const value = createServiceSchema.parse(req.body);
    console.log("[POST /api/admin/services] Validation successful");

    console.log("[POST /api/admin/services] Checking for uploaded icon file");
    // Add uploaded icon URL if file was uploaded
    if (req.file) {
      console.log("[POST /api/admin/services] File uploaded successfully");
      console.log("[POST /api/admin/services] File path (Cloudinary/local):", req.file.path);
      value.icon = req.file.path;
    }

    const db = await getDb();
    const service = {
      title: value.title,
      icon: value.icon,
      created_at: new Date(),
      updated_at: new Date(),
    };

    console.log("[POST /api/admin/services] Inserting service into database");
    const result = await db.collection("services").insertOne(service);
    console.log("[POST /api/admin/services] Service created with ID:", result.insertedId.toString());

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
      console.log("[POST /api/admin/services] Validation error:", error.errors);
      const fieldError = error.errors[0];
      const message = `${fieldError.path.join(".")}: ${fieldError.message}`;
      return res.status(400).json({ error: message });
    }
    console.log("[POST /api/admin/services] Unexpected error occurred");
    console.error("Error creating service:", error);
    res.status(500).json({ error: "Failed to create service" });
  }
}

/**
 * PUT /api/admin/services/:id
 * Admin endpoint to update a service
 */
export async function handleUpdateService(req, res) {
  console.log("[PUT /api/admin/services/:id] Update request received. ID:", req.params.id);
  try {
    const { id } = req.params;
    if (!ObjectId.isValid(id)) {
      console.log("[PUT /api/admin/services/:id] Invalid service ID");
      return res.status(400).json({ error: "Invalid service ID" });
    }

    console.log("[PUT /api/admin/services/:id] Validating request body with Zod");
    const value = updateServiceSchema.parse(req.body);
    console.log("[PUT /api/admin/services/:id] Validation successful");

    console.log("[PUT /api/admin/services/:id] Checking for uploaded icon file");
    // Add uploaded icon URL if file was uploaded
    if (req.file) {
      console.log("[PUT /api/admin/services/:id] New icon uploaded");
      console.log("[PUT /api/admin/services/:id] File path (Cloudinary/local):", req.file.path);
      value.icon = req.file.path;
    }

    const db = await getDb();
    console.log("[PUT /api/admin/services/:id] Updating service in database");
    const result = await db.collection("services").updateOne(
      { _id: new ObjectId(id) },
      {
        $set: {
          ...(value.title && { title: value.title }),
          ...(value.icon && { icon: value.icon }),
          updated_at: new Date(),
        },
      }
    );

    if (result.matchedCount === 0) {
      console.log("[PUT /api/admin/services/:id] Service not found");
      return res.status(404).json({ error: "Service not found" });
    }

    // Fetch the updated service to return in response
    const updatedService = await db
      .collection("services")
      .findOne({ _id: new ObjectId(id) });
    console.log("[PUT /api/admin/services/:id] Service updated successfully");
    res.json({
      status: "success",
      message: `Service "${updatedService?.title}" updated successfully`,
      data: updatedService,
    });
  } catch (error) {
    if (error.name === "ZodError") {
      console.log("[PUT /api/admin/services/:id] Validation error:", error.errors);
      const fieldError = error.errors[0];
      const message = `${fieldError.path.join(".")}: ${fieldError.message}`;
      return res.status(400).json({ error: message });
    }
    console.log("[PUT /api/admin/services/:id] Unexpected error occurred");
    console.error("Error updating service:", error);
    res.status(500).json({ error: "Failed to update service" });
  }
}

/**
 * DELETE /api/admin/services/:id
 * Admin endpoint to delete a service
 */
export async function handleDeleteService(req, res) {
  console.log("[DELETE /api/admin/services/:id] Delete request received. ID:", req.params.id);
  try {
    const { id } = req.params;
    if (!ObjectId.isValid(id)) {
      console.log("[DELETE /api/admin/services/:id] Invalid service ID");
      return res.status(400).json({ error: "Invalid service ID" });
    }

    const db = await getDb();

    console.log("[DELETE /api/admin/services/:id] Fetching service before deletion");
    // Fetch service before deletion to get its title for message
    const serviceToDelete = await db
      .collection("services")
      .findOne({ _id: new ObjectId(id) });

    const result = await db
      .collection("services")
      .deleteOne({ _id: new ObjectId(id) });

    if (result.deletedCount === 0) {
      console.log("[DELETE /api/admin/services/:id] Service not found");
      return res.status(404).json({ error: "Service not found" });
    }

    console.log("[DELETE /api/admin/services/:id] Service deleted successfully");
    res.json({
      status: "success",
      message: `Service "${serviceToDelete?.title}" deleted successfully`,
    });
  } catch (error) {
    console.log("[DELETE /api/admin/services/:id] Unexpected error occurred");
    console.error("Error deleting service:", error);
    res.status(500).json({ error: "Failed to delete service" });
  }
}
