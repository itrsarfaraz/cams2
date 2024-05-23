import { Injectable } from '@nestjs/common';
import { CreateSustainabilityDevelopmentGoalDto } from './dto/create-sustainability_development_goal.dto';
import { UpdateSustainabilityDevelopmentGoalDto } from './dto/update-sustainability_development_goal.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { SustainabilityDevelopmentGoal } from './entities/sustainability_development_goal.entity';
import { Repository } from 'typeorm';
import { WriteResponse } from 'src/shared/response';

@Injectable()
export class SustainabilityDevelopmentGoalService {
  constructor(
    @InjectRepository(SustainabilityDevelopmentGoal)
    private readonly sustainabilityDevelopmentGoalRepo: Repository<SustainabilityDevelopmentGoal>,
    
  ) {}
  async create(createSustainabilityDevelopmentGoalDto: CreateSustainabilityDevelopmentGoalDto) {
    try {
      const existingSustainabilityDevelopmentGoal = await this.findSustainabilityDevelopmentGoal(createSustainabilityDevelopmentGoalDto.name);
  
      if (existingSustainabilityDevelopmentGoal && existingSustainabilityDevelopmentGoal.id !== createSustainabilityDevelopmentGoalDto.id) {
        return WriteResponse(403, false, 'Sustainability Development Goal Already Exists.');
      }
  
      const Responsemsg = createSustainabilityDevelopmentGoalDto.id ? 'Sustainability Development Goal Updated Successfully.' : 'Sustainability Development Goal Created Successfully.';
      const data = await this.sustainabilityDevelopmentGoalRepo.save(createSustainabilityDevelopmentGoalDto);
      
      return WriteResponse(200, data, Responsemsg);
    } catch (err) {
      console.log(err);
      return WriteResponse(500, false, 'Something went Wrong.');
    }
  }

  async findSustainabilityDevelopmentGoal(sustainabilityDevelopmentGoal: string) {
    return await this.sustainabilityDevelopmentGoalRepo.findOne({
      where: { name: sustainabilityDevelopmentGoal, is_deleted: false },
    });
  }

  //GetAll
  async findAll() {
    try{
    const sustainabilityDevelopmentGoals = await this.sustainabilityDevelopmentGoalRepo.find({
      where: { is_deleted: false },
    });

    if (sustainabilityDevelopmentGoals.length>0) {
      return WriteResponse(
        200,
        sustainabilityDevelopmentGoals,
        'Sustainability Development Goals Found Successfully.',
      );
    }
    else{
      return WriteResponse(404, false, 'Sustainability Development Goals Not Found.');
    }
  }catch(error){
    console.log(error);
    return WriteResponse(500, false, 'Something went Wrong.');
    
  }
  }

  //Get One By Id
  async findOne(id: string) {
    try{
    const sustainabilityDevelopmentGoal = await this.sustainabilityDevelopmentGoalRepo.findOne({
      where: { id: id, is_deleted: false },
    });
    if (sustainabilityDevelopmentGoal) {
      return WriteResponse(
        200,
        sustainabilityDevelopmentGoal,
        'Sustainability Development Goal Successfully.',
      );
    }
    else{
      return WriteResponse(404, false, 'Sustainability Development Goal Not Found.');
    }
    }catch(error){
      console.log(error);
      return WriteResponse(500, false, 'Something went Wrong.');
      
    }
  }

   //Delete
   async remove(id: string) {
    try{
    const deletedSustainabilityDevelopmentGoal = await this.sustainabilityDevelopmentGoalRepo.findOne({
      where: { id:id, is_deleted: false },
    });
    if (!deletedSustainabilityDevelopmentGoal) {
      return WriteResponse(404, false, 'Sustainability Development Goal Not found.');
    }
    else{
    await this.sustainabilityDevelopmentGoalRepo.update(id, { is_deleted: true });
    return WriteResponse(200, true, 'Sustainability Development Goal Deleted Successfully.');
    }
  }catch(error){
    console.log(error);
    return WriteResponse(500, false, 'Something went Wrong.');
  }
  }
}
