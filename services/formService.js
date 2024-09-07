import { catchAsync } from "../utils/catchAsync.js";
import Language from "../models/languageModel.js";
import Category from "../models/categoryModel.js";
import Age from "../models/ageModel.js";
import Cover from "../models/coverModel.js";

export const sortingFormFields = async () => {
        try {
            const filters = {
                "categoryName__ukr": "Фільтри",
                "categoryName__eng": "Filters",
                "filters__ukr": [
                    { "name": "New Arrivals", "name_ukr": "Новинки", "id": "001" },
                    { "name": "Promotions", "name_ukr": "Акції", "id": "002" },
                    { "name": "Bestsellers", "name_ukr": "Бестселери", "id": "003" }
                ],
            };
            const language = await Language.find();
            const modifiedLanguage = {
                "categoryName__ukr": "Мова",
                "categoryName__eng": "Language",
                "filters": language};
            
            const category = await Category.find().populate("genre_id");
            const modifiedCategory = {
                "categoryName__ukr": "Жанр",
		        "categoryName__eng": "Genre",
                "filters": category
            }
            
            const age = await Age.find();
            const modifiedAge = {
                "categoryName__ukr": "Вік",
		        "categoryName__eng": "Age",
                "filters": age
            }

            const cover = await Cover.find();
            const modifiedCover = {
                "categoryName__ukr": "Тип обкладинки",
		        "categoryName__eng": "Cover Type",
                "filters": cover
            }
        
            const data =  [filters, modifiedLanguage, modifiedCategory, modifiedAge, modifiedCover];
            return data;
    } catch (error) {
        next(error);  // Passes any errors to the global error handler
    }
};
