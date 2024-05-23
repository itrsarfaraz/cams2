import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req } from '@nestjs/common';
import { AssetRiskService } from './asset_risk.service';
import { CreateAssetRiskDto } from './dto/create-asset_risk.dto';
import { UpdateAssetRiskDto } from './dto/update-asset_risk.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/jwt/jwt-auth.guard';

@Controller('asset-risk')
@ApiTags('asset-risk')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class AssetRiskController {
  constructor(private readonly assetRiskService: AssetRiskService) {}

  @Post('create-or-update')
  create(@Body() createAssetRiskDto: CreateAssetRiskDto, @Req() req: any) {
    return this.assetRiskService.create(createAssetRiskDto,req);
  }

  @Get('get-All')
  findAll() {
    return this.assetRiskService.findAll();
  }

  @Get('getOne/:id')
  findOne(@Param('id') id: string) {
    return this.assetRiskService.findOne(id);
  }

  
  @Post('delete/:id')
  remove(@Param('id') id: string, @Req() req: any) {
    return this.assetRiskService.remove(id,req);
  }
}
