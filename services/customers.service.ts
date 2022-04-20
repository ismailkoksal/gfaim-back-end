import {Customer} from "../models/customer.interface";
import sqlString from "sqlstring";
import {connection} from "../database";
import {FieldPacket} from "mysql2";
import camelcaseKeys from "camelcase-keys";

export class CustomersService {
    static async find(id: string): Promise<Customer | null> {
        const query = sqlString.format("SELECT * FROM customer_vue WHERE firebase_uid = ?", [id]);

        try {
            const [rows] = await connection.execute(query) as [Customer[], FieldPacket[]];

            if (rows.length) {
                return camelcaseKeys(rows[0]);
            }

            return null;
        } catch (e) {
            throw new Error(e);
        }
    }
}