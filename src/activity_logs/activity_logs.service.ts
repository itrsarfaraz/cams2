import { Injectable } from '@nestjs/common';
import { WriteResponse, paginateResponse } from 'src/shared/response';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ActivityLog } from './entities/activity_log.entity';
import { IPagination } from 'src/shared/paginationEum';

@Injectable()
export class ActivityLogsService {
  constructor(
    @InjectRepository(ActivityLog)
    private readonly logRepo: Repository<ActivityLog>,
  ) {}
  async create(createActivityLogDto: any) {
    const data = await this.logRepo.save(createActivityLogDto);
    return WriteResponse(200, data, 'Log Created Successfully.');
  }

  async findAll() {
    try {
      const activityDetail = await this.logRepo.find({
        where: { is_deleted: false },
      });
      if (activityDetail.length > 0) {
        return WriteResponse(200, activityDetail, 'Activity Detail Found Successfully.');
      }
      else {
        return WriteResponse(404, false, 'Activity Detail Not Found.');
      }
    } catch (error) {
      console.log(error);
      return WriteResponse(500, false, 'Something went Wrong.');
    }
  }

  async findOne(id: string) {
    try {
      const activityDetail = await this.logRepo.findOne({
        where: { id: id, is_deleted: false }
      });
      if (activityDetail) {
        return WriteResponse(200, activityDetail, 'Activity Detail Found Successfully.');
      }
      else {
        return WriteResponse(404, false, 'Activity Detail Not Found.');
      }
    } catch (error) {
      console.log(error);
      return WriteResponse(500, false, 'Something went Wrong.');
    }
  }

  async remove(id: string) {
    return `This action removes a #${id} activityLog`;
  }

  async pagination(pagination: IPagination): Promise<any> {
    const { curPage, perPage, whereClause } = pagination;
    let lwhereClause = "f.is_deleted = false";
    const fieldsToSearch = [
      "activity",
      "type",
    ];
    fieldsToSearch.forEach((field) => {
      const fieldValue = whereClause.find((p) => p.key === field)?.value;
      if (fieldValue) {
        lwhereClause += ` AND f.${field} LIKE '${fieldValue}'`;
      }
    });
    const activity_date = pagination.whereClause.find(
      (p: any) => p.key === "activity_date" && p.value,
    );
    if (activity_date) {
      const dateOnly = activity_date.value.split(' ')[0]; 
      lwhereClause += ` and DATE(f.activity_date) = '${dateOnly}'`;
    }
    const allValue = whereClause.find((p) => p.key === "all")?.value;
    if (allValue) {
      const conditions = fieldsToSearch
        .map((field) => `f.${field} LIKE '%${allValue}%'`)
        .join(" OR ");
      lwhereClause += ` AND (${conditions})`;
    }
    const skip = (curPage - 1) * perPage;
    const [list, count] = await this.logRepo
      .createQueryBuilder("f")
      .where(lwhereClause)
      .skip(skip)
      .take(perPage)
      .orderBy("f.created_on", "DESC")
      .getManyAndCount();
    return paginateResponse(list, count);
  }
}
