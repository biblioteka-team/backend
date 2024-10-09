import {
  registerService,
  confirmEmail,
  loginUser,
  getUserByToken
} from "../services/authService.js";
import AppErrors from "../constants/errors.js";
import AppMessages from "../constants/messages.js";

const register = async (req, res) => {
  try {
    const response = await registerService(req.body);

    if (response.status !== 201) {
      return res.status(response.status).json({
        status: false,
        errors: response.errors,
      });
    }

    return res.status(response.status).json({
      status: true,
      errors: response.errors,
    });
  } catch (error) {
    return res.status(500).json(AppErrors.serverError);
  }
};

const confirmRegister = async (req, res) => {
  try {
    const response = await confirmEmail(req.query.token);

    if (response.status !== 201) {
      return res.status(response.status).json({
        status: false,
        errors: response.errors,
      });
    }

    return res.status(response.status).json({
      status: true,
      errors: response.errors,
    });
  } catch (error) {
    return res.status(500).json(AppErrors.serverError);
  }
};

const auth = async (req, res) => {
  try {
    const response = await loginUser({
      email: req.body.email,
      password: req.body.password,
    });

    if (response.status !== 201) {
      return res.status(response.status).json({
        status: false,
        errors: response.errors,
      });
    }

    return res.status(response.status).json({
      status: true,
      token: response.token,
    });
  } catch (error) {
    return res.status(500).json(AppErrors.serverError);
  }
};

const checkUser = async (req, res) => {
  try {
    const response = await getUserByToken(req);

    if (response.status !== 201) {
      return res.status(response.status).json({
        status: false,
        errors: response.errors,
      });
    }

    return res.status(response.status).json({
      status: true,
      user: response.user,
    });
  } catch (error) {
    return res.status(500).json(AppErrors.serverError);
  }
};

export default {
  register,
  confirmRegister,
  auth,
  checkUser,
};
