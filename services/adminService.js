import dotenv from "dotenv";
dotenv.config();

import AdminJS from "adminjs";
import AdminJSExpress from "@adminjs/express";
import { Database, Resource } from "@adminjs/mongoose";
import Author from "../models/authorModel.js";
import Book from "../models/bookModel.js";
import Price from "../models/priceModel.js";
import Publisher from "../models/publisherModel.js";
import Language from "../models/languageModel.js";
import Category from "../models/categoryModel.js";
import Storagedata from "../models/storagedataModel.js";
import Cover from "../models/coverModel.js";
import Age from "../models/ageModel.js";
import Genre from "../models/genreModel.js";
import User from "../models/userModel.js";
import session from "express-session";
import bcrypt from "bcryptjs";
import connectMongo from "connect-mongo";

AdminJS.registerAdapter({ Database, Resource });

export const admin = new AdminJS({
  resources: [
    {
      resource: Author,
    },
    {
      resource: Book,
    },
    {
      resource: Price,
    },
    {
      resource: Publisher,
    },
    {
      resource: Language,
    },
    {
      resource: Category,
    },
    {
      resource: Storagedata,
    },
    {
      resource: Cover,
    },
    {
      resource: Age,
    },
    {
      resource: Genre,
    },
    {
      resource: User,
    },
  ],
  rootPath: "/admin",
});

const db = process.env.DATABASE.replace("<PASSWORD>", process.env.PASSWORD);

const sessionStore = connectMongo.create({
  mongoUrl: db,
  collectionName: "sessions",
  ttl: 14 * 24 * 60 * 60,
});

const authenticate = async (email, password) => {
  const user = await User.findOne({ email });
  if (user) {
    const matched = password === user.password;
    if (matched) {
      return user;
    }
  }
  return null;
};

export const adminRouter = AdminJSExpress.buildAuthenticatedRouter(
  admin,
  {
    authenticate,
    cookieName: "adminjs",
    cookiePassword: process.env.COOKIE_SECRET || "sessionsecret",
  },
  null,
  {
    store: sessionStore,
    resave: false,
    saveUninitialized: true,
    secret: process.env.SESSION_SECRET || "sessionsecret",
    cookie: {
      httpOnly: true,
      secure: false,
    },
  }
);
