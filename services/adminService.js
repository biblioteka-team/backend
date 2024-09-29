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
  ],
  rootPath: "/api/admin",
});

export const adminRouter = AdminJSExpress.buildRouter(admin);
