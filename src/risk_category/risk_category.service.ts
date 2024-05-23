import { Injectable } from '@nestjs/common';
import { CreateRiskCategoryDto } from './dto/create-risk_category.dto';
import { UpdateRiskCategoryDto } from './dto/update-risk_category.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { RiskCategory } from './entities/risk_category.entity';
import { Repository } from 'typeorm';
import { WriteResponse } from 'src/shared/response';

@Injectable()
export class RiskCategoryService {
  constructor(
    @InjectRepository(RiskCategory)
    private readonly riskCategoryRepo: Repository<RiskCategory>,
  ) {}
  async create(createRiskCategoryDto: CreateRiskCategoryDto) {
    try {
      const existingRiskCategoryName = await this.riskCategoryRepo.findOne({
        where: { name: createRiskCategoryDto.name, is_deleted: false },
      });

      const existingRiskCategoryAbbr = await this.riskCategoryRepo.findOne({
        where: { abbreviation: createRiskCategoryDto.abbreviation, is_deleted: false },
      });
      
      if (
        existingRiskCategoryName &&
        existingRiskCategoryName.id !== createRiskCategoryDto.id
      ) {
        return WriteResponse(403, false, 'Risk Category Name Already Exists.');
      } 


      if (
        existingRiskCategoryAbbr &&
        existingRiskCategoryAbbr.id !== createRiskCategoryDto.id
      ) {
        return WriteResponse(403, false, 'Risk Category Abbreviation Already Exists.');
      } 

      
      const Responsemsg = createRiskCategoryDto.id
        ? 'Risk Category Updated Successfully.'
        : 'Risk Category Created Successfully.';
      const data = await this.riskCategoryRepo.save(createRiskCategoryDto);
      return WriteResponse(200, data, Responsemsg);
    } catch (err) {
      console.log(err);
      return WriteResponse(500, false, 'Something went Wrong.');
    }
  }

  //GetAll
  async findAll() {
    try{
    const riskCategories = await this.riskCategoryRepo.find({
      where: { is_deleted: false },
    });

    if (riskCategories.length>0) {
      return WriteResponse(
        200,
        riskCategories,
        'Risk Categories Found Successfully.',
      );
    }
    else{
      return WriteResponse(404, false, 'Risk Categories Not Found.');
    }
  }catch(error){
    console.log(error);
    return WriteResponse(500, false, 'Something went Wrong.');
    
  }
  }

  //Get One By Id
  async findOne(id: string) {
    try{
    const riskCategory = await this.riskCategoryRepo.findOne({
      where: { id: id, is_deleted: false },
    });
    if (riskCategory) {
      return WriteResponse(
        200,
        riskCategory,
        'Risk Category Found Successfully.',
      );
    }
    else{
      return WriteResponse(404, false, 'Risk Category Not Found.');
    }
    }catch(error){
      console.log(error);
      return WriteResponse(500, false, 'Something went Wrong.');
      
    }
  }

  //Delete
  async remove(id: string) {
    try{
    const deletedRiskCategory = await this.riskCategoryRepo.findOne({
      where: { id:id, is_deleted: false },
    });
    if (!deletedRiskCategory) {
      return WriteResponse(404, false, 'Risk Category Not found.');
    }
    else{
    await this.riskCategoryRepo.update(id, { is_deleted: true });
    return WriteResponse(200, true, 'Risk Category Deleted Successfully.');
    }
  }catch(error){
    console.log(error);
    return WriteResponse(500, false, 'Something went Wrong.');
  }
  }
}
