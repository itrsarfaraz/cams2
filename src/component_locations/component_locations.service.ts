import { Injectable } from '@nestjs/common';
import { CreateComponentLocationDto } from './dto/create-component_location.dto';
import { Repository } from 'typeorm';
import { ComponentLocation } from './entities/component_location.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { WriteResponse } from 'src/shared/response';

@Injectable()
export class ComponentLocationsService {
  constructor(
    @InjectRepository(ComponentLocation)
    private readonly componentLocationRepo: Repository<ComponentLocation>,
  ) {}
  async create(createComponentLocationDto: CreateComponentLocationDto) {
    try {
      const existingComponent = await this.componentLocationRepo.findOne({
        where: { name: createComponentLocationDto.name, is_deleted: false },
      });
      if (
        existingComponent &&
        existingComponent.id !== createComponentLocationDto.id
      ) {
        return WriteResponse(403, false, "Component Location Already Exists.");
      }
      const Responsemsg = createComponentLocationDto.id
        ? "Component Name Updated Successfully."
        : "Component Name Created Successfully.";
      const data = await this.componentLocationRepo.save(
        createComponentLocationDto,
      );
      return WriteResponse(200, data, Responsemsg);
    } catch (err) {
      console.log(err);
      return WriteResponse(500, false, "Something went Wrong.");
    }
  }

  async findAll() {
    try {
      const componentLocation = await this.componentLocationRepo.find({
        where: { is_deleted: false },
      });
      if (componentLocation.length > 0) {
        return WriteResponse(200, componentLocation, "Record Found.");
      }
      return WriteResponse(404, [], "Record Not Found");
    } catch (err) {
      console.log(err);
      return WriteResponse(500, false, "Something Went Wrong.");
    }
  }

  async findOne(id: string) {
    try {
      const componentLocation = await this.componentLocationRepo.findOne({
        where: { id: id, is_deleted: false },
      });
      if (componentLocation) {
        return WriteResponse(
          200,
          componentLocation,
          "Record Found Seccessfully.",
        );
      }
      return WriteResponse(404, [], "Record Not Found");
    } catch (err) {
      console.log(err);
      return WriteResponse(500, false, "Something Went Wrong.");
    }
  }

  async remove(id: string) {
    try {
      const componentLocation = await this.componentLocationRepo.findOne({
        where: { id: id, is_deleted: false },
      });
      if (!componentLocation) {
        return WriteResponse(404, [], "Record Not Found");
      }
      await this.componentLocationRepo.update(id, { is_deleted: true });
      return WriteResponse(200, true, "Record is Deleted.");
    } catch (err) {
      console.log(err);
      return WriteResponse(500, false, "Something Went Wrong.");
    }
  }
}
