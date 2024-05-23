import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req } from '@nestjs/common';
import { AssetOperationalCostsService } from './asset_operational_costs.service';
import { CreateAssetOperationalCostDto } from './dto/create-asset_operational_cost.dto';
import { UpdateAssetOperationalCostDto } from './dto/update-asset_operational_cost.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/jwt/jwt-auth.guard';

@Controller('asset-operational-costs')
@ApiTags('asset-operational-costs')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class AssetOperationalCostsController {
  constructor(private readonly assetOperationalCostsService: AssetOperationalCostsService) {}

  @Post('create-or-update')
  create(@Body() createAssetOperationalCostDto: CreateAssetOperationalCostDto, @Req() req: any) {
    return this.assetOperationalCostsService.create(createAssetOperationalCostDto,req);
  }

  @Get('get-All')
  findAll() {
    return this.assetOperationalCostsService.findAll();
  }

  @Get('getOne/:id')
  findOne(@Param('id') id: string) {
    return this.assetOperationalCostsService.findOne(id);
  }

  

  @Post('delete/:id')
  remove(@Param('id') id: string, @Req() req: any) {
    return this.assetOperationalCostsService.remove(id,req);
  }
}
