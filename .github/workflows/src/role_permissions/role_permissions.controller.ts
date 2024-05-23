import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { RolePermissionsService } from './role_permissions.service';
import { CreateRolePermissionDto } from './dto/create-role_permission.dto';
import { UpdateRolePermissionDto } from './dto/update-role_permission.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/jwt/jwt-auth.guard';

@Controller('role-permissions')
@ApiTags('role-permissions')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class RolePermissionsController {
  constructor(private readonly rolePermissionsService: RolePermissionsService) {}

  @Post('create-or-update')
  create(@Body() createRolePermissionDto: CreateRolePermissionDto[]) {
    return this.rolePermissionsService.create(createRolePermissionDto);
  }

  @Get('getAll')
  findAll() {
    return this.rolePermissionsService.findAll();
  }

  @Get('getOne/:id')
  findOne(@Param('id') id: string) {
    return this.rolePermissionsService.findOne("id",id);
  }

  @Post('delete/:id')
  remove(@Param('id') id: string) {
    return this.rolePermissionsService.remove(id);
  }
}
