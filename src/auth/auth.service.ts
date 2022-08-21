/* eslint-disable prettier/prettier */
import { Injectable } from "@nestjs/common";
import { ProductService } from "src/products/product.service";
import { UsersService } from "../users/users.service";

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService) {}

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.usersService.findOne(username);
    if (user && user[0].password === pass && user[0].isAdmin === true) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }
}
