import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { AssetOutputsService } from './asset_outputs.service';
import { CreateAssetOutputDto,  GetAssetOutputDto } from './dto/create-asset_output.dto';
import { UpdateAssetOutputDto } from './dto/update-asset_output.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/jwt/jwt-auth.guard';

@Controller('asset-outputs')
@ApiTags('asset-outputs')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class AssetOutputsController {
  constructor(private readonly assetOutputsService: AssetOutputsService) {}

  @Post('create-or-update')
  create(@Body() createAssetOutputDto: CreateAssetOutputDto) {
    return this.assetOutputsService.create(createAssetOutputDto);
  }

  @Post("getOutput")
  getOutput(@Body() getAssetOutputDto: GetAssetOutputDto) {
    return this.assetOutputsService.getOutput(getAssetOutputDto);
  }

  @Get('get-All')
  findAll() {
    return this.assetOutputsService.findAll();
  }

  @Get('getOne/:id')
  findOne(@Param('id') id: string) {
    return this.assetOutputsService.findOne(id);
  }

  
  @Post('delete/:id')
  remove(@Param('id') id: string) {
    return this.assetOutputsService.remove(id);
  }
}
