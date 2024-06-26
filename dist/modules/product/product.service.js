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
exports.deleteProductByIdFromDB = exports.updateProductByIdIntoDB = exports.getProductByIdFromDB = exports.getProductsFromDB = exports.createProductIntoDB = void 0;
const product_model_1 = __importDefault(require("./product.model"));
const createProductIntoDB = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const product = new product_model_1.default(data);
    yield product.save();
    return product;
});
exports.createProductIntoDB = createProductIntoDB;
const getProductsFromDB = (searchTerm) => __awaiter(void 0, void 0, void 0, function* () {
    if (searchTerm) {
        const regex = RegExp(searchTerm, "i");
        const products = yield product_model_1.default.find({
            $or: [
                { name: regex },
                { description: regex },
                { category: regex },
                { tags: regex },
            ],
        });
        return products;
    }
    const products = yield product_model_1.default.find();
    return products;
});
exports.getProductsFromDB = getProductsFromDB;
const getProductByIdFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const product = yield product_model_1.default.findById(id);
    return product;
});
exports.getProductByIdFromDB = getProductByIdFromDB;
const updateProductByIdIntoDB = (id, data) => __awaiter(void 0, void 0, void 0, function* () {
    const product = yield product_model_1.default.findByIdAndUpdate(id, data);
    return product;
});
exports.updateProductByIdIntoDB = updateProductByIdIntoDB;
const deleteProductByIdFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield product_model_1.default.findByIdAndDelete(id);
    return result;
});
exports.deleteProductByIdFromDB = deleteProductByIdFromDB;
