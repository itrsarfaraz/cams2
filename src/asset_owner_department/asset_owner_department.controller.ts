import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { AssetOwnerDepartmentService } from './asset_owner_department.service';
import { CreateAssetOwnerDepartmentDto } from './dto/create-asset_owner_department.dto';
import { UpdateAssetOwnerDepartmentDto } from './dto/update-asset_owner_department.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/jwt/jwt-auth.guard';

@Controller('asset-owner-department')
@ApiTags('asset-owner-department')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class AssetOwnerDepartmentController {
  constructor(private readonly assetOwnerDepartmentService: AssetOwnerDepartmentService) {}

  @Post('create-or-update')
  create(@Body() createAssetOwnerDepartmentDto: CreateAssetOwnerDepartmentDto) {
    return this.assetOwnerDepartmentService.create(createAssetOwnerDepartmentDto);
  }

  @Get('get-All')
  findAll() {
    return this.assetOwnerDepartmentService.findAll();
  }

  @Get('getOne/:id')
  findOne(@Param('id') id: string) {
    return this.assetOwnerDepartmentService.findOne('id',id);
  }

  

  @Post('delete/:id')
  remove(@Param('id') id: string) {
    return this.assetOwnerDepartmentService.remove(id);
  }
}
