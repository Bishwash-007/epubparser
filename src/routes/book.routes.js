import express from 'express';
import multer from 'multer';
import path from 'path';
import { handleBookUpload } from '../controllers/book.controllers.js';

const router = express.Router();
const upload = multer({
  dest: 'uploads/',
  limits: { fileSize: 50 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    const allowedMimes = ['application/epub+zip', 'application/pdf'];
    const ext = path.extname(file.originalname).toLowerCase();
    if (allowedMimes.includes(file.mimetype) || ['.epub', '.pdf'].includes(ext)) {
      cb(null, true);
    } else {
      cb(new Error('Only EPUB and PDF files are allowed!'));
    }
  },
});

// POST /api/books/upload
router.post('/upload', upload.single('file'), handleBookUpload);

export default router;