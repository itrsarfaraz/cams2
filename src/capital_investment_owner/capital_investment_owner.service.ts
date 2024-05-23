import { Injectable } from '@nestjs/common';
import { CreateCapitalInvestmentOwnerDto } from './dto/create-capital_investment_owner.dto';
import { UpdateCapitalInvestmentOwnerDto } from './dto/update-capital_investment_owner.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { CapitalInvestmentOwner } from './entities/capital_investment_owner.entity';
import { Repository } from 'typeorm';
import { WriteResponse } from 'src/shared/response';

@Injectable()
export class CapitalInvestmentOwnerService {
  constructor(
    @InjectRepository(CapitalInvestmentOwner)
    private readonly capitalInvestmentOwnerRepo: Repository<CapitalInvestmentOwner>,
    
  ) {}
  async create(createCapitalInvestmentOwnerDto: CreateCapitalInvestmentOwnerDto) {
    try {
      const existingCapitalInvestmentOwner = await this.capitalInvestmentOwnerRepo.findOne({
        where: { name: createCapitalInvestmentOwnerDto.name, is_deleted: false },
      });
  
      if (existingCapitalInvestmentOwner && existingCapitalInvestmentOwner.id !== createCapitalInvestmentOwnerDto.id) {
        return WriteResponse(403, false, 'Capital Investment Owner Already Exists.');
      }
  
      const Responsemsg = createCapitalInvestmentOwnerDto.id ? 'Capital Investment Owner Updated Successfully.' : 'Capital Investment Owner Created Successfully.';
      const data = await this.capitalInvestmentOwnerRepo.save(createCapitalInvestmentOwnerDto);
      
      return WriteResponse(200, data, Responsemsg);
    } catch (err) {
      console.log(err);
      return WriteResponse(500, false, 'Something went Wrong.');
    }
  }

  

  //GetAll
  async findAll() {
    try{
    const capitalInvestmentOwners = await this.capitalInvestmentOwnerRepo.find({
      where: { is_deleted: false },
    });

    if (capitalInvestmentOwners.length>0) {
      return WriteResponse(
        200,
        capitalInvestmentOwners,
        'Capital Investment Owners Found Successfully.',
      );
    }
    else{
      return WriteResponse(404, false, 'Capital Investment Owners Not Found.');
    }
  }catch(error){
    console.log(error);
    return WriteResponse(500, false, 'Something went Wrong.');
    
  }
  }

  //Get One By Id
  async findOne(id: string) {
    try{
    const capitalInvestmentOwner = await this.capitalInvestmentOwnerRepo.findOne({
      where: { id: id, is_deleted: false },
    });
    if (capitalInvestmentOwner) {
      return WriteResponse(
        200,
        capitalInvestmentOwner,
        'Capital Investment Owner Found Successfully.',
      );
    }
    else{
      return WriteResponse(404, false, 'Capital Investment Owner Not Found.');
    }
    }catch(error){
      console.log(error);
      return WriteResponse(500, false, 'Something went Wrong.');
      
    }
  }

   //Delete
   async remove(id: string) {
    try{
    const deletedCapitalInvestmentOwner = await this.capitalInvestmentOwnerRepo.findOne({
      where: { id:id, is_deleted: false },
    });
    if (!deletedCapitalInvestmentOwner) {
      return WriteResponse(403, false, 'Capital Investment Owner Not found.');
    }
    else{
    await this.capitalInvestmentOwnerRepo.update(id, { is_deleted: true });
    return WriteResponse(200, true, 'Capital Investment Owner Deleted Successfully.');
    }
  }catch(error){
    console.log(error);
    return WriteResponse(500, false, 'Something went Wrong.');
  }
  }
}
