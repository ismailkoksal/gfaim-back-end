import {Router} from "express";
import {Customer} from "../models/customer.interface";
import {CustomersService} from "../services/customers.service";

export const customersRouter = Router();

customersRouter.get("/:id", async (req, res) => {
    const id: string = req.params.id;

    try {
        const customer: Customer = await CustomersService.find(id);
        res.status(200).json(customer);
    } catch (e) {
        res.status(500).send(e.message);
    }
})
