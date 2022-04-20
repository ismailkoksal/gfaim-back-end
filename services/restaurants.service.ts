import {Restaurant} from "../models/restaurant.interface";
import sqlString from "sqlstring";
import {connection} from "../database";
import {FieldPacket, ResultSetHeader} from "mysql2";
import camelcaseKeys from "camelcase-keys";
import snakecaseKeys from "snakecase-keys";

export class RestaurantsService {
    static async getRestaurants(): Promise<Restaurant[]> {
        // language=GenericSQL
        const query = sqlString.format("SELECT * FROM restaurant");

        try {
            const [rows] = await connection.execute(query) as [Restaurant[], FieldPacket[]];
            return camelcaseKeys(rows);
        } catch (e) {
            console.error(e);
            throw Error(e);
        }
    }

    static async createRestaurant(restaurant: Restaurant): Promise<Restaurant> {
        const {id, ...newRestaurant} = snakecaseKeys(restaurant);

        // language=GenericSQL
        const query = sqlString.format("INSERT INTO restaurant SET ?", newRestaurant);

        try {
            const [result] = await connection.execute(query) as [ResultSetHeader, FieldPacket[]];
            return camelcaseKeys({...restaurant, id: result.insertId});
        } catch (e) {
            console.error(e);
            throw Error(e);
        }
    }
}