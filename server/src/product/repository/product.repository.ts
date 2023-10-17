import { Injectable, Param } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Product, ProductSchema } from '../model/product.model';
import {
  ProductImage,
  ProductImageSchema,
} from '../../product-image/model/product-image.model';
import { CreateProductDto } from '../dto/create.product.dto';
import * as mongoose from 'mongoose';
import { UserSchema } from '../../user/model/user.model';
import {
  ProductFavorite,
  ProductFavoriteSchema,
} from '../../product-favorite/model/product-favorite.model';
import {
  ProductContact,
  ProductContactSchema,
} from '../../product-contact/model/product-contact.model';

@Injectable()
export class ProductRepository {
  constructor(
    @InjectModel(Product.name) private readonly product: Model<Product>,
    @InjectModel(ProductImage.name)
    private readonly productImage: Model<ProductImage>,
    @InjectModel(ProductFavorite.name)
    private readonly productFavorite: Model<ProductFavorite>,
    @InjectModel(ProductContact.name)
    private readonly productContact: Model<ProductContact>,
  ) {}

  // 입력된 단어로 상품제목 찾기
  async searchTitleByKeyword(keyword: string): Promise<Product[]> {
    const result = await this.product.find({ title: new RegExp(keyword) });
    return result;
  }

  // toStoreId => toProductId로 취급
  async getProductFavorite(userId: string): Promise<ProductFavorite[]> {
    const ProductModel = mongoose.model('products', ProductSchema);
    const result = await this.productFavorite
      .find({ toStoreId: userId })
      .sort({ createdAt: -1 })
      .populate('_fromProductId', ProductModel);
    return result;
  }

  async getProductContactAll(productId: string): Promise<any> {
    const UserModel = mongoose.model('users', UserSchema);

    const result = await this.productContact
      .find({ toStoreId: mongoose.Types.ObjectId(productId) })
      .sort({ createdAt: -1 })
      .populate('_fromWriterId', UserModel);

    console.log('result contact >> ', result);

    return result;
  }

  // 상품 문의 작성
  async createProductContact(
    userId: string,
    productId: string,
    content: string,
  ): Promise<any> {
    const result = await this.productContact.create({
      toStoreId: mongoose.Types.ObjectId(productId),
      fromWriterId: mongoose.Types.ObjectId(userId),
      content,
    });
    return result;
  }

  // 상품 문의 제거
  async deleteProductContact(askId: string): Promise<any> {
    const result = await this.productContact.findByIdAndDelete(askId);
    return result;
  }

  // 상품 즐겨찾기 추가
  async createProductFavorite(userId: string, productId: string) {
    // 변경 내역: userId를 string 형태로 저장하니까 populate 할 때
    // 아이디가 읽히지 않아서 몽구스에서 지원하는 ID 형태로 변환 후 저장
    // mongoose.Types.ObjectId()
    const result = await this.productFavorite.create({
      toStoreId: mongoose.Types.ObjectId(userId),
      fromProductId: mongoose.Types.ObjectId(productId),
    });
    return result;
  }

  // 상품 즐겨찾기 제거
  async deleteProductFavorite(userId: string, productId: string) {
    const result = await this.productFavorite.deleteOne({
      toStoreId: mongoose.Types.ObjectId(userId),
      fromProductId: mongoose.Types.ObjectId(productId),
    });
    return result;
  }

  // 이미 즐겨찾기한 상품인지 확인
  async findByIdProductFavorite(userId: string, productId: string) {
    const result = await this.productFavorite.findOne({
      toStoreId: mongoose.Types.ObjectId(userId),
      fromProductId: mongoose.Types.ObjectId(productId),
    });
    return result;
  }

  // 상품 제거(물리적 제거
  async deleteHardProduct(productId): Promise<any> {
    const result = await this.product.deleteOne({ _id: productId });
    console.log('result >> ', result);

    return result;
  }

  // 상품 필드 부분 수정
  async updateProduct(productId, field: object): Promise<Product> {
    const result = await this.product.findOneAndUpdate(
      { _id: productId },
      { ...field },
      { new: true },
    );
    console.log('result >> ', result);

    return result;
  }

  // 특정 상품과 관련된 모든 스키마 조인하기
  async findByIdAndPopulate(id: string): Promise<Product> {
    const UserModel = mongoose.model('users', UserSchema);
    const ProductImageModel = mongoose.model(
      'productimages',
      ProductImageSchema,
    );
    const ProductContactModel = mongoose.model(
      'productcontacts',
      ProductContactSchema,
    );
    const ProductFavoriteModel = mongoose.model(
      'productfavorites',
      ProductFavoriteSchema,
    );

    const result = await this.product
      .findById(id)
      .populate('productImgURLs', ProductImageModel)
      .populate('userInfo', UserModel)
      .populate('productFavoriteCount', ProductFavoriteModel)
      .populate('productContacts', ProductContactModel);

    return result;
  }

  // 전체 상품 목록 조회
  async getAllProduct() {
    return this.product.find().sort({ createdAt: -1 });
  }

  // 상품 정보 저장
  async uploadProduct(
    currentUser,
    productInfo: CreateProductDto,
  ): Promise<Product> {
    const userId = currentUser._id;
    const result = await this.product.create({
      userId,
      ...productInfo,
    });

    return result._id;
  }

  // 상품 이미지 경로 저장
  async uploadProductImage(productId, files): Promise<boolean> {
    console.log('repo productId >> ', productId);
    console.log('repo thumbnail image >> ', files[0]);
    // console.log('repo upload image >> ', files);
    try {
      // 첫번째 상품 이미지는 상품 썸네일 이미지로 지정
      if (files && files[0]) {
        const product = await this.product.findById(productId);
        // product.thumbnailImgURL = `${process.env.MEDIA_URL}/static/product_image/${files[0].filename}`;
        console.log('repo findbyid product >> ', product);
        product.thumbnailImgURL = `${files[0].location}`;
        await product.save();
      }

      for (const file of files) {
        // const productImgURL = `${process.env.MEDIA_URL}/static/product_image/${file.filename}`;
        const productImgURL = `${file.location}`;
        await this.productImage.create({
          productId,
          productImgURL,
        });
      }
      return true;
    } catch (err) {
      return false;
    }
  }
}
