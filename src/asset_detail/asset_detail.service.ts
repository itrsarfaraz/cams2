import { Injectable } from '@nestjs/common';
import { AssetStatusDTO, CreateAssetDetailDto, QuickExtendsDTO } from './dto/create-asset_detail.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { AssetDetail } from './entities/asset_detail.entity';
import { In, LessThan, Like, Repository } from 'typeorm';
import { WriteResponse, paginateResponse } from 'src/shared/response';
import { IPagination } from 'src/shared/paginationEum';
import { DwellingType } from 'src/dwelling_type/entities/dwelling_type.entity';
import { AssetFinance } from 'src/asset_finance/entities/asset_finance.entity';
import { ActivityLog } from 'src/activity_logs/entities/activity_log.entity';

@Injectable()
export class AssetDetailService {
  constructor(
    @InjectRepository(AssetDetail)
    private readonly assetDetailRepo: Repository<AssetDetail>,
    @InjectRepository(DwellingType)
    private readonly dwellingTypeRepo: Repository<DwellingType>,
    @InjectRepository(AssetFinance)
    private readonly assetFinanceRepo: Repository<AssetFinance>,
    @InjectRepository(ActivityLog)
    private readonly activityRepository: Repository<ActivityLog>,

  ) { }
  async create(createAssetDetailDto: CreateAssetDetailDto,req) {
    try {
      const userId = req.user.id;
      createAssetDetailDto.createdBy = userId;
      const { id } = createAssetDetailDto;
      let activity = id ? "Update asset" : "Create new asset";
      var existingAssetDetail=await this.assetDetailRepo.findOne({
        where:{asset_name:createAssetDetailDto.asset_name}
      })
      if(existingAssetDetail&&existingAssetDetail.id!==createAssetDetailDto.id){
        return WriteResponse(403, false, 'Asset Detail Already Exists.');
      }
      var dwellingTypeAbr=await this.dwellingTypeRepo.findOne({
        where:{id:createAssetDetailDto.dwelling_type_id}
      })
      if (!createAssetDetailDto.id) {
        createAssetDetailDto.updatedBy = userId;
        createAssetDetailDto.asset_dwellingType_abbr=dwellingTypeAbr.abbreviation;
        var randomText = generateRandomNumber();
        createAssetDetailDto.asset_reference_number = createAssetDetailDto.asset_name + '-' + createAssetDetailDto.asset_dwellingType_abbr + '-' + createAssetDetailDto.number_of_bedrooms + '-' + randomText
      }
      const Responsemsg = createAssetDetailDto.id ? 'Asset Updated Successfully.' : 'Asset Created Successfully.';
      const data = await this.assetDetailRepo.save(createAssetDetailDto);
      if (data) {
        await this.activityRepository.save({ activity, user_id: userId, type: "asset-detail" });
      }
      return WriteResponse(200, data, Responsemsg);
    } catch (err) {
      console.log(err);
      return WriteResponse(500, false, 'Something went Wrong.');
    }
  }
  //GetAll
  async findAll() {
    try {
      const assetDetail = await this.assetDetailRepo.find({
        where: { is_deleted: false },
        relations:['assetOwnerDepartment','propertyAdaptation','constructionType','dwellingType','assetType']
      });
      if (assetDetail.length > 0) {
        return WriteResponse(200, assetDetail, 'Asset Detail Found Successfully.');
      }
      else {
        return WriteResponse(404, false, 'Asset Detail Not Found.');
      }
    } catch (error) {
      console.log(error);
      return WriteResponse(500, false, 'Something went Wrong.');
    }
  }
  //Get One By Id
  async findOne(id: string) {
    try {
      const assetDetail = await this.assetDetailRepo.findOne({
        where: { id: id, is_deleted: false },
        relations:['assetOwnerDepartment','propertyAdaptation','constructionType','dwellingType','assetType']
      });
      if (assetDetail) {
        return WriteResponse(200, assetDetail, 'Asset Detail Found Successfully.');
      }
      else {
        return WriteResponse(404, false, 'Asset Detail Not Found.');
      }
    } catch (error) {
      console.log(error);
      return WriteResponse(500, false, 'Something went Wrong.');
    }
  }

  //Delete
  async remove(id: string,req) {
    try {
      const userId = req.user.id;
      let activity = "Delete asset" ;
      const deletedAssetDetail = await this.assetDetailRepo.findOne({
        where: { id: id, is_deleted: false },
      });
      if (!deletedAssetDetail) {
        return WriteResponse(403, false, 'Asset Detail Not found.');
      }
      else {
        await this.assetDetailRepo.update(id, { is_deleted: true });
        await this.activityRepository.save({ activity, user_id: userId, type: "asset-detail" });
        return WriteResponse(200, true, 'Asset Detail Deleted Successfully.');
      }
    } catch (error) {
      console.log(error);
      return WriteResponse(500, false, 'Something went Wrong.');
    }
  }

  //Asset Status
  async assetStatus(assetStatusDTO: AssetStatusDTO, req) {
    try {
      const userId = req.user.id;
      let activity = "Asset status changed" ;
      const assetDetailStatus = await this.assetDetailRepo.find({
        where: {
          id: In(assetStatusDTO.assetDetails_ids),
          is_deleted: false,
        },
      });
  
      if (!assetDetailStatus) {
        return WriteResponse(400, false, "Record Not found.");
      }
      await this.assetDetailRepo.update(
        assetStatusDTO.assetDetails_ids,
        {
          asset_status: assetStatusDTO.asset_status,
        },
      );
      await this.activityRepository.save({ activity, user_id: userId, type: "asset-detail" });
      return WriteResponse(200, true, "Asset Status Changed Successfully.");
    } catch (err) {
      console.log(err);
      return WriteResponse(500, false, "Something Went Wrong.");
   }
  }

  // Quick Extend year
  async quickExtend(quickExtendDTO: QuickExtendsDTO, req) {
    try {
      const userId = req.user.id;
      let activity = "Extent asset review date" ;
      const assetReviewDate = await this.assetDetailRepo.find({
        where: {
          id: In(quickExtendDTO.assetDetails_ids),
          is_deleted: false,
        },
      });
      if (!assetReviewDate || assetReviewDate.length === 0) {
        return WriteResponse(400, false, "Records not found.");
      }
      const currentDate = new Date();
      const updatedComponentDetails = assetReviewDate.map((asset) => {
        const currentReviewDate = new Date(asset.review_date);
        const newReviewDate = new Date(
          currentReviewDate.getFullYear() + 1,
          currentReviewDate.getMonth(),
          currentReviewDate.getDate(),
        );
        return { id: asset.id, review_date: newReviewDate };
      });
      await this.assetDetailRepo.save(updatedComponentDetails);
      await this.activityRepository.save({ activity, user_id: userId, type: "asset-detail" });
      return WriteResponse(200, true, "Review Date Extended.");
    } catch (err) {
      console.log(err);
      return WriteResponse(500, false, "Something Went Wrong.");
   }
  }

  async dashboard(){
    try {
      let data={
        active_assets:0,
        assets_review:0,
        total_value:0
      }
      const activeAssets=await this.assetDetailRepo.count({
        where:{asset_status:"ACTIVE",is_deleted:false}
      })
      const totalValue=await this.assetFinanceRepo.find({
        where:{is_deleted:false}
      })
      const currentDate = new Date();
      const expireAssetCount = await this.assetDetailRepo.count({
        where: {
          review_date: LessThan(currentDate),
          is_deleted: false,
        },
      });
      data.active_assets=activeAssets;
      data.assets_review=expireAssetCount;
      if(totalValue.length>0){
        for(let tv of totalValue){
          data.total_value+=tv.total_capital_investment;
        }
      }
      return WriteResponse(200,data,'Asset Dashboard Found Successfully')
    } catch (error) {
      console.log(error);
      return WriteResponse(500,false,'Internal Server Error')
    }
  }

  async pagination(pagination: IPagination): Promise<any> {
    const { curPage, perPage, whereClause } = pagination;
    let lwhereClause = "f.is_deleted = false";
    const fieldsToSearch = [
      "asset_reference_number",
      "number_of_bedrooms",
      "asset_status",
      "asset_name",
    ];
    fieldsToSearch.forEach((field) => {
      const fieldValue = whereClause.find((p) => p.key === field)?.value;
      if (fieldValue) {
        lwhereClause += ` AND f.${field} LIKE '%${fieldValue}%'`;
      }
    });
    const review_date = pagination.whereClause.find(
      (p: any) => p.key === "review_date" && p.value,
    );
    if (review_date) {
      lwhereClause += ` and f.review_date <  '${review_date.value}'`;
    }
    const allValue = whereClause.find((p) => p.key === "all")?.value;
    if (allValue) {
      const conditions = fieldsToSearch
        .map((field) => `f.${field} LIKE '%${allValue}%'`)
        .join(" OR ");
      lwhereClause += ` AND (${conditions})`;
    }
    const skip = (curPage - 1) * perPage;
    const [list, count] = await this.assetDetailRepo
      .createQueryBuilder("f")
      .leftJoinAndSelect('f.assetOwnerDepartment','assetOwnerDepartment')
      .leftJoinAndSelect('f.propertyAdaptation','propertyAdaptation')
      .leftJoinAndSelect('f.constructionType','constructionType')
      .leftJoinAndSelect('f.dwellingType','dwellingType')
      .leftJoinAndSelect('f.assetType','assetType')
      .where(lwhereClause)
      .skip(skip)
      .take(perPage)
      .orderBy("f.created_on", "DESC")
      .getManyAndCount();
    return paginateResponse(list, count);
  }

  async createDuplicate(id: string) {
    try {
       const asset = await this.assetDetailRepo.findOne({
            where: { id: id, is_deleted: false },
        });
        if (!asset) {
            return WriteResponse(404, [], "Record Not Found");
        }
        const highestSuffixCount = await this.findHighestSuffixCount(asset.asset_reference_number);
        const duplicateAsset = { ...asset }; 
        delete duplicateAsset.id; 
        duplicateAsset.asset_reference_number = `${asset.asset_reference_number}-dup${highestSuffixCount}`; 
        const savedDuplicateAsset = await this.assetDetailRepo.save(duplicateAsset);
        if (savedDuplicateAsset) {
            return WriteResponse(200, savedDuplicateAsset, "Duplicate Asset Created Successfully.");
        } else {
            return WriteResponse(500, false, "Failed to Create Duplicate Asset.");
        }
    } catch (err) {
        console.log(err);
        return WriteResponse(500, false, "Something Went Wrong.");
    }
}

async findHighestSuffixCount(assetReferenceNumber: string): Promise<number> {
  const assetWithSameReferenceNumber = await this.assetDetailRepo.find({
      where: { asset_reference_number: Like(`${assetReferenceNumber}-dup%`) },
      select: ['asset_reference_number'],
  });
  let highestSuffixCount = 0;
  assetWithSameReferenceNumber.forEach((asset) => {
      const matches = asset.asset_reference_number.match(/-dup(\d+)$/);
      if (matches && matches[1]) {
          const suffixCount = parseInt(matches[1]);
          highestSuffixCount = Math.max(highestSuffixCount, suffixCount);
      }
  });
  return highestSuffixCount + 1;
}

}

function generateRandomNumber(): string {
  const charset = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let password = '';
  for (let i = 0; i < 4; i++) {
    const randomIndex = Math.floor(Math.random() * charset.length);
    password += charset[randomIndex];
  }
  return password;
}

