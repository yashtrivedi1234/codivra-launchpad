import { ObjectId } from "mongodb";
import { getDb } from "../db/mongo.mjs";
import {
  createTeamMemberSchema,
  updateTeamMemberSchema,
} from "../validation/team.schema.mjs";

/**
 * GET /api/team
 * Public endpoint to get all team members
 */
export async function handleGetTeam(req, res) {
  try {
    const db = await getDb();
    const members = await db
      .collection("team_members")
      .find({})
      .sort({ created_at: -1 })
      .toArray();

    res.json({ items: members });
  } catch (error) {
    console.error("Error fetching team members:", error);
    res.status(500).json({ error: "Failed to fetch team members" });
  }
}

/**
 * POST /api/admin/team
 * Admin endpoint to create a new team member
 */
export async function handleCreateTeamMember(req, res) {
  try {
    let value = { ...req.body };

    // Parse social_links if it's a string (comes from FormData)
    if (value.social_links && typeof value.social_links === "string") {
      try {
        value.social_links = JSON.parse(value.social_links);
      } catch (e) {
        value.social_links = {};
      }
    }

    // Validate with schema
    value = createTeamMemberSchema.parse(value);

    // Add uploaded image URL and Cloudinary details if file was uploaded
    let imageDetails = null;
    if (req.file) {
      value.image = req.file.path;
      imageDetails = {
        url: req.file.path,
        filename: req.file.filename,
        public_id: req.file.filename, // Cloudinary public_id
        size: req.file.size,
      };
    }

    const db = await getDb();
    const member = {
      ...value,
      created_at: new Date(),
      updated_at: new Date(),
    };

    const result = await db.collection("team_members").insertOne(member);

    const responseData = {
      _id: result.insertedId.toString(),
      ...value,
      created_at: member.created_at,
      updated_at: member.updated_at,
    };

    res.json({
      status: "success",
      message: `Team member "${value.name}" created successfully`,
      data: responseData,
      ...(imageDetails && { image: imageDetails }),
    });
  } catch (error) {
    if (error.name === "ZodError") {
      const fieldError = error.errors[0];
      const message = `${fieldError.path.join(".")}: ${fieldError.message}`;
      return res.status(400).json({ error: message });
    }
    console.error("Error creating team member:", error);
    res.status(500).json({ error: "Failed to create team member" });
  }
}

/**
 * PUT /api/admin/team/:id
 * Admin endpoint to update a team member
 */
export async function handleUpdateTeamMember(req, res) {
  try {
    const { id } = req.params;
    if (!ObjectId.isValid(id)) {
      return res.status(400).json({ error: "Invalid team member ID" });
    }

    let value = { ...req.body };

    // Parse social_links if it's a string (comes from FormData)
    if (value.social_links && typeof value.social_links === "string") {
      try {
        value.social_links = JSON.parse(value.social_links);
      } catch (e) {
        value.social_links = {};
      }
    }

    // Validate with schema
    value = updateTeamMemberSchema.parse(value);

    // Add uploaded image URL and Cloudinary details if file was uploaded
    let imageDetails = null;
    if (req.file) {
      value.image = req.file.path;
      imageDetails = {
        url: req.file.path,
        filename: req.file.filename,
        public_id: req.file.filename, // Cloudinary public_id
        size: req.file.size,
      };
    }

    const db = await getDb();
    const result = await db.collection("team_members").updateOne(
      { _id: new ObjectId(id) },
      {
        $set: {
          ...value,
          updated_at: new Date(),
        },
      }
    );

    if (result.matchedCount === 0) {
      return res.status(404).json({ error: "Team member not found" });
    }

    // Fetch the updated member to return in response
    const updatedMember = await db
      .collection("team_members")
      .findOne({ _id: new ObjectId(id) });

    res.json({
      status: "success",
      message: `Team member "${updatedMember?.name}" updated successfully`,
      data: updatedMember,
      ...(imageDetails && { image: imageDetails }),
    });
  } catch (error) {
    if (error.name === "ZodError") {
      const fieldError = error.errors[0];
      const message = `${fieldError.path.join(".")}: ${fieldError.message}`;
      return res.status(400).json({ error: message });
    }
    console.error("Error updating team member:", error);
    res.status(500).json({ error: "Failed to update team member" });
  }
}

/**
 * DELETE /api/admin/team/:id
 * Admin endpoint to delete a team member
 */
export async function handleDeleteTeamMember(req, res) {
  try {
    const { id } = req.params;
    if (!ObjectId.isValid(id)) {
      return res.status(400).json({ error: "Invalid team member ID" });
    }

    const db = await getDb();

    // Fetch member before deletion to get name for message
    const memberToDelete = await db
      .collection("team_members")
      .findOne({ _id: new ObjectId(id) });

    const result = await db
      .collection("team_members")
      .deleteOne({ _id: new ObjectId(id) });

    if (result.deletedCount === 0) {
      return res.status(404).json({ error: "Team member not found" });
    }

    res.json({
      status: "success",
      message: `Team member "${memberToDelete?.name}" deleted successfully`,
    });
  } catch (error) {
    console.error("Error deleting team member:", error);
    res.status(500).json({ error: "Failed to delete team member" });
  }
}
