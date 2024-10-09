import dotenv from "dotenv";
dotenv.config();

import nodemailer from "nodemailer";
import jwt from "jsonwebtoken";
import User from "../models/userModel.js";
import AppErrors from "../constants/errors.js";
import AppMessages from "../constants/messages.js";
import bcrypt from "bcryptjs";

const checkUniqueEmail = async (email) => {
  const user = await User.findOne({ email });
  return !!user;
};

const sendConfirmationEmail = async (email, token) => {
  const transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
      user: process.env.EMAIL_USERNAME,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  const confirmationUrl = `${process.env.BACKEND_URL}/api/auth/confirm-email?token=${token}`;

  try {
    await transporter.sendMail({
      from: process.env.EMAIL_USERNAME,
      to: email,
      subject: "Email Confirmation",
      text: `Please confirm your email by clicking the following link: ${confirmationUrl}`,
    });
  } catch (error) {
    console.log(error);

    throw new Error(error);
  }
};

const generateToken = (payload) => {
  return jwt.sign({ payload }, process.env.JWT_TOKEN_SECRET, {
    expiresIn: "10h",
  });
};

const generateEmailConfirmationToken = (email) => {
  return jwt.sign({ email }, process.env.JWT_TOKEN_SECRET, {
    expiresIn: "1h",
  });
};

export const registerService = async (userData) => {
  const isUniqueEmail = await checkUniqueEmail(userData.email);
  if (isUniqueEmail) {
    return {
      status: 409,
      errors: [{ msg: AppErrors.conflictEmail }],
    };
  }
  userData.password = await bcrypt.hash(userData.password, 10);

  const newUser = new User({
    ...userData,
    role: "user",
  });
  await newUser.save();

  const token = generateEmailConfirmationToken(newUser.email);
  await sendConfirmationEmail(newUser.email, token);

  return { status: 201, errors: [{ msg: AppMessages.confirmEmail }] };
};

export const confirmEmail = async (token) => {
  if (!token) {
    return {
      status: 400,
      errors: [{ msg: AppErrors.tokenRequired }],
    };
  }

  const decoded = jwt.verify(token, process.env.JWT_TOKEN_SECRET);
  const user = await User.findOne({ email: decoded.email });

  if (!user) {
    return {
      status: 404,
      errors: [{ msg: AppErrors.userNotFound }],
    };
  }

  user.isConfirmed = true;
  await user.save();

  return {
    status: 201,
    errors: [{ msg: AppMessages.emailConfirmedSuccess }],
  };
};

export const decodeToken = async (request) => {
  try {
    const authHeader = request.headers.authorization;
    const token = authHeader.split(" ")[1];

    return jwt.decode(token);
  } catch (error) {
    throw new Error(AppErrors.userNotFound);
  }
};

export const loginUser = async ({ password, email }) => {
  const existUser = await User.findOne({ email });

  if (!existUser) {
    return {
      status: 404,
      errors: [{ msg: AppError.userNotFound }],
    };
  }

  if (!existUser.isConfirmed) {
    return {
      status: 403,
      errors: [{ msg: AppError.emailNotConfirmed }],
    };
  }

  const validatePassword = await bcrypt.compare(password, existUser.password);

  if (!validatePassword) {
    return {
      status: 401,
      errors: [{ msg: AppError.unauthorized }],
    };
  }

  const token = await generateToken(existUser);

  return {
    status: 201,
    token,
  };
};

export const getUserByToken = async (request) => {
  try {
    const decoded = await decodeToken(request);

    console.log(decoded);

    const user = await User.findOne({ _id: decoded.payload._id });

    return {
      status: 201,
      user,
    };
  } catch (error) {
    throw new Error(AppError.invalidToken);
  }
};
