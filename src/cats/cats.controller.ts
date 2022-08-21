/* eslint-disable prettier/prettier */
import * as fs from "fs";
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Res,
  UploadedFile,
  UseInterceptors,
} from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { diskStorage } from "multer";
import { extname } from "path";
import { CatsService } from "./cats.service";
import { CatsCreateDto } from "./dto/cats-create.dto";
import { Response } from "express";

@Controller("cats")
export class CatsController {
  constructor(private readonly catsService: CatsService) {}

  @Get()
  getAllCats() {
    return this.catsService.getAllCats();
  }

  @Get(':id')
  getCatById (@Param('id') id: string) {
    return this.catsService.findCat(id);
  }

  @Get("pictures/:filename")
  async getPicture(@Param("filename") filename, @Res() res: Response) {
    res.sendFile(filename, { root: "./cats_photo" });
  }

  @Post()
  @UseInterceptors(
    FileInterceptor("cat_photo", {
      storage: diskStorage({
        destination: "./cats_photo",
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
    @Body() catsCreateDto: CatsCreateDto
  ) {
    return this.catsService.create(catsCreateDto, file.filename);
  }

  @Delete(":id")
  async deleteCat(@Param("id") id: string) {
    const bodyRequest = await this.catsService.findCat(id);
    const filePath = `./cats_photo/${bodyRequest.cat_photo}`;
    fs.unlinkSync(filePath);

    return this.catsService.deleteCat(id);
  }

  @Put(":id")
  update(@Body() updateDto: CatsCreateDto, @Param("id") id: string) {
    return this.catsService.update(id, updateDto);
  }
}
