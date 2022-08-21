/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CatsCreateDto } from './dto/cats-create.dto';
import { Cats, CatsDocument } from './scheme/cats.scheme';

@Injectable()
export class CatsService {
  constructor(
    @InjectModel(Cats.name) private catsModule: Model<CatsDocument>
  ) {}

  private cats = [];

  async getAllCats(): Promise<Cats[]> {
    return this.catsModule.find().exec();
  }

  async deleteCat(id: string): Promise<Cats> {
    return this.catsModule.findByIdAndDelete(id);
  }

  async findCat(id: string): Promise<Cats> {
    return this.catsModule.findById(id);
  }

  async create(catsDto: CatsCreateDto, file: string): Promise<Cats> {
    const newCat = new this.catsModule({ ...catsDto, cat_photo: file });
    return newCat.save();
  }

  async update(id: string, catsDto: CatsCreateDto): Promise<Cats> {
    return this.catsModule.findByIdAndUpdate(id, catsDto, { new: true });
  }
}
