
import { getAuth } from "@clerk/express";
import { User } from "../models/user.model.js";
import { ENV } from "../config/env.js";

export const protectRoute = async (req, res, next) => {
  try {
    const { userId } = getAuth(req);

    if (!userId) {
      return res.status(401).json({
        message: "Unauthorized - invalid token",
      });
    }

    const user = await User.findOne({ clerkId: userId });

    if (!user) {
      return res.status(401).json({
        message: "Unauthorized - user not found",
      });
    }

    req.user = user;
    return next();
  } catch (error) {
    console.error("Error in protectRoute middleware:", error);

    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

export const adminOnly = (req, res, next) => {
  if (!req.user) {
    return res.status(401).json({
      message: "Unauthorized - user not found",
    });
  }

  if (req.user.email !== ENV.ADMIN_EMAIL) {
    return res.status(403).json({
      message: "Forbidden - admin only",
    });
  }

  return next();
};
