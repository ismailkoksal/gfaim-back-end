import {Product} from "../models/product.interface";
import sqlString from "sqlstring";
import {connection} from "../database";
import {FieldPacket, ResultSetHeader} from "mysql2";
import camelcaseKeys from "camelcase-keys";
import snakecaseKeys from "snakecase-keys";

export class ProductsService {
    static async findAll(): Promise<Product[]> {
        const query = sqlString.format("SELECT * FROM products");

        try {
            const [rows, fields] = await connection.execute(query) as [Product[], FieldPacket[]];
            return camelcaseKeys(rows);
        } catch (e) {
            console.error(e);
            throw new Error(e);
        }
    }

    static async findRestaurantProducts(restaurantId: number): Promise<Product[]> {
        const query = sqlString.format("SELECT * FROM products WHERE restaurant_id = ?", [restaurantId]);

        try {
            const [rows, fields] = await connection.execute(query) as [Product[], FieldPacket[]];
            return camelcaseKeys(rows);
        } catch (e) {
            console.error(e);
            throw new Error(e);
        }
    }

    static async find(id: number): Promise<Product> {
        const query = sqlString.format("SELECT * FROM products WHERE id = ?", [id]);

        try {
            const [rows, fields] = await connection.execute(query) as [Product[], FieldPacket[]];

            if (rows.length) {
                return camelcaseKeys(rows[0]);
            }

            return Promise.reject(Error("No product found"));
        } catch (e) {
            console.error(e);
            throw new Error(e);
        }
    }

    static async create(product: Product): Promise<Product> {
        const newProduct = snakecaseKeys(product);

        const query = sqlString.format("INSERT INTO products SET ?", newProduct);

        try {
            const [result] = await connection.execute(query) as [ResultSetHeader, FieldPacket[]]
            return camelcaseKeys({...product, id: result.insertId});
        } catch (e) {
            console.error(e);
            throw new Error(e);
        }
    }

    static async update(product: Product): Promise<void> {
        const {id, ...newProduct} = snakecaseKeys(product);

        const query = sqlString.format("UPDATE products SET ? WHERE id = ?", [newProduct, id]);

        try {
            await connection.execute(query);
        } catch (e) {
            console.error(e);
            throw new Error(e);
        }
    }

    static async delete(id: number): Promise<void> {
        const query = sqlString.format("DELETE FROM products WHERE id = ?", [id]);

        try {
            await connection.execute(query);
        } catch (e) {
            console.error(e);
            throw new Error(e);
        }
    }
}
