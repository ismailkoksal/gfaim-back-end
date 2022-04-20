import {OrderProduct} from "./order-product.interface";
import {Restaurant} from "./restaurant.interface";
import {Customer} from "./customer.interface";

export interface Order {
    id?: number;
    orderNumber?: string;
    restaurantId: number;
    restaurant?: Restaurant;
    customerId: number;
    customer?: Customer;
    orderProducts: OrderProduct[];
    status?: string;
    orderedAt?: Date;
}