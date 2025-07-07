import express from 'express';
import multer from 'multer';
import fs from 'fs';
import path from 'path';
import { parseEpubAndReturnText } from '../utils/epubParser.js';
import { log } from 'console';

const router = express.Router();

const upload = multer({
  dest: 'uploads/',
  limits: { fileSize: 50 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    if (file.mimetype === 'application/epub+zip' || file.originalname.endsWith('.epub')) {
      cb(null, true);
    } else {
      cb(new Error('Only EPUB files are allowed!'));
    }
  },
});

// Route: POST /api/books/upload
router.post('/upload', upload.single('epub'), async (req, res) => {
  const filePath = req.file?.path;

  if (!filePath) {
    return res.status(400).json({ error: 'No file uploaded.' });
  }

  try {
    const text = await parseEpubAndReturnText(filePath);
    
    fs.unlink(filePath, () => {});
    
    res.status(200).json({ text });

  } catch (error) {
    console.error('EPUB parsing error:', error.message);
    res.status(500).json({ error: 'Failed to parse EPUB file.' });
  }
});

export default router;