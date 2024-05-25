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
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteProductById = exports.updateProductById = exports.getProductById = exports.getAllProducts = exports.createProduct = void 0;
const product_service_1 = require("./product.service");
const product_validation_1 = require("./product.validation");
const createProduct = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const req_data = req.body;
        // product validation by zod
        const zodParsedData = product_validation_1.productValidationSchema.parse(req_data);
        // create product
        const result = yield (0, product_service_1.createProductIntoDB)(zodParsedData);
        res.send({
            success: true,
            message: "Product created successfully!",
            data: result,
        });
    }
    catch (error) {
        next(error);
    }
});
exports.createProduct = createProduct;
const getAllProducts = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { searchTerm } = req.query;
        const result = yield (0, product_service_1.getProductsFromDB)(searchTerm);
        if (result.length === 0) {
            const error = new Error();
            error.name = "not-found";
            error.message = "No products found!";
            throw error;
        }
        const message = searchTerm
            ? `Products matching search term '${searchTerm}' fetched successfully!`
            : "Products fetched successfully!";
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
exports.getAllProducts = getAllProducts;
const getProductById = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { productId } = req.params;
        const result = yield (0, product_service_1.getProductByIdFromDB)(productId);
        if (!result) {
            const error = new Error();
            error.name = "not-found";
            error.message = "Product not found!";
            throw error;
        }
        res.send({
            success: true,
            message: "Product fetched successfully!",
            data: result,
        });
    }
    catch (error) {
        next(error);
    }
});
exports.getProductById = getProductById;
const updateProductById = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { productId } = req.params;
        const req_data = req.body;
        const zodParsedData = product_validation_1.productValidationSchema.parse(req_data);
        const result = yield (0, product_service_1.updateProductByIdIntoDB)(productId, zodParsedData);
        if (!result) {
            const error = new Error();
            error.name = "not-found";
            error.message = "Product doesn't exist!";
            throw error;
        }
        res.send({
            success: true,
            message: "Product updated successfully!",
            data: result,
        });
    }
    catch (error) {
        next(error);
    }
});
exports.updateProductById = updateProductById;
const deleteProductById = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { productId } = req.params;
        const result = yield (0, product_service_1.deleteProductByIdFromDB)(productId);
        if (!result) {
            const error = new Error();
            error.name = "not-found";
            error.message = "Product doesn't exist!";
            throw error;
        }
        res.send({
            success: true,
            message: "Product deleted successfully!",
            data: result,
        });
    }
    catch (error) {
        next(error);
    }
});
exports.deleteProductById = deleteProductById;
