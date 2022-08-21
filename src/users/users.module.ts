/* eslint-disable prettier/prettier */
import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { Users, UsersScheme } from "./scheme/user.scheme";
import { UsersService } from "./users.service";
import { UsersController } from './users.controller';

@Module({
  providers: [UsersService],
  exports: [UsersService],
  imports: [
    MongooseModule.forFeature([{ name: Users.name, schema: UsersScheme }]),
  ],
  controllers: [UsersController],
})
export class UsersModule {}
