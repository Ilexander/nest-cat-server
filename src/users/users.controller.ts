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
  Res,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { FileInterceptor } from "@nestjs/platform-express";
import { diskStorage } from "multer";
import { extname } from "path";
import { CreateUserDto } from "./dto/create.user.dto";
import { UsersService } from "./users.service";
import { Response } from "express";

@Controller("users")
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Post("all")
  @UseGuards(AuthGuard("local"))
  getAll() {
    return this.userService.getAllUsers();
  }

  @Get()
  getAllWithout() {
    return this.userService.getAllUsers();
  }

  @Delete("all/:id")
  deleteUser(@Param("id") id: string) {
    return this.userService.deleteUser(id);
  }

  @Get("pictures/:filename")
  async getPicture(@Param("filename") filename, @Res() res: Response) {
    res.sendFile(filename, { root: "./users_photo" });
  }

  @Post("avatar")
  @UseInterceptors(
    FileInterceptor("user_avatar", {
      storage: diskStorage({
        destination: "./users_photo",
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
  uploadPhoto(@UploadedFile() file: Express.Multer.File) {
    return { avatar: file.filename };
  }

  @Post()
  async create(@Body() userProductDto: CreateUserDto) {
    console.log(userProductDto);
    const user = await this.userService.findOne(userProductDto.user_login);

    if (!user.length) {
      return this.userService.createUser(userProductDto);
    } else {
      throw new HttpException(
        {
          status: HttpStatus.BAD_GATEWAY,
          error: "A user with that login already exists",
        },
        HttpStatus.BAD_GATEWAY
      );
    }
  }

  @Delete("pictures/:id")
  async remove(@Param('id') id: string) {
    const filePath = `./users_photo/${id}`;
    fs.unlinkSync(filePath);
    return {avatar: id};
  }
}
