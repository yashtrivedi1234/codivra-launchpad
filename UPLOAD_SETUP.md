# Image Upload Setup - Cloudinary & Multer

This document explains how the image upload system is configured and how to use it.

## Backend Setup

### 1. Environment Variables

Add these to your `.env` file:

```env
CLOUDINARY_NAME=your_cloudinary_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
```

### 2. Configuration Files

**Backend modules created:**

- `/backend/src/config/cloudinary.mjs` - Cloudinary configuration
- `/backend/src/middleware/upload.middleware.mjs` - Multer file upload middleware
- `/backend/src/config/env.mjs` - Environment variables (updated)

### 3. Middleware Usage

The upload middleware can be used in two ways:

```javascript
import {
  uploadSingle,
  uploadMultiple,
} from "../middleware/upload.middleware.mjs";

// For single file upload
router.post(
  "/api/admin/route",
  requireAdmin,
  uploadSingle("fieldName", "folder/path"),
  controller
);

// For multiple file uploads
router.post(
  "/api/admin/route",
  requireAdmin,
  uploadMultiple("fieldName", maxFiles, "folder/path"),
  controller
);
```

**Parameters:**

- `fieldName`: The name of the form field containing the file (e.g., "image", "icon")
- `folder`: Cloudinary folder path (e.g., "codivra/team", "codivra/services")
- `maxFiles`: Maximum number of files (for multiple uploads)

### 4. Accessing Uploaded File in Controller

```javascript
// In your controller function, req.file will contain:
// {
//   path: "https://cloudinary-url-here.jpg", // Full URL to the image
//   filename: "uploaded-filename",
//   size: 12345,
//   ...
// }

if (req.file) {
  value.image = req.file.path; // Use the URL from Cloudinary
}
```

## Current Routes with Upload Support

### Team Management

- `POST /api/admin/team` - Create team member with image
- `PUT /api/admin/team/:id` - Update team member with image

### Services Management

- `POST /api/admin/services` - Create service with icon image
- `PUT /api/admin/services/:id` - Update service with icon image

## Frontend Implementation

### 1. File Input Component

The AdminTeam and AdminServices components have been updated to include file uploads:

**Features:**

- Image preview before upload
- Drag-and-drop support (via file input)
- File name display
- Automatic FormData creation
- Error handling with toast notifications

### 2. Form Data Handling

When uploading files, the form is converted to FormData:

```javascript
const formDataObj = new FormData();
formDataObj.append("field_name", "value");
formDataObj.append("image", imageFile); // File object

// Send to API
await createMember(formDataObj).unwrap();
```

### 3. API Integration

RTK Query endpoints accept both regular objects and FormData:

```typescript
createTeamMember: builder.mutation<
  { status: string; message: string; data: TeamMember },
  FormData | Omit<TeamMember, "_id" | "created_at" | "updated_at">
>({...})
```

## How to Add Image Upload to Other Routes

### Step 1: Update the route

```javascript
import { uploadSingle } from "../middleware/upload.middleware.mjs";

router.post(
  "/api/admin/newroute",
  requireAdmin,
  uploadSingle("image", "codivra/folder"),
  controller
);
```

### Step 2: Update the controller

```javascript
if (req.file) {
  value.image = req.file.path;
}
```

### Step 3: Update the frontend (optional)

```javascript
const formDataObj = new FormData();
formDataObj.append("field", value);
if (imageFile) {
  formDataObj.append("image", imageFile);
}
await mutation(formDataObj).unwrap();
```

## File Limits & Validation

- **Max File Size:** 5MB per file
- **Allowed Types:** Image files only (MIME type: image/\*)
- **Cloudinary Features:**
  - Automatic image optimization
  - CDN delivery (fast worldwide access)
  - Multiple transformations available
  - Secure cloud storage

## Troubleshooting

### Upload fails with "Cannot find module"

Make sure all packages are installed:

```bash
npm install cloudinary multer-storage-cloudinary
```

### Cloudinary credentials error

Verify your `.env` file has correct credentials from Cloudinary dashboard.

### Files not appearing on Cloudinary

Check that the folder path is correct and Cloudinary credentials have write permissions.

## Example Flow

1. **User selects image** → Preview shown
2. **Form submitted** → FormData created with file
3. **API receives FormData** → Multer processes file
4. **Multer uploads to Cloudinary** → Gets URL back
5. **Controller saves URL to DB** → Returns response
6. **Frontend receives URL** → Shows in list

All handled automatically with optimistic updates and toast notifications!
