import { Injectable } from "@nestjs/common";
import { ComponentQuickExtendDTO, ComponentStatusDTO, CreateComponentDetailDto } from "./dto/create-component_detail.dto";
import { UpdateComponentDetailDto } from "./dto/update-component_detail.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { ComponentDetail } from "./entities/component_detail.entity";
import { In, LessThan, Repository } from "typeorm";
import { WriteResponse, paginateResponse } from "src/shared/response";
import { IPagination } from "src/shared/paginationEum";
import { ActivityLog } from "src/user/entities/user.entity";

@Injectable()
export class ComponentDetailService {
  constructor(
    @InjectRepository(ComponentDetail)
    private readonly componentDetailRepo: Repository<ComponentDetail>,
    @InjectRepository(ActivityLog)
    private readonly activityRepository: Repository<ActivityLog>,
  ) { }

  async createOrUpdate(createComponentDetailDto, req) {
    try {
      const userId = req.user.id;
      createComponentDetailDto.created_by = userId;
      const { component_make, component_model, id } = createComponentDetailDto;
      let activity = id ? "Update component" : "Create new component";
      let msg = id ? "Component Updated Successfully" : "Component Created Successfully";

      if (id) {
      createComponentDetailDto.updated_by = req.user.id;

        const existingComponent = await this.componentDetailRepo.findOne({ where: { id } });
        if (!existingComponent) {
          return WriteResponse(404, false, "Component not found.");
        }
        const existingComponentNumber = parseInt(existingComponent.component_reference_number.split("-")[2], 10);
        createComponentDetailDto.component_reference_number = await this.generateComponentReferenceNumber(component_make, component_model, existingComponentNumber);
      } else {
        const lastComponent = await this.componentDetailRepo.findOne({ where: { is_deleted: false }, order: { created_on: "DESC" } });
        const nextNumber = lastComponent ? parseInt(lastComponent.component_reference_number.split("-")[2], 10) + 1 : 1;
        createComponentDetailDto.component_reference_number = await this.generateComponentReferenceNumber(component_make, component_model, nextNumber);
      }

      createComponentDetailDto.construction_types_id = JSON.stringify(createComponentDetailDto.construction_types_id);

      const data = await this.componentDetailRepo.save(createComponentDetailDto);

      if (data) {
        await this.activityRepository.save({ activity, user_id: userId, type: "component-detail" });
      }

      return WriteResponse(200, data, msg);
    } catch (err) {
      console.log(err);
      return WriteResponse(500, false, "Something went Wrong.");
    }
  }

  async generateComponentReferenceNumber(componentMake, componentModel, number) {
    const paddedNextNumber = number.toString().padStart(4, "0");
    return `${componentMake.substring(0, 4).toUpperCase()}-${componentModel.substring(0, 4).toUpperCase()}-${paddedNextNumber}`;
  }



  async findAll() {
    try {
      const component = await this.componentDetailRepo.find({
        where: { is_deleted: false },
        relations: ['componentTypes', 'constructionType', 'componentLocation', 'componentName'],

      });
      if (component.length > 0) {
        return WriteResponse(200, component, "Record Found Seccessfully.");
      }
      return WriteResponse(404, [], "Record Not Found");
    } catch (err) {
      console.log(err);
      return WriteResponse(500, false, "Something Went Wrong.");
    }
  }

  async findOne(id: string) {
    try {
      const component = await this.componentDetailRepo.findOne({
        where: { id: id, is_deleted: false },
        relations: ['componentTypes', 'constructionType', 'componentLocation', 'componentName'],
      });
      if (component) {
        return WriteResponse(200, component, "Record Found.");
      }
      return WriteResponse(404, [], "Record Not Found");
    } catch (err) {
      console.log(err);
      return WriteResponse(500, false, "Something Went Wrong.");
    }
  }

  async createDuplicate(id: string) {
    try {
    let  component = await this.componentDetailRepo.findOne({
        where: { id: id, is_deleted: false },
        relations: ['componentTypes', 'constructionType', 'componentLocation', 'componentName'],
      });
    
      
      delete component.id;
      component.component_reference_number = `${component.component_reference_number}-dup`
      console.log('component----<<<<<<',component);
      // const data=await this.componentDetailRepo.save(component2)
      component.construction_types_id = JSON.stringify(component.construction_types_id)
      const data = await this.componentDetailRepo.save(component);
      if (component) {
        return WriteResponse(200, component, "Record  Found.");
      }
      return WriteResponse(404, [], "Record Not Found");
    } catch (err) {
      console.log(err);
      return WriteResponse(500, false, "Something Went Wrong.");
    }
  }


  async remove(id: string,req) {
    try {
      const userId = req.user.id;
      let activity = "Delete Component";
      const component = await this.componentDetailRepo.findOne({
        where: { id: id, is_deleted: false },
      });
      if (!component) {
        return WriteResponse(404, [], "Record Not Found");
      }
      await this.componentDetailRepo.update(id, { is_deleted: true });
      await this.activityRepository.save({ activity, user_id: userId, type: "component-detail" });
      return WriteResponse(200, true, "Record Deleted Successfully.");
    } catch (err) {
      console.log(err);
      return WriteResponse(500, false, "Something Went Wrong.");
    }
  }
  // Component Status
  async componentStatus(componentStatusDTO: ComponentStatusDTO, req) {
    try{
      const userId = req.user.id;
      let activity = "Component Status Change"
      const componentDetailStatus = await this.componentDetailRepo.find({
      where: {
        id: In(componentStatusDTO.componentDetails_ids),
        is_deleted: false,
      },
    });

    if (!componentDetailStatus) {
      return WriteResponse(400, false, "Record Not found.");
    }
    // if (!["Draft", "Registered", "Disposed"].includes(component_status)) {
    //   return WriteResponse(400, false, "Please Enter Correct Status.");
    // }

    await this.componentDetailRepo.update(
      componentStatusDTO.componentDetails_ids,
      {
        component_status: componentStatusDTO.component_status,
      },
    );
    await this.activityRepository.save({ activity, user_id: userId, type: "component-detail" });
    return WriteResponse(200, true, "Component Status Changed Successfully.");
  }catch(err){
    console.log(err);
    return WriteResponse(500,false,'Somthing Went Wrong')
    
  }
  }
  
  // Quick Extend year
  async quickExtend(quickExtendDTO: ComponentQuickExtendDTO, req) {
    try{
    const userId = req.user.id;
    let activity = "Extend Review Date";
    const componentReviewDate = await this.componentDetailRepo.find({
      where: {
        id: In(quickExtendDTO.componentDetails_ids),
        is_deleted: false,
      },
    });
    if (!componentReviewDate || componentReviewDate.length === 0) {
      return WriteResponse(400, false, "Records not found.");
    }
    const currentDate = new Date();
    const updatedComponentDetails = componentReviewDate.map((component) => {
      const currentReviewDate = new Date(component.component_review_date);
      const newReviewDate = new Date(
        currentReviewDate.getFullYear() + 1,
        currentReviewDate.getMonth(),
        currentReviewDate.getDate(),
      );
      return { id: component.id, component_review_date: newReviewDate };
    });

    await this.componentDetailRepo.save(updatedComponentDetails);
    await this.activityRepository.save({ activity, user_id: userId, type: "component-detail" });
    return WriteResponse(200, true, "Review Date Extended.");
  }catch(err){
    console.log(err);
    return WriteResponse(500,false,'Something Went Wrong')
    
  }
  }

  async findAllActiveComponents() {
    try {
      const currentDate = new Date();
      const activeComponentCount = await this.componentDetailRepo.count({
        where: { component_status: "ACTIVE", is_deleted: false },
      });
      const expireComponentCount = await this.componentDetailRepo.count({
        where: {
          component_review_date: LessThan(currentDate),
          is_deleted: false,
        },
      });
      const allComponentTotal = await this.componentDetailRepo.find({
        where: { is_deleted: false },
      });
      const allComponent = await this.componentDetailRepo.count({
        where: { is_deleted: false },
      });
      let totalCarbonCost = 0;
      allComponentTotal.forEach((component) => {
        totalCarbonCost += component.carbon_cost;
      });

      return WriteResponse(200, {
        active_Component: activeComponentCount,
        reviewing_Component: expireComponentCount,
        total_Carbon_Cost: totalCarbonCost,
        all_Component: allComponent,
      });
    } catch (err) {
      console.log(err);
      return WriteResponse(500, false, "Something Went Wrong.");
    }
  }


  async pagination(pagination: IPagination): Promise<any> {
    const { curPage, perPage, whereClause } = pagination;
    let lwhereClause = "f.is_deleted = false";
    const fieldsToSearch = [
      "component_reference_number",
      "component_make",
      "component_model",
      "component_status",
    ];
    fieldsToSearch.forEach((field) => {
      const fieldValue = whereClause.find((p) => p.key === field)?.value;
      if (fieldValue) {
        lwhereClause += ` AND f.${field} LIKE '%${fieldValue}%'`;
      }
    });

    const component_type_id = pagination.whereClause.find(
      (p: any) => p.key === "component_type_id" && p.value,
    );

    if (component_type_id) {
      lwhereClause += ` and f.component_type_id =  '${component_type_id.value}'`;
    }
    const component_type = pagination.whereClause.find(
      (p: any) => p.key === "component_type" && p.value,
  );
  if (component_type) {
      lwhereClause += ` AND componentTypes.name LIKE '%${component_type.value}%'`;
  }
    const component_name = pagination.whereClause.find(
      (p: any) => p.key === "component_name" && p.value,
  );
  if (component_name) {
      lwhereClause += ` AND componentName.name LIKE '%${component_name.value}%'`;
  }
    const component_location = pagination.whereClause.find(
      (p: any) => p.key === "component_location" && p.value,
  );
  if (component_location) {
      lwhereClause += ` AND componentLocation.name LIKE '%${component_location.value}%'`;
  }
    const allValue = whereClause.find((p) => p.key === "all")?.value;
    if (allValue) {
      const conditions = fieldsToSearch
        .map((field) => `f.${field} LIKE '%${allValue}%'`)
        .join(" OR ");
      lwhereClause += ` AND (${conditions})`;
    }
    const skip = (curPage - 1) * perPage;
    const [list, count] = await this.componentDetailRepo
      .createQueryBuilder("f")
      .leftJoinAndSelect('f.componentTypes', 'componentTypes')
      .leftJoinAndSelect('f.componentLocation', 'componentLocation')
      .leftJoinAndSelect('f.componentName', 'componentName')
      .leftJoinAndSelect('f.constructionType', 'constructionType')
      .where(lwhereClause)
      .skip(skip)
      .take(perPage)
      .orderBy("f.created_on", "DESC")
      .getManyAndCount();
    return paginateResponse(list, count);
  }
}
