import {Router} from "express";
import {Product} from "../models/product.interface";
import {ProductsService} from "../services/products.service";

export const restaurantsRouter = Router();



restaurantsRouter.get('/:id/products', async(req, res) => {
    try {
        const id: number = parseInt(req.params.id, 10);
        const products: Product[] = await ProductsService.findRestaurantProducts(id);

        res.status(200).send(JSON.stringify(products));
    } catch (e) {
        res.status(500).send(e.message);
    }
})