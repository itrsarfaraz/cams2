import { Injectable } from '@nestjs/common';
import { CreateDwellingTypeDto } from './dto/create-dwelling_type.dto';
import { UpdateDwellingTypeDto } from './dto/update-dwelling_type.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { DwellingType } from './entities/dwelling_type.entity';
import { Repository } from 'typeorm';
import { WriteResponse } from 'src/shared/response';

@Injectable()
export class DwellingTypeService {
  constructor(
    @InjectRepository(DwellingType)
    private readonly dwellingTypeRepo: Repository<DwellingType>,
    
  ) {}
  async create(createDwellingTypeDto: CreateDwellingTypeDto) {
    try {
      const existingDwellingType = await this.dwellingTypeRepo.findOne({
        where: { name: createDwellingTypeDto.name, is_deleted: false },
      });
      if (existingDwellingType && existingDwellingType.id !== createDwellingTypeDto.id) {
        return WriteResponse(403, false, 'Dwelling Type Already Exists.');
      }
  
      const Responsemsg = createDwellingTypeDto.id ? 'Dwelling Type Updated Successfully.' : 'Dwelling Type Created Successfully.';
      const data = await this.dwellingTypeRepo.save(createDwellingTypeDto);
      
      return WriteResponse(200, data, Responsemsg);
    } catch (err) {
      console.log(err);
      return WriteResponse(500, false, 'Something went Wrong.');
    }
  }

  
  //GetAll
  async findAll() {
    try{
    const dwellingTypes = await this.dwellingTypeRepo.find({
      where: { is_deleted: false },
    });

    if (dwellingTypes.length>0) {
      return WriteResponse(
        200,
        dwellingTypes,
        'Dwelling Types Found Successfully.',
      );
    }
    else{
      return WriteResponse(404, false, 'Dwelling Types Not Found.');
    }
  }catch(error){
    console.log(error);
    return WriteResponse(500, false, 'Something went Wrong.');
    
  }
  }

  //Get One By Id
  async findOne(id: string) {
    try{
    const dwellingType = await this.dwellingTypeRepo.findOne({
      where: { id: id, is_deleted: false },
    });
    if (dwellingType) {
      return WriteResponse(
        200,
        dwellingType,
        'Dwelling Type Found Successfully.',
      );
    }
    else{
      return WriteResponse(404, false, 'Dwelling Type Not Found.');
    }
    }catch(error){
      console.log(error);
      return WriteResponse(500, false, 'Something went Wrong.');
      
    }
  }

   //Delete
   async remove(id: string) {
    try{
    const deletedDwellingType = await this.dwellingTypeRepo.findOne({
      where: { id:id, is_deleted: false },
    });
    if (!deletedDwellingType) {
      return WriteResponse(404, false, 'Dwelling Type Not found.');
    }
    else{
    await this.dwellingTypeRepo.update(id, { is_deleted: true });
    return WriteResponse(200, true, 'Dwelling Type Deleted Successfully.');
    }
  }catch(error){
    console.log(error);
    return WriteResponse(500, false, 'Something went Wrong.');
  }
  }
}
