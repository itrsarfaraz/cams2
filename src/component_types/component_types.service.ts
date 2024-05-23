import { Injectable } from '@nestjs/common';
import { CreateComponentTypeDto } from './dto/create-component_type.dto';
import { WriteResponse } from 'src/shared/response';
import { InjectRepository } from '@nestjs/typeorm';
import { ComponentTypes } from './entities/component_type.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ComponentTypesService {
  constructor(
    @InjectRepository(ComponentTypes)
    private readonly componentTypesRepo: Repository<ComponentTypes>,
    
  ) {}

  //Create-or-Update
  async create(createComponentTypeDto: CreateComponentTypeDto) {
    try {
      const existingComponentType = await this.componentTypesRepo.findOne({
        where: { name: createComponentTypeDto.name, is_deleted: false },
      });
  
      if (existingComponentType && existingComponentType.id !== createComponentTypeDto.id) {
        return WriteResponse(403, false, 'Component Type Already Exists.');
      }
  
      const Responsemsg = createComponentTypeDto.id ? 'Component Type Updated Successfully.' : 'Component Type Created Successfully.';
      const data = await this.componentTypesRepo.save(createComponentTypeDto);
      
      return WriteResponse(200, data, Responsemsg);
    } catch (err) {
      console.log(err);
      return WriteResponse(500, false, 'Something went Wrong.');
    }
  }
  
  
  
  
  


  //GetAll
  async findAll() {
    try{
    const componentTypes = await this.componentTypesRepo.find({
      where: { is_deleted: false },
    });

    if (componentTypes.length>0) {
      return WriteResponse(
        200,
        componentTypes,
        'Component Types Found Successfully.',
      );
    }
    else{
      return WriteResponse(404, false, 'Component Types Not Found.');
    }
  }catch(error){
    console.log(error);
    return WriteResponse(500, false, 'Something went Wrong.');
  }
  }

  //Get One By Id
  async findOne(id: string) {
    try{
    const componentType = await this.componentTypesRepo.findOne({
      where: { id: id, is_deleted: false },
    });
    if (componentType) {
      return WriteResponse(
        200,
        componentType,
        'Component Type Found Successfully.',
      );
    }
    else{
      return WriteResponse(404, false, 'Component Type Not Found.');
    }
    }catch(error){
      console.log(error);
      return WriteResponse(500, false, 'Something went Wrong.');
    }
  }
  
  //Delete
  async remove(id: string) {
    try{
    const deletedComponentType = await this.componentTypesRepo.findOne({
      where: { id:id, is_deleted: false },
    });
    if (!deletedComponentType) {
      return WriteResponse(404, false, 'Component Type Not found.');
    }
    else{
    await this.componentTypesRepo.update(id, { is_deleted: true });
    return WriteResponse(200, true, 'Component Type Deleted Successfully.');
    }
  }catch(error){
    console.log(error);
    return WriteResponse(500, false, 'Something went Wrong.');
  }
  }


}
