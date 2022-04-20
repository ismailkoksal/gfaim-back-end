import express from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import helmet from "helmet";
import cors from "cors";
import {productsRouter} from "./routes/products.router";
import {restaurantsRouter} from "./routes/restaurants.router";
import {ordersRouter} from "./routes/orders.router";
import {customersRouter} from "./routes/customers.router";


dotenv.config();

function loggerMiddleware(request: express.Request, response: express.Response, next) {
    console.log(`${request.method} ${request.path}`);
    next();
}

const app = express();


const PORT = 3000;

app.use(loggerMiddleware);
app.use(helmet());
app.use(cors());
app.use(bodyParser.json());
app.use(express.static('uploads'))

app.use("/products", productsRouter);
app.use("/restaurants", restaurantsRouter);
app.use("/orders", ordersRouter);
app.use("/customers", customersRouter);


app.listen(PORT, () => {
    console.log(`⚡️[server]: Server is running at https://localhost:${PORT}`);
});
