import { Router } from "express";
import { 
    createProduct, 
    getAllProducts,
    updateProduct,
    getAllOrders,
    updateOrderStatus,
    getAllCustomers,
    getDashboardStats
 } from "../controllers/admin.controller.js";
import { adminOnly, protectRoute } from "../middleware/auth.middleware.js";
import { upload } from "../middleware/multer.middleware.js";

const router = Router();

router.use(protectRoute, adminOnly)

//optimization - DRY

router.post("/products", upload.array("images, 3"), createProduct);
router.get("/products", getAllProducts);
router.put("/products/:id", upload.array("images, 3"), updateProduct);

router.get("/orders", getAllOrders);
router.patch("/orders/:orderId/status", updateOrderStatus);

router.get("/customers", getAllCustomers);

router.get("/stats", getDashboardStats);

//PUT: Used for full resource replacment, updating the entire resource
//PATCH: User for partial resource updates, updating a specific part of the resource

export default router;