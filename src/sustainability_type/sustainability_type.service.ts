import { Injectable } from '@nestjs/common';
import { CreateSustainabilityTypeDto } from './dto/create-sustainability_type.dto';
import { UpdateSustainabilityTypeDto } from './dto/update-sustainability_type.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { SustainabilityType } from './entities/sustainability_type.entity';
import { Repository } from 'typeorm';
import { WriteResponse } from 'src/shared/response';

@Injectable()
export class SustainabilityTypeService {
  constructor(
    @InjectRepository(SustainabilityType)
    private readonly sustainabilityTypeRepo: Repository<SustainabilityType>,
  ) {}
  async create(createSustainabilityTypeDto: CreateSustainabilityTypeDto) {
    try {
      const existingSustainabilityTypeName = await this.sustainabilityTypeRepo.findOne({
        where: { name: createSustainabilityTypeDto.name, is_deleted: false },
      });

      const existingSustainabilityTypeAbbr = await this.sustainabilityTypeRepo.findOne({
        where: { abbreviation: createSustainabilityTypeDto.abbreviation, is_deleted: false },
      });
      
      if (
        existingSustainabilityTypeName &&
        existingSustainabilityTypeName.id !== createSustainabilityTypeDto.id
      ) {
        return WriteResponse(403, false, 'Sustainability Type Name Already Exists.');
      } 


      if (
        existingSustainabilityTypeAbbr &&
        existingSustainabilityTypeAbbr.id !== createSustainabilityTypeDto.id
      ) {
        return WriteResponse(403, false, 'Sustainability Type Abbreviation Already Exists.');
      } 

      
      const Responsemsg = createSustainabilityTypeDto.id
        ? 'Sustainability Type Updated Successfully.'
        : 'Sustainability Type Created Successfully.';
      const data = await this.sustainabilityTypeRepo.save(createSustainabilityTypeDto);
      return WriteResponse(200, data, Responsemsg);
    } catch (err) {
      console.log(err);
      return WriteResponse(500, false, 'Something went Wrong.');
    }
  }

  //GetAll
  async findAll() {
    try{
    const sustainabilityTypes = await this.sustainabilityTypeRepo.find({
      where: { is_deleted: false },
    });

    if (sustainabilityTypes.length>0) {
      return WriteResponse(
        200,
        sustainabilityTypes,
        'Sustainability Types Found Successfully.',
      );
    }
    else{
      return WriteResponse(404, false, 'Sustainability Types Not Found.');
    }
  }catch(error){
    console.log(error);
    return WriteResponse(500, false, 'Something went Wrong.');
    
  }
  }

  //Get One By Id
  async findOne(id: string) {
    try{
    const sustainabilityType = await this.sustainabilityTypeRepo.findOne({
      where: { id: id, is_deleted: false },
    });
    if (sustainabilityType) {
      return WriteResponse(
        200,
        sustainabilityType,
        'Sustainability Type Found Successfully.',
      );
    }
    else{
      return WriteResponse(404, false, 'Sustainability Type Not Found.');
    }
    }catch(error){
      console.log(error);
      return WriteResponse(500, false, 'Something went Wrong.');
      
    }
  }

  //Delete
  async remove(id: string) {
    try{
    const deletedSustainabilityType = await this.sustainabilityTypeRepo.findOne({
      where: { id:id, is_deleted: false },
    });
    if (!deletedSustainabilityType) {
      return WriteResponse(404, false, 'Sustainability Type Not found.');
    }
    else{
    await this.sustainabilityTypeRepo.update(id, { is_deleted: true });
    return WriteResponse(200, true, 'Sustainability Type Deleted Successfully.');
    }
  }catch(error){
    console.log(error);
    return WriteResponse(500, false, 'Something went Wrong.');
  }
  }
}
