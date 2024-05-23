import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { AssetTypesService } from './asset_types.service';
import { CreateAssetTypeDto } from './dto/create-asset_type.dto';
import { UpdateAssetTypeDto } from './dto/update-asset_type.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/jwt/jwt-auth.guard';

@Controller('asset-types')
@ApiTags('asset-types')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class AssetTypesController {
  constructor(private readonly assetTypesService: AssetTypesService) {}

  @Post('create-or-update')
  create(@Body() createAssetTypeDto: CreateAssetTypeDto) {
    return this.assetTypesService.create(createAssetTypeDto);
  }

  @Get('get-All')
  findAll() {
    return this.assetTypesService.findAll();
  }

  @Get('getOne/:id')
  findOne(@Param('id') id: string) {
    return this.assetTypesService.findOne(id);
  }

  

  @Post('delete/:id')
  remove(@Param('id') id: string) {
    return this.assetTypesService.remove(id);
  }
}
