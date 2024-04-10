POST /upload: Upload a file. Only PDF files are allowed with a maximum size of 10 MB.
POST /login: Generates an access token for authentication.
GET /download/:filename: Download a file by providing the filename in the URL.

File Upload
Files can be uploaded to the server using the /upload endpoint. Only PDF files are allowed, and the maximum file size is limited to 10 MB.

File Download
Files can be downloaded from the server using the /download/:filename endpoint. Provide the filename in the URL to download the corresponding file

Security
Uploaded files are restricted to PDF format only to prevent malicious file uploads.
The file size is limited to 10 MB to prevent large file uploads that may impact server performance.
Access to the download endpoint requires authentication using JWT tokens to ensure secure file access.
