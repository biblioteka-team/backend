import AdminJS from "adminjs";
import AdminJSExpress from "@adminjs/express";
import {  Database, Resource } from "@adminjs/mongoose";
import Author from "../models/authorModel.js";
import Book from "../models/bookModel.js";
import Price from "../models/priceModel.js";
import Publisher from "../models/publisherModel.js";
import Language from "../models/languageModel.js";
import Category from "../models/categoryModel.js";
import Storagedata from "../models/storagedataModel.js";

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
        }
    ],
    rootPath: "/api/admin", 
});

export const adminRouter = AdminJSExpress.buildRouter(admin);

