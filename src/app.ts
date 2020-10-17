import express, { Express } from "express";
import mongoose from "mongoose";
import cors from "cors";
import session from "express-session";
import allRoutes from "./routes";
import cookieParser from "cookie-parser";
const MongoDBStore = require("connect-mongodb-session")(session);

const app: Express = express();

const PORT: string | number = process.env.PORT || 4000;

const uri: string = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster0.iwq4h.mongodb.net/${process.env.MONGO_DB}?retryWrites=true&w=majority`;

app.set('trust proxy', 1); // Heroku requests come in as plain http

app.use(cookieParser());
app.use(session({
  secret: process.env.SECRET || "",
  store: new MongoDBStore({ uri, collection: "sessions"}),
  cookie: { 
    maxAge: 600000,
    secure: process.env.SECURE_COOKIE?.toLowerCase() === "true",
    sameSite: process.env.SECURE_COOKIE?.toLowerCase() === "true" ? "none" : undefined
  },
}));

app.use(cors({
  origin: [
    'http://localhost:3000',
    'https://localhost:3000',
    'http://project-connect-client.herokuapp.com',
    'https://project-connect-client.herokuapp.com'
  ],
  credentials: true,
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type', 'Set-Cookie']
}));

app.use(express.json());
app.use(allRoutes);

mongoose.set("useFindAndModify", false);

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true }).then(() =>
    app.listen(PORT, () =>
      console.log(`Server running on http://localhost:${PORT}`)
    )
  )
  .catch(error => {
    throw error
  })