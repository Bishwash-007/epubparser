import fs from "fs";
import path from "path";
import { parseEpubAndReturnText } from "../utils/epubParser.js";
import { parsePdfAndReturnText } from "../utils/pdfParser.js";

export async function handleBookUpload(req, res) {
  const file = req.file;
  console.log(file);
  const filePath = file?.path;
  const ext = path.extname(file?.originalname || "").toLowerCase();

  if (!filePath) {
    return res.status(400).json({ error: "No file uploaded." });
  }

  try {
    let text;
    switch (ext) {
      case ".epub":
        text = await parseEpubAndReturnText(filePath);
        break;
      case ".pdf":
        text = await parsePdfAndReturnText(filePath);
        break;
      default:
        throw new Error("Unsupported file type.");
    }

    // Clean up uploaded file
    fs.unlink(filePath, (err) => {
      if (err) console.warn("Failed to remove file:", err);
    });

    res.status(200).json({ text });
  } catch (err) {
    console.error("Parsing error:", err);
    res.status(500).json({ error: "Failed to parse file." });
  }
}
