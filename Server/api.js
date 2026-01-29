import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
import multer from 'multer';
import { v2 as cloudinary } from 'cloudinary';
import { PassThrough } from 'stream';
import Admin from './models/Admin.js';
import News from './models/News.js';

dotenv.config();

const app = express();
const CLIENT_URL = process.env.CLIENT_URL || "http://localhost:5173";
const allowedOrigins = [
  CLIENT_URL,
  "http://localhost:5173",
  "http://localhost:5174",
  "https://dskinnovafdin.vercel.app",
  "https://skinera.vercel.app",
  "https://skinera-server.vercel.app"
];

app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    
    if (allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// MongoDB connection
const MONGO_URI = process.env.MONGO_URI || process.env.MONGODB_URI;

let isConnected = false;

async function connectDb() {
  if (isConnected) return;

  try {
    await mongoose.connect(MONGO_URI, {
      maxPoolSize: 10,
      serverSelectionTimeoutMS: 5000,
    });
    isConnected = true;
    console.log("MongoDB connected");
  } catch (error) {
    console.error("MongoDB connection error:", error);
    throw error;
  }
}

// Cloudinary config
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 5 * 1024 * 1024 },
});

function uploadToCloudinary(buffer, folder) {
  return new Promise((resolve, reject) => {
    const pass = new PassThrough();
    const opts = { folder };
    const uploadStream = cloudinary.uploader.upload_stream(
      opts,
      (err, result) => {
        if (err) return reject(err);
        resolve(result);
      }
    );
    pass.end(buffer);
    pass.pipe(uploadStream);
  });
}

// Slug generation utility
function slugify(text) {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^\w\-]+/g, '')
    .replace(/\-\-+/g, '-')
    .replace(/^-+/, '')
    .replace(/-+$/, '');
}

async function generateUniqueSlug(baseSlug) {
  const existing = await News.find({ slug: new RegExp(`^${baseSlug}(-\\d+)?$`) }, 'slug').lean();
  if (existing.length === 0) return baseSlug;

  let max = 1;
  for (const doc of existing) {
    const m = doc.slug.match(new RegExp(`^${baseSlug}-(\\d+)$`));
    if (m) {
      const n = parseInt(m[1], 10);
      if (!Number.isNaN(n) && n > max) max = n;
    }
  }
  return `${baseSlug}-${max + 1}`;
}

// Middleware to ensure DB connection
app.use(async (req, res, next) => {
  try {
    await connectDb();
    next();
  } catch (error) {
    res.status(500).json({ error: "Database connection failed" });
  }
});

// Routes
app.get('/', (req, res) => {
  res.json({
    message: "Dskinova server API is working",
    status: "ok"
  });
});

// Admin login route
app.post('/api/admin-login', async (req, res) => {
  try {
    const { username, password } = req.body || {};
    if (!username || !password) {
      return res.status(400).json({
        success: false,
        message: "Username and password are required",
      });
    }

    const admin = await Admin.findOne({ username });
    if (!admin) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid credentials" });
    }

    const ok = await bcrypt.compare(password, admin.passwordHash);
    if (!ok) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid credentials" });
    }

    // For simplicity, return a lightweight session token substitute
    // In production, use JWT/cookies. Here we just signal success.
    return res.json({ success: true, message: "Login successful" });
  } catch (err) {
    console.error("Login error:", err);
    return res.status(500).json({ success: false, message: "Server error" });
  }
});

// Get profile (username only)
app.get('/api/admin/profile', async (req, res) => {
  try {
    const admin = await Admin.findOne({});
    if (!admin)
      return res
        .status(404)
        .json({ success: false, message: "Admin not found" });
    return res.json({ success: true, username: admin.username });
  } catch (err) {
    console.error("Profile error:", err);
    return res.status(500).json({ success: false, message: "Server error" });
  }
});

// Change password
app.post('/api/admin/change-password', async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body || {};
    if (!currentPassword || !newPassword) {
      return res.status(400).json({
        success: false,
        message: "Both currentPassword and newPassword are required",
      });
    }
    if (String(newPassword).length < 6) {
      return res.status(400).json({
        success: false,
        message: "New password must be at least 6 characters",
      });
    }
    const admin = await Admin.findOne({});
    if (!admin)
      return res
        .status(404)
        .json({ success: false, message: "Admin not found" });
    const ok = await bcrypt.compare(currentPassword, admin.passwordHash);
    if (!ok)
      return res
        .status(401)
        .json({ success: false, message: "Current password is incorrect" });
    admin.passwordHash = await bcrypt.hash(newPassword, 10);
    await admin.save();
    return res.json({ success: true, message: "Password updated" });
  } catch (err) {
    console.error("Change password error:", err);
    return res.status(500).json({ success: false, message: "Server error" });
  }
});

// Change username
app.post('/api/admin/change-username', async (req, res) => {
  try {
    const { password, newUsername } = req.body || {};
    if (!password || !newUsername) {
      return res.status(400).json({
        success: false,
        message: "Both password and newUsername are required",
      });
    }
    if (String(newUsername).trim().length < 3) {
      return res.status(400).json({
        success: false,
        message: "Username must be at least 3 characters",
      });
    }
    const admin = await Admin.findOne({});
    if (!admin)
      return res
        .status(404)
        .json({ success: false, message: "Admin not found" });
    const ok = await bcrypt.compare(password, admin.passwordHash);
    if (!ok)
      return res
        .status(401)
        .json({ success: false, message: "Password is incorrect" });
    admin.username = String(newUsername).trim();
    await admin.save();
    return res.json({
      success: true,
      message: "Username updated",
      username: admin.username,
    });
  } catch (err) {
    if (err?.code === 11000) {
      return res
        .status(409)
        .json({ success: false, message: "Username already in use" });
    }
    console.error("Change username error:", err);
    return res.status(500).json({ success: false, message: "Server error" });
  }
});

// Logout (stateless – provided for completeness)
app.post('/api/admin-logout', (req, res) => {
  return res.json({ success: true, message: "Logged out" });
});

// Health route
app.get('/api/health', (req, res) => {
  res.json({ ok: true });
});

// News: list
app.get('/api/news', async (req, res) => {
  try {
    const items = await News.find({}).sort({ createdAt: -1 }).lean();
    res.json({ success: true, items });
  } catch (err) {
    console.error("List news error:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

// News: latest N (default 4) lightweight payload
app.get('/api/news/latest', async (req, res) => {
  try {
    let limit = parseInt(req.query.limit, 10);
    if (Number.isNaN(limit) || limit <= 0) limit = 4;
    // Cap limit to avoid excessive payloads
    if (limit > 24) limit = 24;
    const items = await News.find(
      {},
      "slug title excerpt date cardImage createdAt"
    )
      .sort({ createdAt: -1 })
      .limit(limit)
      .lean();
    res.json({ success: true, items });
  } catch (err) {
    console.error("Latest news error:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

// News: get by slug
app.get('/api/news/:slug', async (req, res) => {
  try {
    const item = await News.findOne({ slug: req.params.slug }).lean();
    if (!item)
      return res.status(404).json({ success: false, message: "Not found" });
    res.json({ success: true, item });
  } catch (err) {
    console.error("Get news error:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

// News: create (multipart form with optional images)
app.post(
  '/api/news',
  upload.fields([
    { name: 'cardImage', maxCount: 1 },
    { name: 'contentImage', maxCount: 1 },
  ]),
  async (req, res) => {
    try {
      const {
        title = '',
        excerpt = '',
        heroIntro = '',
        contentIntro = '',
        paragraphs = '[]',
        tags = '[]',
        popular = '[]',
      } = req.body || {};

      if (!title.trim()) {
        return res
          .status(400)
          .json({ success: false, message: 'Title is required' });
      }
      const baseSlug = slugify(title) || 'news';

      // Upload images if provided
      let cardImageUrl = '';
      let contentImageUrl = '';
      if (req.files?.cardImage?.[0]) {
        const result = await uploadToCloudinary(
          req.files.cardImage[0].buffer,
          'dskinova/news'
        );
        cardImageUrl = result.secure_url;
      }
      if (req.files?.contentImage?.[0]) {
        const result = await uploadToCloudinary(
          req.files.contentImage[0].buffer,
          'dskinova/news'
        );
        contentImageUrl = result.secure_url;
      }

      const parsedParagraphs = JSON.parse(paragraphs || '[]');
      const parsedTags = JSON.parse(tags || '[]');
      const parsedPopular = JSON.parse(popular || '[]');
      const basePayload = {
        title: title.trim(),
        excerpt,
        heroIntro,
        cardImage: cardImageUrl,
        content: {
          intro: contentIntro,
          image: contentImageUrl,
          paragraphs: Array.isArray(parsedParagraphs) ? parsedParagraphs : [],
          tags: Array.isArray(parsedTags) ? parsedTags : [],
        },
        popular: Array.isArray(parsedPopular) ? parsedPopular : [],
      };

      // First attempt with next available slug
      try {
        const slug1 = await generateUniqueSlug(baseSlug);
        const doc1 = await News.create({ ...basePayload, slug: slug1 });
        return res.json({ success: true, item: doc1 });
      } catch (e1) {
        if (e1?.code === 11000) {
          // Race condition: compute again and retry once
          const slug2 = await generateUniqueSlug(baseSlug);
          const doc2 = await News.create({ ...basePayload, slug: slug2 });
          return res.json({ success: true, item: doc2 });
        }
        throw e1;
      }
    } catch (err) {
      console.error('Create news error:', err);
      res.status(500).json({ success: false, message: 'Server error' });
    }
  }
);

// News: update by slug (multipart optional images)
app.put(
  '/api/news/:slug',
  upload.fields([
    { name: 'cardImage', maxCount: 1 },
    { name: 'contentImage', maxCount: 1 },
  ]),
  async (req, res) => {
    try {
      const slug = req.params.slug;
      const doc = await News.findOne({ slug });
      if (!doc) {
        return res.status(404).json({ success: false, message: 'Not found' });
      }

      const {
        title,
        excerpt,
        heroIntro,
        contentIntro,
        paragraphs,
        tags,
        popular,
      } = req.body || {};

      if (typeof title === 'string' && title.trim()) doc.title = title.trim();
      if (typeof excerpt === 'string') doc.excerpt = excerpt;
      if (typeof heroIntro === 'string') doc.heroIntro = heroIntro;
      if (typeof contentIntro === 'string') doc.content.intro = contentIntro;

      if (typeof paragraphs !== 'undefined') {
        try {
          const arr = JSON.parse(paragraphs || '[]');
          doc.content.paragraphs = Array.isArray(arr) ? arr : [];
        } catch {}
      }
      if (typeof tags !== 'undefined') {
        try {
          const arr = JSON.parse(tags || '[]');
          doc.content.tags = Array.isArray(arr) ? arr : [];
        } catch {}
      }
      if (typeof popular !== 'undefined') {
        try {
          const arr = JSON.parse(popular || '[]');
          doc.popular = Array.isArray(arr) ? arr : [];
        } catch {}
      }

      if (req.files?.cardImage?.[0]) {
        const result = await uploadToCloudinary(
          req.files.cardImage[0].buffer,
          'dskinova/news'
        );
        doc.cardImage = result.secure_url;
      }
      if (req.files?.contentImage?.[0]) {
        const result = await uploadToCloudinary(
          req.files.contentImage[0].buffer,
          'dskinova/news'
        );
        doc.content.image = result.secure_url;
      }

      await doc.save();
      res.json({ success: true, item: doc });
    } catch (err) {
      console.error('Update news error:', err);
      res.status(500).json({ success: false, message: 'Server error' });
    }
  }
);

// News: delete by slug
app.delete('/api/news/:slug', async (req, res) => {
  try {
    const result = await News.findOneAndDelete({ slug: req.params.slug });
    if (!result) {
      return res.status(404).json({ success: false, message: 'Not found' });
    }
    res.json({ success: true, message: 'Deleted' });
  } catch (err) {
    console.error('Delete news error:', err);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// For Vercel serverless deployment
export default app;

// For local development
if (process.env.NODE_ENV !== 'production') {
  const PORT = process.env.PORT || 3002;
  connectDb()
    .then(() => {
      app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
        console.log(`API available at: http://localhost:${PORT}/api`);
      });
    })
    .catch((err) => {
      console.error("Failed to start server:", err);
      process.exit(1);
    });
}
