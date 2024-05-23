import { Injectable } from '@nestjs/common';
import { CreateSustainabilityCategoryDto } from './dto/create-sustainability_category.dto';
import { UpdateSustainabilityCategoryDto } from './dto/update-sustainability_category.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { SustainabilityCategory } from './entities/sustainability_category.entity';
import { Repository } from 'typeorm';
import { WriteResponse } from 'src/shared/response';

@Injectable()
export class SustainabilityCategoryService {
  constructor(
    @InjectRepository(SustainabilityCategory)
    private readonly sustainabilityCategoryRepo: Repository<SustainabilityCategory>,
  ) {}
  async create(createSustainabilityCategoryDto: CreateSustainabilityCategoryDto) {
    try {
      const existingSustainabilityCategoryName = await this.sustainabilityCategoryRepo.findOne({
        where: { name: createSustainabilityCategoryDto.name, is_deleted: false },
      });

      const existingSustainabilityCategoryAbbr = await this.sustainabilityCategoryRepo.findOne({
        where: { abbreviation: createSustainabilityCategoryDto.abbreviation, is_deleted: false },
      });
      
      if (
        existingSustainabilityCategoryName &&
        existingSustainabilityCategoryName.id !== createSustainabilityCategoryDto.id
      ) {
        return WriteResponse(403, false, 'Sustainability Category Name Already Exists.');
      } 


      if (
        existingSustainabilityCategoryAbbr &&
        existingSustainabilityCategoryAbbr.id !== createSustainabilityCategoryDto.id
      ) {
        return WriteResponse(403, false, 'Sustainability Category Abbreviation Already Exists.');
      } 

      
      const Responsemsg = createSustainabilityCategoryDto.id
        ? 'Sustainability Category Updated Successfully.'
        : 'Sustainability Category Created Successfully.';
      const data = await this.sustainabilityCategoryRepo.save(createSustainabilityCategoryDto);
      return WriteResponse(200, data, Responsemsg);
    } catch (err) {
      console.log(err);
      return WriteResponse(500, false, 'Something went Wrong.');
    }
  }

  //GetAll
  async findAll() {
    try{
    const sustainabilityCategories = await this.sustainabilityCategoryRepo.find({
      where: { is_deleted: false },
    });

    if (sustainabilityCategories.length>0) {
      return WriteResponse(
        200,
        sustainabilityCategories,
        'Sustainability Categories Found Successfully.',
      );
    }
    else{
      return WriteResponse(404, false, 'Sustainability Categories Not Found.');
    }
  }catch(error){
    console.log(error);
    return WriteResponse(500, false, 'Something went Wrong.');
    
  }
  }

  //Get One By Id
  async findOne(id: string) {
    try{
    const sustainabilityCategory = await this.sustainabilityCategoryRepo.findOne({
      where: { id: id, is_deleted: false },
    });
    if (sustainabilityCategory) {
      return WriteResponse(
        200,
        sustainabilityCategory,
        'Sustainability Category Found Successfully.',
      );
    }
    else{
      return WriteResponse(404, false, 'Sustainability Category Not Found.');
    }
    }catch(error){
      console.log(error);
      return WriteResponse(500, false, 'Something went Wrong.');
      
    }
  }

  //Delete
  async remove(id: string) {
    try{
    const deletedSustainabilityCategory = await this.sustainabilityCategoryRepo.findOne({
      where: { id:id, is_deleted: false },
    });
    if (!deletedSustainabilityCategory) {
      return WriteResponse(404, false, 'Sustainability Category Not found.');
    }
    else{
    await this.sustainabilityCategoryRepo.update(id, { is_deleted: true });
    return WriteResponse(200, true, 'Sustainability Category Deleted Successfully.');
    }
  }catch(error){
    console.log(error);
    return WriteResponse(500, false, 'Something went Wrong.');
  }
  }
}
