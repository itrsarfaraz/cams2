import { Injectable } from '@nestjs/common';
import { CreateComponentFailureRateDto } from './dto/create-component_failure_rate.dto';
import { UpdateComponentFailureRateDto } from './dto/update-component_failure_rate.dto';
import { WriteResponse } from 'src/shared/response';
import { InjectRepository } from '@nestjs/typeorm';
import { ComponentFailureRate } from './entities/component_failure_rate.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ComponentFailureRatesService {
  constructor(
    @InjectRepository(ComponentFailureRate)
    private readonly componentFailureRateRepo: Repository<ComponentFailureRate>,
  ) { }
  
  async create(createComponentFailureRateDto: CreateComponentFailureRateDto) {
    try {
      const data = await this.componentFailureRateRepo.save(createComponentFailureRateDto);

      return WriteResponse(200, data, 'Component Failure Rate Created Successfully.');
    } catch (error) {
      console.log(error);
      return WriteResponse(500, false, 'Something Went Wrong.');
    }
  }

  async findAll() {
    try{
    const componentFailureRate = await this.componentFailureRateRepo.find({
      where: { is_deleted: false },
    });

    if (componentFailureRate.length>0) {
      return WriteResponse(
        200,
        componentFailureRate,
        'Component Failure Rate Found Successfully.',
      );
    }
    else{
      return WriteResponse(404, false, 'Component Failure Rate Not Found.');
    }
  }catch(error){
    console.log(error);
    return WriteResponse(500, false, 'Something went Wrong.');
    
  }
  }

  async findOne(field: string = 'id', identifier: string) {
    var whereCondition = { is_deleted: false, [field]: identifier };
    const componentFailureRate = await this.componentFailureRateRepo.findOne({ where: whereCondition });
    if (!componentFailureRate) {
      return WriteResponse(404, false, 'Component Failure Rate Not Found.');
    }
    return WriteResponse(200, componentFailureRate, 'Component Failure Rate Found Successfully.');
  }

 

  //Delete
  async remove(id: string) {
    try{
    const deletedComponentFailureRate = await this.componentFailureRateRepo.findOne({
      where: { id:id, is_deleted: false },
    });
    if (!deletedComponentFailureRate) {
      return WriteResponse(403, false, 'Component Failure Rate Not found.');
    }
    else{
    await this.componentFailureRateRepo.update(id, { is_deleted: true });
    return WriteResponse(200, true, 'Component Failure Rate Deleted Successfully.');
    }
  }catch(error){
    console.log(error);
    return WriteResponse(500, false, 'Something went Wrong.');
  }
  }
}
