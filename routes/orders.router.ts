import {Router} from "express";
import {OrdersService} from "../services/orders.service";
import {Order} from "../models/order.interface";

export const ordersRouter = Router();

ordersRouter.post('/', async (req, res) => {
    try {
        const {customerId, restaurantId, orderProducts}: Order = req.body;
        const newOrder: Order = await OrdersService.addOrder(orderProducts, customerId, restaurantId);

        res.status(200).json(newOrder);
    } catch (e) {
        res.status(500).send(e.message);
    }
});