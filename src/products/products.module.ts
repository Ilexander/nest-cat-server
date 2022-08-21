/* eslint-disable prettier/prettier */
import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { AuthModule } from "src/auth/auth.module";
import { UsersModule } from "src/users/users.module";
import { UsersService } from "src/users/users.service";
import { ProductService } from "./product.service";
import { ProductsController } from "./products.controller";
import { Product, ProuctScheme } from "./schemes/product.scheme";

@Module({
  providers: [ProductService],
  controllers: [ProductsController],
  imports: [
    MongooseModule.forFeature([{ name: Product.name, schema: ProuctScheme }]),
    AuthModule,
    UsersModule,
  ],
})
export class ProductsModule {}
