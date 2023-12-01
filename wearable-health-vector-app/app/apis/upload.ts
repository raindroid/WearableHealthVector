// pages/api/upload.ts
import type { NextApiRequest, NextApiResponse } from "next";
import { IncomingForm } from "formidable";
import { exec } from "child_process";
import { promises as fs } from "fs";

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const data = await new Promise((resolve, reject) => {
      const form = new IncomingForm();
      form.parse(req, (err, fields, files) => {
        if (err) return reject(err);
        resolve(files);
      });
    });

    const file = data.file[0]; // assuming 'file' is the name of your input field
    const filePath = file.filepath;

    // Execute your Python script here
    exec(`python yourscript.py ${filePath}`, (error, stdout, stderr) => {
      if (error) {
        console.error(`Execution error: ${error.message}`);
        return res.status(500).json({ error: error.message });
      }
      if (stderr) {
        console.error(`Stderr: ${stderr}`);
        return res.status(500).json({ error: stderr });
      }
      console.log(`Stdout: ${stdout}`);
      res
        .status(200)
        .json({ message: "File processed successfully", output: stdout });
    });
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
