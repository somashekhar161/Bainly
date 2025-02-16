import { configDotenv } from "dotenv";

configDotenv();
export const PORT = process.env.PORT || 3000;
export const MONGOURI =
  process.env.MONGOURI || "mongodb://localhost:27017/Brainly";

export const JWT_SECRET =
  process.env.JWT_SECRET || "hjkagshuie.89vy4.uijkasbjk.lhsio8ryub.1802oe";
