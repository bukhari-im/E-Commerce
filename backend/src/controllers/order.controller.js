import { Order } from "../models/Order.Model";
import { Product } from "../models/Product.Model.js";
import { Review } from "../models/Review.Model.js";

export async function createOrder(req,res) {
    try {
        const user = req.user;

        const {orderItem, shippingAddress, paymentResult, totalPrice} = req.body;

        if (!orderItem || orderItem.length === 0) {
            return res.status(400).json({ error:" No order items"})
        }

    // validate products and stocks

    for (const item of orderItem) {
        const product = await Product.findById(item.product_id);

        if(!product) {
            return res.status(404).json({ error:`Product ${item.name} not found`});
        }
        if(product.stock < item.quantity) {
            return res.status(400).json({ error: `Insufficient stock for ${product.name}`});
        }
    }

    const order = await Order.create({
        user: user._id,
        clerkId: user.clerkId,
        orderItem,
        shippingAddress,
        paymentResult,
        totalPrice
    });

    //update product stock

    for (const item of orderItem) {
        await Product.findByIdAndUpdate( item.product._id, {
            $inc: { stock: -item.quantity},

        });
    }

    res.status(201).json({ message: " Order created succesfully ", order});

    } catch (error) {
        console.error(" Error in createOrder controller", error);
        res.status(500).json({ error:" Internal server error "})
    }
};
export async function getUserOrders(req,res) {
    try {
        const orders = await Order.find({ clerkId: req.user.clerkId})
        .populate("orderItem.product") 
        .sort({createdAt:-1});

        // check if each order has been reviewed

        const ordersWithReviewStatus = await Promise.all(
            orders.map(async(order) => {
                const review = await Review.findOne({ orderId: order._id});
                return {
                    ...order.toObject(),
                    hasReviewed: !!review,
                };
            })
        );

        // double bang operator in js

        res.status(200).json({orders: ordersWithReviewStatus})

    } catch (error) {
          console.error(" Error in getUserOrders controller", error);
        res.status(500).json({ error:" Internal server error "})
    }
};