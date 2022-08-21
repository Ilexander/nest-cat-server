/* eslint-disable prettier/prettier */
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

export type ProductDocument = Product & Document

@Schema()
export class Product {
  @Prop()
  title: string;
  @Prop()
  price: number;
  @Prop()
  file: string;
  @Prop()
  test: string;
}


export const ProuctScheme = SchemaFactory.createForClass(Product);