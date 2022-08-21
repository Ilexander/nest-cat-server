/* eslint-disable prettier/prettier */
import {
  Controller,
  Get,
  Post,
  Request,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { FileInterceptor } from "@nestjs/platform-express";
import { diskStorage } from "multer";
import { extname } from "path";
import { AppService } from "./app.service";

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @UseGuards(AuthGuard("local"))
  @Post("auth/login")
  async login(@Request() req) {
    return req.user;
  }

  // @Post("/products")
  //   @UseInterceptors(FileInterceptor("file", {
  //   storage: diskStorage({
  //     destination: './dist/files',
  //     filename(req, file, callback) {
  //       const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9)
  //       const ext = extname(file.originalname);
  //       const filename = `${file.originalname}-${uniqueSuffix}${ext}`
  //       callback(null, filename)
  //     },
  //   })
  // }))
  // uploadFile(@UploadedFile() file: Express.Multer.File) {
  //   console.log(file.filename);
  //   return 'File Upload'
  // }
}
