const express = require('express');
const jwt = require('jsonwebtoken');
const Message = require('../models/Message');
const router = express.Router();

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

router.get('/', auth, async (req, res) => {
  const msgs = await Message.find({ user: req.user.id });
  res.json(msgs);
});

router.post('/', auth, async (req, res) => {
  const { type, content } = req.body;
  const msg = new Message({ user: req.user.id, type, content });
  await msg.save();
  res.json(msg);
});

module.exports = router;
