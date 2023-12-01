const express = require("express");
const multer = require("multer");
const { exec } = require("child_process");
// Set the buffer size to 8MB
const bufferSize = 8 * 1024 * 1024;
const path = require("path");
const cors = require('cors');
const app = express();
const port = 3011; // You can choose any available port

// Enable CORS for all routes and origins
app.use(cors());

app.use(express.json({ limit: '500mb' }));
app.use(express.urlencoded({ limit: '500mb', extended: true }));

app.get("/", (req, res) => {
  res.send("Hello World!");
});

// Custom storage engine
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/"); // Destination folder
  },
  filename: function (req, file, cb) {
    if (path.extname(file.originalname) === ".zip") {
      // Rename the file
      const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
      cb(null, uniqueSuffix + ".zip");
    } else {
      cb(new Error("Only .zip files are allowed"), false);
    }
  },
});

const upload = multer({ storage: storage });

/** Sample front end code
   * <form method="post" enctype="multipart/form-data">
        <input type="file" name="file" />
        <input type="submit" value="Upload File" />
    </form>
   */
app.post("/upload", upload.single("file"), (req, res) => {
  if (!req.file) {
    return res.status(400).send("No file uploaded.");
  }

  const filePath = req.file.path.replace(/^'|'$/g, "");
  console.log(`File uploaded at ${filePath}`);

  // Execute your Python script here
  exec(
    `python3 scripts/test.py ${filePath}`,
    { maxBuffer: bufferSize },
    (error, stdout, stderr) => {
      if (error) {
        console.error(`Execution error: ${error}`);
        return res.status(500).send("Error executing Python script.");
      }

      res.send(stdout);
      console.log(`Send back data`);
    }
  );
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
