import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { PermissionsService } from './permissions.service';
import { CreatePermissionDto } from './dto/create-permission.dto';
import { UpdatePermissionDto } from './dto/update-permission.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/jwt/jwt-auth.guard';

@Controller("permissions")
@ApiTags("permissions")
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class PermissionsController {
  constructor(private readonly permissionsService: PermissionsService) {}

  @Post("create-or-update")
  create(@Body() createPermissionDto: CreatePermissionDto) {
    return this.permissionsService.create(createPermissionDto);
  }

  @Get("getAll")
  findAll() {
    return this.permissionsService.findAll();
  }

  @Get("getOne/:id")
  findOne(@Param("id") id: string) {
    return this.permissionsService.findOne("id",id);
  }


  @Post("delete/:id")
  remove(@Param("id") id: string) {
    return this.permissionsService.remove(id);
  }
}
