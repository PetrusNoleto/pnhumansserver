import * as dotenv from "dotenv";
dotenv.config();

export const jwtSecretKey = process.env.JWTKEY as string
export const databaseSecretKet = process.env.DATABASE_KEY as string