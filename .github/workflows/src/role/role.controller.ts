import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req } from '@nestjs/common';
import { RoleService } from './role.service';
import { CreateRoleDto, RoleStatusDTO } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { ApiBearerAuth, ApiBody, ApiTags } from '@nestjs/swagger';
import { IPagination, IPaginationSwagger } from 'src/shared/paginationEum';
import { JwtAuthGuard } from 'src/jwt/jwt-auth.guard';

@Controller("role")
@ApiTags("role")
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  @Post("create-or-update")
  create(@Body() createRoleDto: CreateRoleDto) {
    return this.roleService.create(createRoleDto);
  }

  @Get("getAll")
  findAll() {
    return this.roleService.findAll();
  }

  @Get("getOne/:id")
  findOne(@Param("id") id: string) {
    return this.roleService.findOne("id", id);
  }

  @Post("delete/:id")
  remove(@Param("id") id: string) {
    return this.roleService.remove(id);
  }

  @Post("change-status")
  rolestatus(@Body() roleStatusDTO: RoleStatusDTO, @Req() req) {
    return this.roleService.rolestatus(roleStatusDTO, req);
  }


  @Post("pagination")
  @ApiBody({
    schema: {
      type: "object",
      properties: IPaginationSwagger,
    },
  })
  pagination(@Body() pagination: IPagination) {
    return this.roleService.pagination(pagination);
  }
}
