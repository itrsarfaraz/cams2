import { Injectable } from "@nestjs/common";
import { CreateComponentOutputDto,  GetComponentOutputDto } from "./dto/create-component_output.dto";
import { UpdateComponentOutputDto } from "./dto/update-component_output.dto";
import { WriteResponse } from "src/shared/response";
import { InjectRepository } from "@nestjs/typeorm";
import { ComponentOutput } from "./entities/component_output.entity";
import { Repository } from "typeorm";
import { ComponentCost } from "src/component_costs/entities/component_cost.entity";
import { ComponentFailureData } from "src/component_failure_data/entities/component_failure_data.entity";


@Injectable()
export class ComponentOutputsService {
  constructor(
    @InjectRepository(ComponentOutput)
    private readonly componentOutputRepo: Repository<ComponentOutput>,
    @InjectRepository(ComponentCost)
    private readonly componentCostRepo: Repository<ComponentCost>,
    @InjectRepository(ComponentFailureData)
    private readonly componentFailureDataRepo: Repository<ComponentFailureData>,
  ) { }
  async create(createComponentOutputDto: CreateComponentOutputDto) {
    try {
      var msg = "Component Outputs Created seccessfully.";
      if (createComponentOutputDto.id) {
        msg = "Component Outputs Update seccessfully.";
      }
      const componentOutput = await this.componentOutputRepo.save(createComponentOutputDto);
      return WriteResponse(200, componentOutput, msg);
    } catch (err) {
      console.log(err);
      return WriteResponse(500, false, "Something Went Wrong.");
    }
  }

  async getOutput(getComponentOutputDto: GetComponentOutputDto) {
    try {
      if(getComponentOutputDto.component_cost_id===null && getComponentOutputDto.component_failure_data_id===null){
        return WriteResponse(400, false, 'ID can not be null');
      }
      let data = {
        capex_cost: 0,
        planned_repairs_cost_per_year: 0,
        response_repairs_cost_per_year: 0
      }
      var costData = await this.componentCostRepo.findOne({
        where: { id: getComponentOutputDto.component_cost_id }
      })
      var failureData = await this.componentFailureDataRepo.findOne({
        where: { id: getComponentOutputDto.component_failure_data_id }
      })
      if (!getComponentOutputDto.component_cost_id) {
        data.capex_cost = 0;
        data.planned_repairs_cost_per_year = 0;
      } else {
        data.capex_cost = costData.purchase_cost || 0;
        data.planned_repairs_cost_per_year = (costData.planned_investment_total || 0) + (costData.maintenance_owner_total_cost || 0);
      }
      if (!getComponentOutputDto.component_failure_data_id) {
        data.response_repairs_cost_per_year = 0;
      } else {
        data.response_repairs_cost_per_year = failureData.total_cost_per_year_likely || 0;
      }

      
      return WriteResponse(200, data, 'Component Output Found Successfully');
    } catch (error) {
      console.log(error);
      return WriteResponse(500, false, "Something Went Wrong.");
    }
  }

  async findAll() {
    try {
      const componentOutput = await this.componentOutputRepo.find({ where: { is_deleted: false } });
      if (componentOutput.length > 0) {
        return WriteResponse(200, componentOutput, "Record Found.");
      }
      return WriteResponse(404, [], "Record Not Found.");
    } catch (err) {
      console.log(err);
      return WriteResponse(500, false, "Something Went Wrong.");
    }
  }

  async findOne(id: string) {
    try {
      const componentOutput = await this.componentOutputRepo.findOne({ where: { id: id, is_deleted: false } });
      if (componentOutput) {
        return WriteResponse(200, componentOutput, "Record Found.");
      }
      return WriteResponse(404, [], "Record Not Found.");
    } catch (err) {
      console.log(err);
      return WriteResponse(500, false, "Something Went Wrong.");
    }
  }

  async remove(id: string) {
    try {
      const componentOutput = await this.componentOutputRepo.findOne({
        where: { id: id, is_deleted: false },
      });
      if (!componentOutput) {
        return WriteResponse(404, [], "Record Not Found.");
      }
      await this.componentOutputRepo.update(id, { is_deleted: true });
      return WriteResponse(200, true, "Record Deleted Successfully.");
    } catch (err) {
      console.log(err);
      return WriteResponse(500, false, "Something Went Wrong.");
    }
  }
}
