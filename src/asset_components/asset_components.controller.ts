import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req } from '@nestjs/common';
import { AssetComponentsService } from './asset_components.service';
import { CreateAssetComponentDto } from './dto/create-asset_component.dto';
import { UpdateAssetComponentDto } from './dto/update-asset_component.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/jwt/jwt-auth.guard';

@Controller('asset-components')
@ApiTags('asset-components')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class AssetComponentsController {
  constructor(private readonly assetComponentsService: AssetComponentsService) { }

  @Post('create-or-update')
  create(@Body() createAssetComponentDto: CreateAssetComponentDto, @Req() req: any) {
    return this.assetComponentsService.create(createAssetComponentDto,req);
  }

  @Get('get-All')
  findAll() {
    return this.assetComponentsService.findAll();
  }

  @Get('getOne/:id')
  findOne(@Param('id') id: string) {
    return this.assetComponentsService.findOne(id);
  }



  @Post('delete/:id')
  remove(@Param('id') id: string, @Req() req: any) {
    return this.assetComponentsService.remove(id,req);
  }
}
