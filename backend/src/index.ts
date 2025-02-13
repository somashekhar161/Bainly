import express from "express";
import jsonwebtoken from "jsonwebtoken";
import dotenv from "dotenv";
import { PORT } from "./config";

dotenv.config();
const app = express();

app.post("/api/v1/signup", (req, res) => {
  res.send("hello worlds");
});

app.post("/api/v1/signin", (req, res) => {
  res.send("hello worlds");
});

app.post("/api/v1/content", (req, res) => {
  res.send("hello worlds");
});

app.get("/api/v1/content", (req, res) => {
  res.send("hello worlds");
});

app.delete("/api/v1/content", (req, res) => {
  res.send("hello worlds");
});

app.post("/api/v1/brain/share", (req, res) => {
  res.send("hello worlds");
});

app.get("/api/v1/brain/:shareLink", (req, res) => {
  res.send("hello worlds");
});

app.listen(PORT, () => {
  console.log(`Server running at ${PORT}`);
});
