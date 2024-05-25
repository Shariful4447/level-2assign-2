"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllOrders = exports.cerateOrder = void 0;
const order_service_1 = require("./order.service");
const mongoose_1 = __importDefault(require("mongoose"));
const product_service_1 = require("../product/product.service");
const order_validation_1 = require("./order.validation");
const cerateOrder = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const req_data = req.body;
        const zodParsedData = order_validation_1.orderValidationSchema.parse(req_data);
        const { productId: product_id } = zodParsedData;
        // check if the product exists
        const product = yield (0, product_service_1.getProductByIdFromDB)(product_id);
        if (!product) {
            const error = new Error();
            error.name = "not-found";
            error.message = "The product you are trying to order does not exist!";
            throw error;
        }
        // check if the product is in stock
        if (product.inventory.inStock === false) {
            const error = new Error();
            error.message = "Insufficient quantity available in inventory!";
            throw error;
        }
        if (zodParsedData.quantity > product.inventory.quantity) {
            const error = new Error();
            error.message = `Insufficient quantity available in inventory! Only ${product.inventory.quantity} products available.`;
            throw error;
        }
        // create order
        const productId = new mongoose_1.default.Types.ObjectId(product_id);
        const result = yield (0, order_service_1.createOrderIntoDB)(Object.assign(Object.assign({}, zodParsedData), { productId }));
        // update product inventory after create an order
        product.inventory = {
            quantity: product.inventory.quantity - zodParsedData.quantity,
            inStock: product.inventory.quantity > zodParsedData.quantity ? true : false,
        };
        yield (0, product_service_1.updateProductByIdIntoDB)(product_id, product);
        res.send({
            success: true,
            message: "Order created successfully!",
            data: result,
        });
    }
    catch (error) {
        next(error);
    }
});
exports.cerateOrder = cerateOrder;
const getAllOrders = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email } = req.query;
        const result = yield (0, order_service_1.getOrdersFromDB)(email);
        if (result.length === 0) {
            const error = new Error();
            error.name = "not-found";
            error.message = "No orders found!";
            throw error;
        }
        const message = email
            ? "Orders fetched successfully for user email!"
            : "Orders fetched successfully!";
        res.send({
            success: true,
            message,
            data: result,
        });
    }
    catch (error) {
        next(error);
    }
});
exports.getAllOrders = getAllOrders;
