import mongoose, { model, Schema } from "mongoose";
import { MONGOURI } from "./config";

mongoose.connect(MONGOURI);

const UserSchema = new Schema(
  {
    username: {
      type: String,
      unique: true,
      index: true,
      required: true,
      minlength: 3,
      maxlength: 15,
    },
    password: { type: String, required: true, minlength: 3, maxlength: 100 },
  },
  { timestamps: true }
);

export const UserModel = model("User", UserSchema);
enum ContentType {
  youtube = "youtube",
  twitter = "twitter",
}
const ContentSchema = new Schema(
  {
    title: String,
    link: String,
    type: {
      type: String,
      default: ContentType.youtube,
      enum: Object.values(ContentType), // Use enum for validation
    },
    tags: [
      {
        type: mongoose.Types.ObjectId,
        ref: "Tag",
      },
    ],
    userId: { type: mongoose.Types.ObjectId, ref: "User", required: true },
  },
  { timestamps: true }
);
export const ContentModel = model("Content", ContentSchema);

const LinkSchema = new Schema(
  {
    hash: String,

    userId: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },
  },
  { timestamps: true }
);
export const LinkModel = model("Link", LinkSchema);
