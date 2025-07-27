const express = require('express');
const cors = require('cors');
const path = require('path');
const multer = require('multer');

const app = express();
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// ---- In-memory storage ----
let users = [];      // { id, email, password }
let messages = [];   // { content, voiceFile, sender, createdAt }

// ---- Auth Middleware ----
function auth(req, res, next) {
  const token = req.headers.authorization;
  const user = users.find(u => u.id === token);
  if (!user) return res.status(401).json({ error: 'Unauthorized' });
  req.user = user;
  next();
}

// ---- Auth Routes ----
app.post('/api/auth/register', (req, res) => {
  const { email, password } = req.body;
  if (users.find(u => u.email === email)) {
    return res.status(400).json({ error: 'User already exists' });
  }
  const newUser = { id: Date.now().toString(), email, password };
  users.push(newUser);
  res.json({ token: newUser.id, email: newUser.email });
});

app.post('/api/auth/login', (req, res) => {
  const { email, password } = req.body;
  const user = users.find(u => u.email === email && u.password === password);
  if (!user) return res.status(400).json({ error: 'Invalid credentials' });
  res.json({ token: user.id, email: user.email });
});

// ---- Messages Routes ----
app.get('/api/messages', auth, (req, res) => {
  res.json(messages);
});

app.post('/api/messages', auth, (req, res) => {
  const { content } = req.body;
  const msg = { content, sender: req.user.email, createdAt: new Date() };
  messages.push(msg);
  res.json(msg);
});

// ---- Voice Messages ----
const storage = multer.diskStorage({
  destination: path.join(__dirname, 'uploads'),
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  }
});
const upload = multer({ storage });

app.post('/api/messages/voice', auth, upload.single('voice'), (req, res) => {
  const msg = { voiceFile: `/uploads/${req.file.filename}`, sender: req.user.email, createdAt: new Date() };
  messages.push(msg);
  res.json(msg);
});

// ---- Serve frontend build ----
app.use(express.static(path.join(__dirname, 'public')));
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'public', 'index.html'));
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on ${PORT}`));
