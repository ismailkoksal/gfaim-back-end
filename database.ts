import mysql from "mysql2";
import dotenv from "dotenv";

dotenv.config();

export const connection = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PSWD,
    database: process.env.DB_NAME,
}).promise();
