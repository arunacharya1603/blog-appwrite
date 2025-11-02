# Appwrite Image Loading Fix Guide

## Problem
Images are not loading in production with error: "Failed to load image"

## Root Causes & Solutions

### 1. **Bucket Permissions (Most Common Issue)**

Go to your Appwrite Console:
1. Navigate to **Storage** → Select your bucket
2. Click on **Settings** tab
3. Under **Permissions**, ensure you have:
   - **Read** permission set to `Any` or `Users` (not just specific user IDs)
   - For public blog posts, use `Any` for read permissions

**Recommended Permissions:**
- Read: `Any` (allows everyone to view images)
- Create: `Users` (only authenticated users can upload)
- Update: `Users` (only authenticated users can update)
- Delete: `Users` (only authenticated users can delete)

### 2. **CORS Configuration**

In Appwrite Console:
1. Go to **Project Settings**
2. Navigate to **Web** platform
3. Add your production domain to allowed hostnames:
   - Add your Vercel domain (e.g., `https://your-app.vercel.app`)
   - Add `localhost:5173` for development
   - Add any custom domains

### 3. **Environment Variables**

Verify in your Vercel dashboard:
1. Go to **Settings** → **Environment Variables**
2. Ensure all these are set correctly:
   ```
   VITE_APPWRITE_URL=https://cloud.appwrite.io/v1
   VITE_APPWRITE_PROJECT_ID=your_project_id
   VITE_APPWRITE_DATABASE_ID=your_database_id
   VITE_APPWRITE_COLLECTION_ID=your_collection_id
   VITE_APPWRITE_BUCKET_ID=your_bucket_id
   ```

### 4. **File ID Format**

Based on your data, the featuredImage is stored as: `"69071d0700128e1aecf5"`
This is correct - it's just the file ID, not a full URL.

## Testing the Fix

After updating permissions, test with this URL format:
```
https://cloud.appwrite.io/v1/storage/buckets/{bucketId}/files/{fileId}/view?project={projectId}
```

Example with your file:
```
https://cloud.appwrite.io/v1/storage/buckets/[YOUR_BUCKET_ID]/files/69071d0700128e1aecf5/view?project=[YOUR_PROJECT_ID]
```

## Quick Debug Steps

1. Open browser console
2. Look for the exact URL being requested
3. Try opening that URL directly in a new tab
4. Check the error message:
   - 401 = Authentication issue (check permissions)
   - 403 = Forbidden (check bucket permissions)
   - 404 = File not found (check file ID and bucket ID)
   - CORS error = Add domain to Appwrite platform settings

## Code Implementation

The code has been updated with:
1. Better error handling and fallback mechanisms
2. Automatic retry with download URL if view URL fails
3. Detailed console logging for debugging
4. Graceful degradation to placeholder images

## Immediate Action Required

**Go to your Appwrite Console NOW and:**
1. Check bucket permissions - set Read to "Any"
2. Verify your production domain is in Web platform settings
3. Redeploy your application after fixing permissions
