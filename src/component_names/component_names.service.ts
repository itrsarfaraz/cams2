import { Injectable } from '@nestjs/common';
import { CreateComponentNameDto } from './dto/create-component_name.dto';
import { UpdateComponentNameDto } from './dto/update-component_name.dto';
import { WriteResponse } from 'src/shared/response';
import { InjectRepository } from '@nestjs/typeorm';
import { ComponentName } from './entities/component_name.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ComponentNamesService {
  constructor(
    @InjectRepository(ComponentName)
    private readonly componentNameRepo: Repository<ComponentName>,
  ) {}
  // async create(createComponentNameDto: CreateComponentNameDto) {
  //   try {
  //     var Responsemsg = 'Component Name Created Successfully.';
  //     const component = await this.componentNameRepo.findOne({
  //       where: { id: createComponentNameDto.id, is_deleted: false },
  //     });
  //     console.log('component----->>>', component);
  //     if (createComponentNameDto.id) {
  //       Responsemsg = 'Component Name Updated Successfully.';
  //       const DtoName = await this.findBycomponentName(
  //         createComponentNameDto.name,
  //       );
  //       if (DtoName && DtoName.id !== component.id) {
  //         return WriteResponse(400, false, 'Component Name Already Exists.');
  //       }
  //     }
  //     const DtoName = await this.findBycomponentName(
  //       createComponentNameDto.name,
  //     );
  //     if (DtoName && DtoName.id !== component.id) {
  //       return WriteResponse(400, false, 'Component Name Already Exists.');
  //     }
  //     const data = await this.componentNameRepo.save(createComponentNameDto);
  //     return WriteResponse(200, data, Responsemsg);
  //   } catch (err) {
  //     console.log(err);
  //     return WriteResponse(500, false, 'Something went Wrong.');
  //   }
  // }

  // async findBycomponentName(componentName: string) {
  //   return await this.componentNameRepo.findOne({
  //     where: { name: componentName, is_deleted: false },
  //   });
  // }

  async create(createComponentNameDto: CreateComponentNameDto) {
    try {
      const existingComponent = await this.componentNameRepo.findOne({
        where: { name: createComponentNameDto.name, is_deleted: false },
      });
      // const existingComponent = await this.findBycomponentName(
      //   createComponentNameDto.name,
      // );
      if (
        existingComponent &&
        existingComponent.id !== createComponentNameDto.id
      ) {
        return WriteResponse(403, false, 'Component Name Already Exists.');
      }
      const Responsemsg = createComponentNameDto.id
        ? 'Component Name Updated Successfully.'
        : 'Component Name Created Successfully.';
      const data = await this.componentNameRepo.save(createComponentNameDto);
      return WriteResponse(200, data, Responsemsg);
    } catch (err) {
      console.log(err);
      return WriteResponse(500, false, 'Something went Wrong.');
    }
  }

  // async findBycomponentName(componentName: string) {
  //   return await this.componentNameRepo.findOne({
  //     where: { name: componentName, is_deleted: false },
  //   });
  // }

  async findAll() {
    try {
      const componentName = await this.componentNameRepo.find({
        where: { is_deleted: false },
      });
      if (componentName.length > 0) {
        return WriteResponse(200, componentName, 'Record Found Seccessfully.');
      }
      return WriteResponse(404, [], 'Record Not Found');
    } catch (err) {
      console.log(err);
      return WriteResponse(500, false, 'Something Went Wrong.');
    }
  }

  async findOne(id: string) {
    try {
      const componentName = await this.componentNameRepo.findOne({
        where: { id: id, is_deleted: false },
      });
      if (componentName) {
        return WriteResponse(200, componentName, 'Record Found Seccessfully.');
      }
      return WriteResponse(404, [], 'Record Not Found');
    } catch (err) {
      console.log(err);
      return WriteResponse(500, false, 'Something Went Wrong.');
    }
  }

  async remove(id: string) {
    try {
      const componentName = await this.componentNameRepo.findOne({
        where: { id: id, is_deleted: false },
      });
      if (!componentName) {
        return WriteResponse(404, [], 'Record Not Found');
      }
      await this.componentNameRepo.update(id, { is_deleted: true });
      return WriteResponse(200, true, 'Record Deleted Successfully.');
    } catch (err) {
      console.log(err);
      return WriteResponse(500, false, 'Something Went Wrong.');
    }
  }
}
