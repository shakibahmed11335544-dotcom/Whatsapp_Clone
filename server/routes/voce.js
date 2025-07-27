const express = require('express');
const multer = require('multer');
const jwt = require('jsonwebtoken');
const path = require('path');
const Message = require('../models/Message');
const router = express.Router();

const storage = multer.diskStorage({
  destination: './uploads',
  filename: (_, file, cb) => cb(null, Date.now() + path.extname(file.originalname))
});
const upload = multer({ storage });

function auth(req, res, next) {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ error: 'No token' });
  try {
    req.user = jwt.verify(token, process.env.JWT_SECRET);
    next();
  } catch {
    res.status(401).json({ error: 'Invalid token' });
  }
}

router.post('/voice', auth, upload.single('voice'), async (req, res) => {
  const filePath = `/uploads/${req.file.filename}`;
  const msg = new Message({ user: req.user.id, type: 'voice', content: filePath });
  await msg.save();
  res.json(msg);
});

module.exports = router;
