import { Injectable } from '@nestjs/common';
import { CreateAssetCapitalInvestmentDto } from './dto/create-asset_capital_investment.dto';
import { UpdateAssetCapitalInvestmentDto } from './dto/update-asset_capital_investment.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { AssetCapitalInvestment } from './entities/asset_capital_investment.entity';
import { Repository } from 'typeorm';
import { WriteResponse } from 'src/shared/response';

@Injectable()
export class AssetCapitalInvestmentService {
  constructor(
    @InjectRepository(AssetCapitalInvestment)
    private readonly assetCapitalInvestmentRepo: Repository<AssetCapitalInvestment>,
    
  ) {}
  async create(createAssetCapitalInvestmentDto: CreateAssetCapitalInvestmentDto) {
    try {
      const Responsemsg = createAssetCapitalInvestmentDto.id ? 'Asset Capital Investment Updated Successfully.' : 'Asset Capital Investment Created Successfully.';
      const data = await this.assetCapitalInvestmentRepo.save(createAssetCapitalInvestmentDto);
      
      return WriteResponse(200, data, Responsemsg);
    } catch (err) {
      console.log(err);
      return WriteResponse(500, false, 'Something went Wrong.');
    }
  }

  //GetAll
  async findAll() {
    try{
    const assetCapitalInvestment = await this.assetCapitalInvestmentRepo.find({
      where: { is_deleted: false },
    });

  
    

    if (assetCapitalInvestment.length>0) {
      return WriteResponse(
        200,
        assetCapitalInvestment,
        'Asset Capital Investment Found Successfully.',
      );
    }
    else{
      return WriteResponse(404, false, 'Asset Capital Investment Not Found.');
    }
  }catch(error){
    console.log(error);
    return WriteResponse(500, false, 'Something went Wrong.');
    
  }
  }

  //Get One By Id
  async findOne(id: string) {
    try{
    const assetCapitalInvestment = await this.assetCapitalInvestmentRepo.findOne({
      where: { id: id, is_deleted: false },
    });
    if (assetCapitalInvestment) {
      return WriteResponse(
        200,
        assetCapitalInvestment,
        'Asset Capital Investment Found Successfully.',
      );
    }
    else{
      return WriteResponse(404, false, 'Asset Capital Investment Not Found.');
    }
    }catch(error){
      console.log(error);
      return WriteResponse(500, false, 'Something went Wrong.');
      
    }
  }

  //Delete
  async remove(id: string) {
    try{
    const deletedAssetCapitalInvestment = await this.assetCapitalInvestmentRepo.findOne({
      where: { id:id, is_deleted: false },
    });
    if (!deletedAssetCapitalInvestment) {
      return WriteResponse(403, false, 'Asset Capital Investment Not found.');
    }
    else{
    await this.assetCapitalInvestmentRepo.update(id, { is_deleted: true });
    return WriteResponse(200, true, 'Asset Capital Investment Deleted Successfully.');
    }
  }catch(error){
    console.log(error);
    return WriteResponse(500, false, 'Something went Wrong.');
  }
  }
}
