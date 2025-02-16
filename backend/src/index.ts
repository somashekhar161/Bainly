import express from "express";
import jwt from "jsonwebtoken";
import { configDotenv } from "dotenv";
import { JWT_SECRET, MONGOURI, PORT } from "./config";
import { ContentModel, LinkModel, UserModel } from "./db";
import mongoose from "mongoose";
import { string, z } from "zod";
import bcryptjs from "bcryptjs";
import { MongoError } from "mongodb";
import { userMiddleware } from "./middleware";
import { random } from "./utils";

configDotenv();
const app = express();
app.use(express.json());

const userSchema = z.object({
  username: string()
    .min(3, "Username must be between 3 and 15 characters")
    .max(15, "Username must be between 3 and 15 characters"),
  password: string()
    .min(8, "Password must be between 8 and 20 characters")
    .max(20, "Password must be between 8 and 20 characters")
    .regex(
      /(?=.*[A-Z])/,
      "Password must contain at least one uppercase character"
    )
    .regex(
      /(?=.*[a-z])/,
      "Password must contain at least one lowercase character"
    )
    .regex(
      /(?=.*[\W_])/,
      "Password must contain at least one special character"
    ),
});

app.post("/api/v1/signup", async (req, res) => {
  const { success, error } = userSchema.safeParse(req.body);
  if (error) {
    const errorMessage = error.issues.map((detail) => {
      return {
        field: detail.path[0],
        message: detail.message,
      };
    });
    res.status(400).json({ message: "invalid data", error: errorMessage });
    return;
  }
  const { username, password } = req.body;
  try {
    const hashedPassword = await bcryptjs.hash(password, 5);
    await UserModel.create({
      username,
      password: hashedPassword,
    });

    res.json({ message: "User signed up" });
  } catch (error) {
    if (error instanceof MongoError && error.code && error.code === 11000) {
      res.status(400).json({ message: "This username is already taken" });
      return;
    }

    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

app.post("/api/v1/signin", async (req, res) => {
  const { error } = userSchema.safeParse(req.body);
  if (error) {
    const errorMessage = error.issues.map((detail) => {
      return {
        field: detail.path[0],
        message: detail.message,
      };
    });
    res.status(400).json({ message: "invalid data", error: errorMessage });
    return;
  }
  const { username, password } = req.body;
  const existingUser = await UserModel.findOne({ username });
  if (existingUser) {
    const validatePassword = await bcryptjs.compare(
      password,
      existingUser.password
    );

    if (!validatePassword) {
      res.status(403).json({ message: "invalid password" });
      return;
    }
    // Generate a JWT token with the user's ID.
    const token = jwt.sign(
      { id: existingUser._id, name: existingUser.username },
      JWT_SECRET,
      { expiresIn: "1d" }
    );
    res.json({
      data: {
        token,
        user: {
          username,
        },
      },
    }); // Send the token in response.
    return;
  } else {
    // Send error response for invalid credentials.
    res.status(403).json({ message: "Incorrect credentials" });
    return;
  }
});

app.post("/api/v1/content", userMiddleware, async (req, res) => {
  const { link, title, type } = req.body;

  await ContentModel.create({
    link,
    type,
    title,

    userId: req.userId,

    tags: [],
  });
  res.json({ message: "content added" });
});

app.get("/api/v1/content", userMiddleware, async (req, res) => {
  const content = await ContentModel.find({ userId: req.userId }).populate(
    "userId",
    "username"
  );
  res.json({ data: content });
});

app.delete("/api/v1/content", userMiddleware, async (req, res) => {
  const contentId = req.body.contentId;
  if (contentId) {
    await ContentModel.deleteOne({
      _id: contentId,

      userId: req.userId,
    });
    res.json({ message: "content deleted" });
    return;
  }
  res.status(404).json({
    message: "please send content id",
  });
});

app.post("/api/v1/brain/share", userMiddleware, async (req, res) => {
  const share = req.body.share;
  if (share) {
    const existingData = await LinkModel.findOne({
      userId: req.userId,
    });
    if (existingData) {
      res.json({ data: { link: `/api/v1/brain/${existingData.hash}` } });
      return;
    } else {
      const data = await LinkModel.create({
        userId: req.userId,
        hash: random(20),
      });
      if (data) {
        res.json({ data: { link: `/api/v1/brain/${data.hash}` } });

        return;
      }
    }
  } else {
    await LinkModel.deleteOne({
      userId: req.userId,
    });
    res.json({ message: "updated sharable link status" });
    return;
  }
  res.json({ message: "failed to generate sharable link" });
});

app.get("/api/v1/brain/:shareLink", userMiddleware, async (req, res) => {
  const shareHash = req.params.shareLink;

  if (shareHash) {
    const linkResult = await LinkModel.findOne({
      hash: shareHash,
    });

    if (!linkResult) res.status(404).json({ message: "invalid link" });

    const content = await ContentModel.find({
      userId: linkResult?.userId,
    }).populate("userId", "username");

    res.json({ data: content });
    return;
  }
  res.status(404).json({ message: "error finding shared content" });
});

app.listen(PORT, () => {
  console.log(`Server running at ${PORT}`);
});
