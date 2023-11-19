import { Product } from '../model/product.model';
declare const CreateProductDto_base: import("@nestjs/common").Type<Pick<Product, "title" | "newProduct" | "enableExchange" | "price" | "containDeliveryCharge" | "description" | "address" | "tag" | "quantity" | "largeCateogry" | "mediumCategory" | "smallCategory">>;
export declare class CreateProductDto extends CreateProductDto_base {
}
export {};
