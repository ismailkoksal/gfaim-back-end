/**
 * Required External Modules and Interfaces
 */

import {Router} from "express";
import {Product} from "../models/product.interface";
import {ProductsService} from "../services/products.service";
import multer from "multer";
import path from "path";

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname));
    },
})
const upload = multer({ storage: storage });


/**
 * Router Definition
 */

export const productsRouter = Router();

/**
 * Controller Definitions
 */

// GET products/

productsRouter.get("/", async (req, res) => {
    try {
        const products: Product[] = await ProductsService.findAll();

        res.status(200).json(products);
    } catch (e) {
        res.status(404).send(e.message);
    }
});

// GET products/:id

productsRouter.get("/:id", async (req, res) => {
    try {
        const id: number = parseInt(req.params.id, 10);
        const product: Product = await ProductsService.find(id);

        res.status(200).json(product);
    } catch (e) {
        res.status(500).send(e.message);
    }
});

// POST products/

productsRouter.post("/", upload.single("image"), async (req, res) => {
    try {
        const product: Product = JSON.parse({...req.body.product, image: req.file.filename});
        const newProduct: Product = await ProductsService.create(product);

        res.status(200).json(newProduct);
    } catch (e) {
        res.status(500).send(e.message);
    }
});

// PUT products/
productsRouter.put("/", upload.single("image"), async (req, res) => {
    try {
        const {image, ...parsedProduct} = JSON.parse(req.body.product);
        const product: Product = {...parsedProduct, image: req.file.filename};
        await ProductsService.update(product);

        res.status(200).json(product);
    } catch (e) {
        res.status(500).send(e.message);
    }
});

// DELETE products/:id

productsRouter.delete("/:id", async(req, res) => {
    try {
        const id: number = parseInt(req.params.id, 10);
        await ProductsService.delete(id);

        res.sendStatus(200);
    } catch (e) {
        res.status(500).send(e.message);
    }
});
