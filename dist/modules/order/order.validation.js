"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.orderValidationSchema = void 0;
const zod_1 = require("zod");
exports.orderValidationSchema = zod_1.z.object({
    email: zod_1.z
        .string({
        required_error: 'The email is required',
        invalid_type_error: 'The email must be a string',
    })
        .email({
        message: 'The email must be a valid email',
    }),
    productId: zod_1.z.string({
        required_error: 'The product id is required',
        invalid_type_error: 'The product id must be a string',
    }),
    price: zod_1.z.number({
        required_error: 'The price is required',
        invalid_type_error: 'The price must be a number',
    }),
    quantity: zod_1.z
        .number({
        required_error: 'The quantity is required',
        invalid_type_error: 'The quantity must be a number',
    })
        .int({
        message: 'The quantity must be an integer',
    })
        .gte(1, {
        message: 'The minimum quantity is 1',
    }),
});
