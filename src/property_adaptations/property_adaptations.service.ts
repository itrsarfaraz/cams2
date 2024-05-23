import { Injectable } from '@nestjs/common';
import { CreatePropertyAdaptationDto } from './dto/create-property_adaptation.dto';
import { UpdatePropertyAdaptationDto } from './dto/update-property_adaptation.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { PropertyAdaptation } from './entities/property_adaptation.entity';
import { Repository } from 'typeorm';
import { WriteResponse } from 'src/shared/response';

@Injectable()
export class PropertyAdaptationsService {
  constructor(
    @InjectRepository(PropertyAdaptation)
    private readonly propertyAdaptationRepo: Repository<PropertyAdaptation>,
    
  ) {}
  async create(createPropertyAdaptationDto: CreatePropertyAdaptationDto) {
    try {
      const existingPropertyAdaptation = await this.propertyAdaptationRepo.findOne({
        where: { name: createPropertyAdaptationDto.name, is_deleted: false },
      });
      if (existingPropertyAdaptation && existingPropertyAdaptation.id !== createPropertyAdaptationDto.id) {
        return WriteResponse(403, false, 'Property Adaptation Already Exists.');
      }
  
      const Responsemsg = createPropertyAdaptationDto.id ? 'Property Adaptation Updated Successfully.' : 'Property Adaptation Created Successfully.';
      const data = await this.propertyAdaptationRepo.save(createPropertyAdaptationDto);
      
      return WriteResponse(200, data, Responsemsg);
    } catch (err) {
      console.log(err);
      return WriteResponse(500, false, 'Something went Wrong.');
    }
  }

  

  //GetAll
  async findAll() {
    try{
    const propertyAdaptations = await this.propertyAdaptationRepo.find({
      where: { is_deleted: false },
    });

    if (propertyAdaptations.length>0) {
      return WriteResponse(
        200,
        propertyAdaptations,
        'Property Adaptations Found Successfully.',
      );
    }
    else{
      return WriteResponse(404, false, 'Property Adaptations Not Found.');
    }
  }catch(error){
    console.log(error);
    return WriteResponse(500, false, 'Something went Wrong.');
    
  }
  }

  //Get One By Id
  async findOne(id: string) {
    try{
    const propertyAdaptation = await this.propertyAdaptationRepo.findOne({
      where: { id: id, is_deleted: false },
    });
    if (propertyAdaptation) {
      return WriteResponse(
        200,
        propertyAdaptation,
        'Property Adaptation Found Successfully.',
      );
    }
    else{
      return WriteResponse(404, false, 'Property Adaptation Not Found.');
    }
    }catch(error){
      console.log(error);
      return WriteResponse(500, false, 'Something went Wrong.');
      
    }
  }

   //Delete
   async remove(id: string) {
    try{
    const deletedPropertyAdaptation = await this.propertyAdaptationRepo.findOne({
      where: { id:id, is_deleted: false },
    });
    if (!deletedPropertyAdaptation) {
      return WriteResponse(404, false, 'Property Adaptation Not found.');
    }
    else{
    await this.propertyAdaptationRepo.update(id, { is_deleted: true });
    return WriteResponse(200, true, 'Property Adaptation Deleted Successfully.');
    }
  }catch(error){
    console.log(error);
    return WriteResponse(500, false, 'Something went Wrong.');
  }
  }
}
