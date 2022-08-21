/* eslint-disable prettier/prettier */
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

export type CatsDocument = Cats & Document;

@Schema()
export class Cats {
  @Prop()
  cat_name: string;
  @Prop()
  owner_number: string;
  @Prop()
  owner_name: string;
  @Prop()
  lost_location: string;
  @Prop()
  cat_photo: string;
  @Prop()
  cat_description: string;
  @Prop()
  cat_signs: any[];
}

export const CatsScheme = SchemaFactory.createForClass(Cats);
