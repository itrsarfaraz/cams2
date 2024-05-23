import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { AssetCapitalInvestmentService } from './asset_capital_investment.service';
import { CreateAssetCapitalInvestmentDto } from './dto/create-asset_capital_investment.dto';
import { UpdateAssetCapitalInvestmentDto } from './dto/update-asset_capital_investment.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/jwt/jwt-auth.guard';

@Controller('asset-capital-investment')
@ApiTags('asset-capital-investment')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class AssetCapitalInvestmentController {
  constructor(private readonly assetCapitalInvestmentService: AssetCapitalInvestmentService) {}

  @Post('create-or-update')
  create(@Body() createAssetCapitalInvestmentDto: CreateAssetCapitalInvestmentDto) {
    return this.assetCapitalInvestmentService.create(createAssetCapitalInvestmentDto);
  }

  @Get('get-All')
  findAll() {
    return this.assetCapitalInvestmentService.findAll();
  }

  @Get('getOne/:id')
  findOne(@Param('id') id: string) {
    return this.assetCapitalInvestmentService.findOne(id);
  }

  

  @Post('delete/:id')
  remove(@Param('id') id: string) {
    return this.assetCapitalInvestmentService.remove(id);
  }
}
