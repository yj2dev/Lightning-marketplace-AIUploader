/// <reference types="multer" />
/// <reference types="multer-s3" />
import { ProductService } from '../service/product.service';
import { User } from '../../user/model/user.model';
import { Product } from '../model/product.model';
import { ProductFavorite } from '../../product-favorite/model/product-favorite.model';
export declare class ProductController {
    private readonly productService;
    constructor(productService: ProductService);
    searchTitleByKeyword(keyword: string): Promise<Product[]>;
    getProductFavorite(currentUser: User): Promise<ProductFavorite[]>;
    getProductContact(productId: string): Promise<any>;
    createProductContact(productId: string, content: string, currentUser: User): Promise<any>;
    deleteProductContact(askId: string, currentUser: User): Promise<any>;
    addFavoriteProduct(currentUser: User, productId: string): Promise<boolean>;
    deleteProduct(productId: string, state: string): Promise<boolean>;
    updateProductState(productId: string, state: string): Promise<Product>;
    getAllProduct(): Promise<Product[]>;
    getOneProduct(productId: string): Promise<Product>;
    uploadBlob(file: Express.Multer.File): Promise<{
        message: string;
        url: string;
        error?: undefined;
    } | {
        message: string;
        error: any;
        url?: undefined;
    }>;
    uploadProduct(currentUser: User, files: Express.MulterS3.File[], productInfo: any): Promise<boolean>;
    uploadProductAI(currentUser: User, files: Express.MulterS3.File[], productInfo: any): Promise<boolean>;
}
