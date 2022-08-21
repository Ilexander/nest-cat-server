/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { MongooseModule } from "@nestjs/mongoose";
import { CatsController } from './cats.controller';
import { CatsService } from './cats.service';
import { Cats, CatsScheme } from './scheme/cats.scheme';

@Module({
  controllers: [CatsController],
  providers: [CatsService],
  imports: [
    MongooseModule.forFeature([{ name: Cats.name, schema: CatsScheme }]),
  ],
})
export class CatsModule {}
