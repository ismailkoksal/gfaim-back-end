import {Order} from "../models/order.interface";
import sqlString from "sqlstring";
import {connection} from "../database";
import {OrderProduct} from "../models/order-product.interface";
import {Product} from "../models/product.interface";
import {ProductsService} from "./products.service";
import {FieldPacket, ResultSetHeader} from "mysql2";
import {v1 as uuidv1} from "uuid";

export class OrdersService {
    /*static async getOrder(orderId: number): Promise<Order> {
        const query = sqlString.format('SELECT * FROM order_vue')
    }

    static async getUserOrders(userId: number): Promise<Order[]> {
        return;
    }

    static async getRestaurantOrders(restaurantId: number): Promise<Order[]> {
        //
    }*/

    static async addOrder(orderProducts: OrderProduct[], customerId: number, restaurantId: number): Promise<Order> {
        const totalPrice: number = await OrdersService.getTotalPrice(orderProducts);
        const orderNumber: string = uuidv1().replaceAll("-", "");

        const data = [JSON.stringify(orderProducts), customerId, restaurantId, totalPrice, orderNumber];

        const query = sqlString.format("INSERT INTO orders (order_products, customer_id, restaurant_id, total_price, order_number) VALUES (?, ?, ?, ?, ?)", data);

        try {
            const [rows, fields] = await connection.execute(query) as [ResultSetHeader, FieldPacket[]];

            return {id: rows.insertId, customerId, restaurantId, orderProducts};
        } catch (e) {
            console.error(e);
            throw Error(e);
        }
    }

    private static async getTotalPrice(cartProducts: OrderProduct[]): Promise<number> {
        let totalPrice = 0;
        for (const cartProduct of cartProducts) {
            const product: Product = await ProductsService.find(cartProduct.product.id)
            totalPrice += product.price * cartProduct.quantity;
        }
        return totalPrice;
    }
}