import { Injectable } from '@nestjs/common';
import { CreateConstructionTypeDto } from './dto/create-construction_type.dto';
import { UpdateConstructionTypeDto } from './dto/update-construction_type.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ConstructionType } from './entities/construction_type.entity';
import { Repository } from 'typeorm';
import { WriteResponse } from 'src/shared/response';

@Injectable()
export class ConstructionTypeService {
  constructor(
    @InjectRepository(ConstructionType)
    private readonly constructionTypeRepo: Repository<ConstructionType>,
    
  ) {}
  async create(createConstructionTypeDto: CreateConstructionTypeDto) {
    try {
      const existingConstructionType = await this.constructionTypeRepo.findOne({
        where: { name: createConstructionTypeDto.name, is_deleted: false },
      });
  
      if (existingConstructionType && existingConstructionType.id !== createConstructionTypeDto.id) {
        return WriteResponse(403, false, 'Construction Type Already Exists.');
      }
  
      const Responsemsg = createConstructionTypeDto.id ? 'Construction Type Updated Successfully.' : 'Construction Type Created Successfully.';
      const data = await this.constructionTypeRepo.save(createConstructionTypeDto);
      
      return WriteResponse(200, data, Responsemsg);
    } catch (err) {
      console.log(err);
      return WriteResponse(500, false, 'Something went Wrong.');
    }
  }

 

  //GetAll
  async findAll() {
    try{
    const constructionTypes = await this.constructionTypeRepo.find({
      where: { is_deleted: false },
    });

    if (constructionTypes.length>0) {
      return WriteResponse(
        200,
        constructionTypes,
        'Construction Types Found Successfully.',
      );
    }
    else{
      return WriteResponse(404, false, 'Construction Types Not Found.');
    }
  }catch(error){
    console.log(error);
    return WriteResponse(500, false, 'Something went Wrong.');
    
  }
  }

  //Get One By Id
  async findOne(id: string) {
    try{
    const constructionType = await this.constructionTypeRepo.findOne({
      where: { id: id, is_deleted: false },
    });
    if (constructionType) {
      return WriteResponse(
        200,
        constructionType,
        'Construction Type Found Successfully.',
      );
    }
    else{
      return WriteResponse(404, false, 'Construction Type Not Found.');
    }
    }catch(error){
      console.log(error);
      return WriteResponse(500, false, 'Something went Wrong.');
      
    }
  }

   //Delete
   async remove(id: string) {
    try{
    const deletedConstructionType = await this.constructionTypeRepo.findOne({
      where: { id:id, is_deleted: false },
    });
    if (!deletedConstructionType) {
      return WriteResponse(404, false, 'Construction Type Not found.');
    }
    else{
    await this.constructionTypeRepo.update(id, { is_deleted: true });
    return WriteResponse(200, true, 'Construction Type Deleted Successfully.');
    }
  }catch(error){
    console.log(error);
    return WriteResponse(500, false, 'Something went Wrong.');
  }
  }
}
