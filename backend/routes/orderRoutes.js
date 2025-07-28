import express from "express"
const router = express.Router();
import {
    addOrderItems,
    getMyOrders,
    getOrderById,
    updateOrderToPaid,
    updateOrderToDelivered,
    // updateOrderToCashOnDelivery,
    // receivedPaymetInCash,
    getOrders
} from "../controllers/orderController.js"
import { protect, admin } from "../middleware/authMiddleware.js"

router.route('/').post(protect, addOrderItems).get(protect, admin, getOrders);
router.route('/mine').get(protect, getMyOrders);
router.route('/:id').get(protect, getOrderById);
router.route("/:id/pay").put(protect, updateOrderToPaid);
// router.route("/:id/payInCash").put(protect, updateOrderToCashOnDelivery);
// router.route("/:id/receivedPaymentInCash").put(protect, receivedPaymetInCash);
router.route("/:id/deliver").put(protect, admin, updateOrderToDelivered);

export default router;
