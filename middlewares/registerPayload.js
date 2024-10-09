import { body, validationResult } from "express-validator";

export const registerValidation = [
  body("name").isString().trim(),

  body("surname").isString().trim(),

  body("email").isString().isEmail().withMessage("Email not valid").trim(),

  body("password")
    .isString()
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long")
    .trim(),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ status: 400, errors: errors.array() });
    }
    next();
  },
];
