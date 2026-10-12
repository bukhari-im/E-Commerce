import { Router } from "express";
import { addAddress,
         getAddress,
         updateAddress,
         deleteAddress,
         addToWishlist,
         removeFromWishlist,
         getWishlist } from "../controllers/user.controller.js";
import { protectRoute } from "../middleware/auth.middleware.js";

const router = Router();

router.use(protectRoute);

//address routes

router.post("/addresses", addAddress);
router.get("/addresses", getAddress);
router.put("/addresses/addresId", updateAddress);
router.delete("/addresses/addresId", deleteAddress);

//wishlist routes

router.post("/wishList", addToWishlist);
router.delete("/wishList/:productId", removeFromWishlist);
router.get("/wishList", getWishlist);

export default router;