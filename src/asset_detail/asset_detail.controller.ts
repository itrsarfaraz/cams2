import { Controller, Get, Post, Body, Patch, Param, Delete, Req, UseGuards } from '@nestjs/common';
import { AssetDetailService } from './asset_detail.service';
import { AssetStatusDTO, CreateAssetDetailDto, QuickExtendsDTO } from './dto/create-asset_detail.dto';
import { UpdateAssetDetailDto } from './dto/update-asset_detail.dto';
import { ApiBearerAuth, ApiBody, ApiTags } from '@nestjs/swagger';
import { IPagination, IPaginationSwagger } from 'src/shared/paginationEum';
import { JwtAuthGuard } from 'src/jwt/jwt-auth.guard';

@Controller('asset-detail')
@ApiTags('asset-detail')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class AssetDetailController {
  constructor(private readonly assetDetailService: AssetDetailService) {}

  @Post('create-or-update')
  create(@Body() createAssetDetailDto: CreateAssetDetailDto, @Req() req: any) {
    return this.assetDetailService.create(createAssetDetailDto,req);
  }

  @Get('get-All')
  findAll() {
    return this.assetDetailService.findAll();
  }

  @Get('getOne/:id')
  findOne(@Param('id') id: string) {
    return this.assetDetailService.findOne(id);
  }

  @Post('delete/:id')
  remove(@Param('id') id: string, @Req() req: any) {
    return this.assetDetailService.remove(id,req);
  }

  @Post("change-asset-status")
  assetStatus(@Body() assetStatusDTO: AssetStatusDTO, @Req() req) {
    return this.assetDetailService.assetStatus(assetStatusDTO, req);
  }

  @Post("extend-review-date")
  quickExtend(@Body() quickExtendDTO: QuickExtendsDTO, @Req() req) {
    return this.assetDetailService.quickExtend(quickExtendDTO, req);
  }

  @Get("dashboard")
  dashboard() {
    return this.assetDetailService.dashboard();
  }

  @Get('create-duplicate/:id')
  createDuplicate(@Param('id') id: string) {
    return this.assetDetailService.createDuplicate(id);
  }



  @Post("pagination")
  @ApiBody({
    schema: {
      type: "object",
      properties: IPaginationSwagger,
    },
  })
  pagination(@Body() pagination: IPagination) {
    return this.assetDetailService.pagination(pagination);
  }
}
