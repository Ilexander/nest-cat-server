/* eslint-disable prettier/prettier */
import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { UsersService } from "src/users/users.service";
import { CreateProductDto } from "./dto/create-product.dto";
import { UpdateDto } from "./dto/update.dto";
import { Product, ProductDocument } from "./schemes/product.scheme";

@Injectable()
export class ProductService {
  constructor(
    @InjectModel(Product.name) private productModule: Model<ProductDocument>
  ) {}

  private products = [];

  async getAll(): Promise<Product[]> {
    return this.productModule.find().exec();
  }

  async getByTitle(id: string): Promise<Product> {
    return this.productModule.findById(id);
  }

  async getAllInfoByTitle(id: string) {
    return this.productModule.find({ _id: id });
  }

  async create(productDto: CreateProductDto, file: string): Promise<Product> {
    const newProduct = new this.productModule({ ...productDto, file });
    return newProduct.save();
  }

  async remove(id: string): Promise<Product> {
    return this.productModule.findByIdAndDelete(id);
  }

  async update(id: string, productDto: UpdateDto): Promise<Product> {
    return this.productModule.findByIdAndUpdate(id, productDto, { new: true });
  }


  async find(skip, limit) {
    return this.productModule.find().skip(skip).limit(limit).exec();
  }
}
