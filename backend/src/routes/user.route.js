import { getAuth } from "@clerk/express";
import { Router } from "express";
import {
  syncUser,
  addAddress,
  getAddress,
  updateAddress,
  deleteAddress,
  addToWishlist,
  removeFromWishlist,
  getWishlist,
} from "../controllers/user.controller.js";
import { protectRoute } from "../middleware/auth.middleware.js";

const router = Router();

// Sinkronisasi pengguna membutuhkan autentikasi Clerk,
// tetapi tidak bergantung pada dokumen User di MongoDB.

router.post("/sync", (req, res, next) => {
  const { userId } = getAuth(req);

  if (!userId) {
    return res.status(401).json({
      message: "Unauthorized",
    });
  }

  next();
}, syncUser);

// Endpoint lainnya membutuhkan dokumen User di MongoDB.
router.use(protectRoute);

router.post("/addresses", addAddress);
router.get("/addresses", getAddress);
router.put("/addresses/:addressId", updateAddress);
router.delete("/addresses/:addressId", deleteAddress);

router.post("/wishList", addToWishlist);
router.delete("/wishList/:productId", removeFromWishlist);
router.get("/wishList", getWishlist);

export default router;