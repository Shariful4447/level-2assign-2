import express, { Request, Response } from "express";

import { productRoute } from "./modules/product/product.route";
import { orderRoute } from "./modules/order/order.route";
const app = express();
const port = 3000;

//parser json
app.use(express.json());

app.use("/api/products", productRoute);
app.use("/api/orders", orderRoute);

app.get("/", (req: Request, res: Response) => {
  res.send("Hello");
});
export default app;
