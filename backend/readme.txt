Multer is a middleware for handling multipart/form-data, which is primarily used for uploading files in Node.js applications using the Express framework.

📦 Key Features of Multer:
Handles file uploads from forms (like <input type="file">)

Stores files to disk or in memory

Supports file size limits, file type filtering, and more

🔄 Alternatives to Multer
While Multer is widely used, there are other libraries depending on the use case:

1. Busboy
A lower-level parser for multipart/form-data

Multer is actually built on top of Busboy

More control, but more complex to use directly

2. Formidable
Handles file uploads and form data

Easier than Busboy, and can work without Express

Suitable for more complex or custom file handling

3. Express-Fileupload
Simple middleware for Express

Easier to set up, less customizable than Multer

Good for small applications or quick setups

4. Multiparty
Similar to Formidable

Works with both Express and other Node.js frameworks

5. Cloud SDKs (for direct-to-cloud uploads)
Use presigned URLs to upload directly to services like:

AWS S3

Google Cloud Storage

Cloudinary

Avoids storing files temporarily on your server
===================================================================================

🧾 JWT in a Nutshell
JWT (JSON Web Token) is a compact and self-contained way to transmit information between parties securely as a JSON object. It’s commonly used for authentication and authorization in web apps.

A JWT is made of 3 parts:
Header.Payload.Signature

Header: contains metadata (e.g., algorithm)

Payload: contains claims (user data)

Signature: ensures integrity (generated using the secret)
code:
        const jwt = require('jsonwebtoken');
        const token = jwt.sign({ userId: 123 }, 'your-secret-key', { expiresIn: '1h' });

