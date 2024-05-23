import { Controller, Get, Post, Body, Patch, Param, Delete, UploadedFile, UseInterceptors, Req, UseGuards } from '@nestjs/common';
import { OrganizationService } from './organization.service';
import { CreateOrganizationDto, LogoUpload } from './dto/create-organization.dto';
import { UpdateOrganizationDto } from './dto/update-organization.dto';
import { ApiBearerAuth, ApiBody, ApiTags } from '@nestjs/swagger';
import { IPagination, IPaginationSwagger } from 'src/shared/paginationEum';
import { checkFileSize, editFileName, editFileNameEmployee, validateImageFile } from 'src/helper';
import { WriteResponse } from 'src/shared/response';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { InjectRepository } from '@nestjs/typeorm';
import { Organization } from './entities/organization.entity';
import { Repository } from 'typeorm';
import { JwtAuthGuard } from 'src/jwt/jwt-auth.guard';


@Controller("organization")
@ApiTags("organization")
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class OrganizationController {
  constructor(private readonly organizationService: OrganizationService,
    @InjectRepository(Organization)
    private readonly organizationRepo: Repository<Organization>,
  ) {}

  @Post("create-or-update")
  @UseInterceptors(FileInterceptor('logo_file')) // Handle file upload
  async create(@UploadedFile() logoFile, @Body() createOrganizationDto: CreateOrganizationDto) {
    createOrganizationDto.logo_file = logoFile; // Attach uploaded file to DTO
    return this.organizationService.create(createOrganizationDto);
  }

  @Post("logo-upload")
  @UseInterceptors(
    FileInterceptor("logo_file", {
      storage: diskStorage({
        destination: "public/organization_logos",
        filename: editFileNameEmployee,
      }),
    }),
  )
  async createLogo(@Body() data: LogoUpload,@Req() req,
  @UploadedFile() logo_file: Express.Multer.File,
): Promise<any> {
  if (!validateImageFile(logo_file)) {
    return WriteResponse(400,false,"Only image files are allowed.");
  }
   if (logo_file?.size > 5000000) {
     return WriteResponse(400, false, "image should be under 500kb");
   }
   if (logo_file) {
     data.logo_file = logo_file?.filename;
    }
    const response = {
      image: req.query.orgId + ".jpg"

    }
    await this.organizationRepo.update(req.query.orgId,{logo_file_name:data.logo_file})
  return WriteResponse(200, response, 'Organization logo updated successfully.');
}
  @Get("getAll")
  findAll() {
    return this.organizationService.findAll();
  }

  @Get("getOne/:id")
  findOne(@Param("id") id: string) {
    return this.organizationService.findOne("id", id);
  }

  @Post("delete/:id")
  remove(@Param("id") id: string) {
    return this.organizationService.remove(id);
  }

  @Post("pagination")
  @ApiBody({
    schema: {
      type: "object",
      properties: IPaginationSwagger,
    },
  })
  pagination(@Body() pagination: IPagination) {
    return this.organizationService.pagination(pagination);
  }
}
