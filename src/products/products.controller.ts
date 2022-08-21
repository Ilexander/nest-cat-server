/* eslint-disable prefer-const */
/* eslint-disable prettier/prettier */
import * as fs from "fs";
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Put,
  Req,
  Res,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { Request, Response } from "express";
import { diskStorage } from "multer";
import { extname } from "path";
import { RolesGuard } from "src/guard/roles.guard";
import { CreateProductDto } from "./dto/create-product.dto";
import { UpdateDto } from "./dto/update.dto";
import { ProductService } from "./product.service";
import { Product } from "./schemes/product.scheme";
import { AuthGuard } from "@nestjs/passport";
import mongoose from "mongoose";

@Controller("products")
export class ProductsController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  getAll(@Body() body: any): Promise<Product[]> {
    if (body.username === "for_post" && body.password === 'forPost') {
      return this.productService.getAll();
    } else {
      throw new HttpException(
        {
          status: HttpStatus.UNAUTHORIZED,
          error: 'Wrong password'
        },
        HttpStatus.UNAUTHORIZED
      );
    }
  }

  @Get(":id")
  getByTitle(@Param() params) {
    return this.productService.getByTitle(params.id);
  }

  @Get("pictures/:filename")
  async getPicture(@Param("filename") filename, @Res() res: Response) {
    res.sendFile(filename, { root: "./uploads" });
  }

  @Post()
  @UseInterceptors(
    FileInterceptor("file", {
      storage: diskStorage({
        destination: "./uploads",
        filename(req, file, callback) {
          const uniqueSuffix =
            Date.now() + "-" + Math.round(Math.random() * 1e9);
          const ext = extname(file.originalname);
          const filename = `${file.originalname}-${uniqueSuffix}${ext}`;
          callback(null, filename);
        },
      }),
    })
  )
  create(
    @UploadedFile() file: Express.Multer.File,
    @Body() createProductDto: CreateProductDto
  ) {
    return this.productService.create(createProductDto, file.filename);
  }

  @Post("auth/login")
  @UseGuards(AuthGuard("local"))
  async login() {
    return this.productService.getAll();
  }

  @Delete(":id")
  async remove(@Param() params) {
    const bodyRequest = await this.productService.getAllInfoByTitle(params.id);
    const filePath = `./uploads/${bodyRequest[0].file}`;
    fs.unlinkSync(filePath);
    return this.productService.remove(params.id);
  }

  @Delete("pictures/:filename")
  deletePicture(@Param("filename") filename): string {
    const filePath = `./uploads/${filename}`;
    fs.unlinkSync(filePath);
    return "Test log";
  }

  @Put(":id")
  update(@Body() updateDto: UpdateDto, @Param("id") id: string) {
    return this.productService.update(id, updateDto);
  }

  @Get("find/:id")
  async backend(@Req() req: Request) {
    const page: number = parseInt(req.query.page as any) || 1;
    const limit = 9;
    return this.productService.find((page - 1) * limit, limit);
  }
}
