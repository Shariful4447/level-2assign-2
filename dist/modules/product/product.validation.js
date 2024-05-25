"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.productValidationSchema = void 0;
const zod_1 = require("zod");
const variantSchema = zod_1.z.object({
    type: zod_1.z.string({
        invalid_type_error: 'The variant type must be a string',
    }),
    value: zod_1.z.string({
        invalid_type_error: 'The variant value must be a string',
    }),
});
exports.productValidationSchema = zod_1.z.object({
    name: zod_1.z.string({
        required_error: 'The product name is required',
        invalid_type_error: 'The product name must be a string',
    }),
    description: zod_1.z.string({
        required_error: 'The product name is required',
        invalid_type_error: 'The product description must be a string',
    }),
    price: zod_1.z.number({
        required_error: 'The product price is required',
        invalid_type_error: 'The product price must be a number',
    }),
    category: zod_1.z.string({
        required_error: 'The product category is required',
        invalid_type_error: 'The product category must be a string',
    }),
    tags: zod_1.z.array(zod_1.z.string({
        invalid_type_error: 'The product tags must be an array of strings',
    }), {
        required_error: 'The product tags are required',
        invalid_type_error: 'The product tags must be an array of strings',
    }),
    variants: zod_1.z.array(variantSchema, {
        required_error: 'The product variants are required',
    }),
    inventory: zod_1.z.object({
        quantity: zod_1.z.number({
            required_error: 'The product quantity is required',
            invalid_type_error: 'The product quantity must be a number',
        }),
        inStock: zod_1.z.boolean({
            required_error: 'The product inStock is required',
            invalid_type_error: 'The product inStock must be a boolean',
        }),
    }, {
        required_error: 'The product inventory is required',
    }),
});
