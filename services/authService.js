import dotenv from "dotenv";
dotenv.config();

import nodemailer from "nodemailer";
import jwt from "jsonwebtoken";
import User from "../models/userModel.js";
import AppErrors from "../constants/errors.js";
import AppMessages from "../constants/messages.js";

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
  userData.password = generateToken(userData);

  const newUser = new User({
    ...userData,
    role: "user",
  });
  await newUser.save();

  const token = generateEmailConfirmationToken(newUser.email);
  await sendConfirmationEmail(newUser.email, token);

  return { status: 201 };
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
