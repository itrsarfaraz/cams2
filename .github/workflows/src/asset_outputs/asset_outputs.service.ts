import { Injectable } from '@nestjs/common';
import { CreateAssetOutputDto,  GetAssetOutputDto } from './dto/create-asset_output.dto';
import { UpdateAssetOutputDto } from './dto/update-asset_output.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { AssetOutput } from './entities/asset_output.entity';
import { Repository } from 'typeorm';
import { WriteResponse } from 'src/shared/response';
import { AssetFinance } from 'src/asset_finance/entities/asset_finance.entity';
import { AssetComponent } from 'src/asset_components/entities/asset_component.entity';
import { ComponentOutput } from 'src/component_outputs/entities/component_output.entity';
import { AssetRisk } from 'src/asset_risk/entities/asset_risk.entity';

@Injectable()
export class AssetOutputsService {
  constructor(
    @InjectRepository(AssetOutput)
    private readonly assetOutputRepo: Repository<AssetOutput>,

    @InjectRepository(AssetFinance)
    private readonly assetFinanceRepo: Repository<AssetFinance>,

    @InjectRepository(AssetComponent)
    private readonly assetComponentRepo: Repository<AssetComponent>,

    @InjectRepository(ComponentOutput)
    private readonly componentOutputRepo: Repository<ComponentOutput>,

    @InjectRepository(AssetRisk)
    private readonly assetRiskRepo: Repository<AssetRisk>,
    
  ) {}
  async create(createAssetOutputDto: CreateAssetOutputDto) {
    try {
      const Responsemsg = createAssetOutputDto.id ? 'Asset Output Updated Successfully.' : 'Asset Output Created Successfully.';
      const data = await this.assetOutputRepo.save(createAssetOutputDto);
      
      return WriteResponse(200, data, Responsemsg);
    } catch (err) {
      console.log(err);
      return WriteResponse(500, false, 'Something went Wrong.');
    }
  }

  async getOutput(getAssetOutputDto: GetAssetOutputDto) {
    try {
      if(getAssetOutputDto.asset_id===null){
        return WriteResponse(400,false,'ID can not be null')
      }
      const assetFinance=await this.assetFinanceRepo.findOne({
        where:{asset_id:getAssetOutputDto.asset_id}
      })

      const assetComponents=await this.assetComponentRepo.find({
        where:{asset_detail_id:getAssetOutputDto.asset_id}
      })

      const assetRisks=await this.assetRiskRepo.find({
        where:{asset_detail_id:getAssetOutputDto.asset_id}
      })
      
      let data={
        asset_capital_investment:0,
        component_capital_investment:0,
        component_operational_investment:0,
        asset_risk_cost_profile:0
      }

      if(!getAssetOutputDto.asset_id){
        return WriteResponse(200,data,'Asset Output Not Found')
      }

      if(assetFinance){
        data.asset_capital_investment=assetFinance.total_capital_investment;
        data.component_operational_investment=assetFinance.total_operational_cost;
      }

      for (const ac of assetComponents) {
        const componentOutputs = await this.componentOutputRepo.find({
            where: { component_id: ac.component_id }
        });
        
        for (const componentOutput of componentOutputs) {
            data.component_capital_investment+=componentOutput.capex_cost;
            
        }
    }

    for (const ar of assetRisks){
      data.asset_risk_cost_profile+=ar.risk_amount
    }
      
      return WriteResponse(200,data,'Asset Output Found Successfully')
      
      
    } catch (error) {
      console.log(error);
      return WriteResponse(500, false, "Something Went Wrong.");
    }
  }

  //GetAll
  async findAll() {
    try{
    const assetOutput = await this.assetOutputRepo.find({
      where: { is_deleted: false },
    });

  
    

    if (assetOutput.length>0) {
      return WriteResponse(
        200,
        assetOutput,
        'Asset Output Found Successfully.',
      );
    }
    else{
      return WriteResponse(404, false, 'Asset Output Not Found.');
    }
  }catch(error){
    console.log(error);
    return WriteResponse(500, false, 'Something went Wrong.');
    
  }
  }

  //Get One By Id
  async findOne(id: string) {
    try{
    const assetOutput = await this.assetOutputRepo.findOne({
      where: { id: id, is_deleted: false },
    });
    if (assetOutput) {
      return WriteResponse(
        200,
        assetOutput,
        'Asset Output Found Successfully.',
      );
    }
    else{
      return WriteResponse(404, false, 'Asset Output Not Found.');
    }
    }catch(error){
      console.log(error);
      return WriteResponse(500, false, 'Something went Wrong.');
      
    }
  }

  //Delete
  async remove(id: string) {
    try{
    const deletedAssetOutput = await this.assetOutputRepo.findOne({
      where: { id:id, is_deleted: false },
    });
    if (!deletedAssetOutput) {
      return WriteResponse(403, false, 'Asset Output Not found.');
    }
    else{
    await this.assetOutputRepo.update(id, { is_deleted: true });
    return WriteResponse(200, true, 'Asset Output Deleted Successfully.');
    }
  }catch(error){
    console.log(error);
    return WriteResponse(500, false, 'Something went Wrong.');
  }
  }
}
