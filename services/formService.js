import Language from "../models/languageModel.js";
import Category from "../models/categoryModel.js";
import Age from "../models/ageModel.js";
import Cover from "../models/coverModel.js";
import Author from "../models/authorModel.js";

const renameAuthorFields =  async () => {
    try {
        const authors = await Author.find().populate("author_id");
        const renameKeys = authors.map(author => {
            author.author_id = author.author_id.map(el => {
                el.text = `${el.name} ${el.surname}`;
                el.text_ukr = `${el.name_urk} ${el.surname_ukr}`;
                delete el.name;
                delete el.surname;
                delete el.name_ukr;
                delete el.surname_ukr;

                return el
            });
            return author;
        });
        return renameKeys;
    } catch (err) {
        console.log(err);
    } 
}

const renameLanguageFields = async () => {
    try {
        const language = await Language.find();
        const renameKeys = language.map(item => {
            return {
                _id: item._id,
                text: item.language,
                __v: item.__v,
                text_ukr: item.language_ukr
            };
            });
        return renameKeys
    } catch (err) {
        console.log(err);
    }
}

const renameAgeFields = async () => {
    try {
        const age = await Age.find();
        const renameKeys = age.map(item => {
            return {
                _id: item._id,
                text: item.age,
                __v: item.__v,
                text_ukr: item.age_ukr
            };
            });
        return renameKeys
      } catch (err) {
        console.log(err);
      }
    
}

const renameCoverFields  = async () => {
    try {
        const cover = await Cover.find();
        const renameKeys = cover.map(item => {
            return {
                _id: item._id,
                text: item.cover_type,
                __v: item.__v,
                text_ukr: item.cover_type_ukr
            };
            });
        return renameKeys
      } catch (err) {
        console.log(err);
      } 
}

const renameGenreFields =  async () => {
    try {
        const categories = await Category.find().populate("genre_id");
        const renameKeys = categories.map(category => {
              category.genre_id = category.genre_id.map(el => {    
              el.text = el.genre;     
              el.text_ukr = el.genre_ukr;
              delete el.genre;
              delete el.genre_ukr;
              return el
    
            });
            return category;
          });
          return renameKeys;
      } catch (err) {
        console.log(err);
      } 
}

export const sortingFormFields = async () => {
        try {
            const filters = {
                "categoryName__ukr": "Фільтри",
                "categoryName__eng": "Filters",
                "filters": [
                    { "text": "New Arrivals", "text_ukr": "Новинки", "_id": "001" },
                    { "text": "Promotions", "text_ukr": "Акції", "_id": "002" },
                    { "text": "Bestsellers", "text_ukr": "Бестселери", "_id": "003" }
                ],
            };

            const authorFields = await renameAuthorFields()
            const modifiedAuthor = {
                "categoryName__ukr": "Автор",
                "categoryName__eng": "Author",
                "filters": authorFields
            };

            const languageFields = await renameLanguageFields()
            const modifiedLanguage = {
                "categoryName__ukr": "Мова",
                "categoryName__eng": "Language",
                "filters": languageFields
            };

            const categoryFields = await renameGenreFields();
            const modifiedCategory = {
                "categoryName__ukr": "Жанр",
		        "categoryName__eng": "Genre",
                "filters_dropdown": categoryFields
            }
            
            const ageFields = await renameAgeFields()
            const modifiedAge = {
                "categoryName__ukr": "Вік",
		        "categoryName__eng": "Age",
                "filters": ageFields
            }

            const coverFields = await renameCoverFields();
            const modifiedCover = {
                "categoryName__ukr": "Тип обкладинки",
		        "categoryName__eng": "Cover Type",
                "filters": coverFields
            }
        
            const data =  [filters, modifiedAuthor, modifiedLanguage, modifiedCategory, modifiedAge, modifiedCover];
            return data;
    } catch (error) {
        next(error);  // Passes any errors to the global error handler
    }
};
