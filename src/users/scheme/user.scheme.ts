/* eslint-disable prettier/prettier */
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

export type UserDocument = Users & Document;

@Schema()
export class Users {
  @Prop()
  user_name: string;
  @Prop()
  user_surname: string;
  @Prop()
  user_login: string;
  @Prop()
  user_email: string;
  @Prop()
  user_password: string;
  @Prop()
  user_avatar: string;
  @Prop()
  user_phone: string;
  @Prop()
  isAdmin: boolean;
}

export const UsersScheme = SchemaFactory.createForClass(Users);
