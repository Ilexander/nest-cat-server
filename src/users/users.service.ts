/* eslint-disable prettier/prettier */
import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { CreateUserDto } from "./dto/create.user.dto";
import { UserDocument, Users } from "./scheme/user.scheme";

// This should be a real class/interface representing a user entity
export type User = any;

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(Users.name) private usersModule: Model<UserDocument>
  ) {}

  private users = [];

  async findOne(user_login: string): Promise<User> {
    return this.usersModule.find({ user_login });
  }

  async deleteUser(id: string): Promise<User> {
    return this.usersModule.findByIdAndDelete(id);
  }

  async getAllUsers(): Promise<User[]> {
    return this.usersModule.find().exec();
  }

  async createUser(userDto: CreateUserDto): Promise<Users> {
    const newProduct = new this.usersModule({ ...userDto });
    return newProduct.save();
  }
}
