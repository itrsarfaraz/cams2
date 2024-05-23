import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req } from '@nestjs/common';
import { AssetFinanceService } from './asset_finance.service';
import { CreateAssetFinanceDto,CreateGetAssetOperationalCost } from './dto/create-asset_finance.dto';
import { UpdateAssetFinanceDto } from './dto/update-asset_finance.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/jwt/jwt-auth.guard';

@Controller('asset-finance')
@ApiTags('asset-finance')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class AssetFinanceController {
  constructor(private readonly assetFinanceService: AssetFinanceService) {}

  @Post('create-or-update')
  create(@Body() createAssetFinanceDto: CreateAssetFinanceDto, @Req() req: any) {
    return this.assetFinanceService.create(createAssetFinanceDto,req);
  }

  @Post("getAssetOperationalCosts")
  getAssetOperationalCosts(@Body() createGetAssetOperationalCost: CreateGetAssetOperationalCost) {
    return this.assetFinanceService.getAssetOperationalCosts(createGetAssetOperationalCost);
  }


  @Get('getAll')
  findAll() {
    return this.assetFinanceService.findAll();
  }

  @Get('getOne/:id')
  findOne(@Param('id') id: string) {
    return this.assetFinanceService.findOne(id);
  }

  

  @Post('delete/:id')
  remove(@Param('id') id: string, @Req() req: any) {
    return this.assetFinanceService.remove(id,req);
  }
}
