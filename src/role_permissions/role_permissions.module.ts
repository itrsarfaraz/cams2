import { Module } from '@nestjs/common';
import { RolePermissionsService } from './role_permissions.service';
import { RolePermissionsController } from './role_permissions.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RolePermission } from './entities/role_permission.entity';

@Module({
  imports:[TypeOrmModule.forFeature([RolePermission])],
  controllers: [RolePermissionsController],
  providers: [RolePermissionsService],
})
export class RolePermissionsModule {}
