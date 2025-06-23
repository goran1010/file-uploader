import session from "express-session";
import connectPgSimple from "connect-pg-simple";
const PgSession = connectPgSimple(session);
import pool from "../db/pool.js";
import dotenv from "dotenv";
dotenv.config();
const NUMBER_OF_DAYS = 30;

const COOKIE_SECRET = process.env.COOKIE_SECRET;

const sessionMiddleware = session({
  store: new PgSession({
    pool: pool,
    tableName: "session",
  }),
  secret: "TEMP_SECRET",
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: NUMBER_OF_DAYS * 24 * 60 * 60 * 1000,
  },
});

export default sessionMiddleware;
