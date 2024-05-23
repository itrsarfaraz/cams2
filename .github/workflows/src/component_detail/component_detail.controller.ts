import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
  Query,
  UseGuards,
} from "@nestjs/common";
import { ComponentDetailService } from "./component_detail.service";
import {
  ComponentQuickExtendDTO,
  ComponentStatusDTO,
  CreateComponentDetailDto,

} from "./dto/create-component_detail.dto";
import { UpdateComponentDetailDto } from "./dto/update-component_detail.dto";
import { ApiBearerAuth, ApiBody, ApiTags } from "@nestjs/swagger";
import { IPagination, IPaginationSwagger } from "src/shared/paginationEum";
import { JwtAuthGuard } from "src/jwt/jwt-auth.guard";

@Controller("component-detail")
@ApiTags("component-detail")
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class ComponentDetailController {
  constructor(
    private readonly componentDetailService: ComponentDetailService,
  ) { }

  @Post("create-or-update")
  create(@Body() createComponentDetailDto: CreateComponentDetailDto, @Req() req: any) {
    return this.componentDetailService.createOrUpdate(createComponentDetailDto, req);
  }

  @Get("getAll")
  findAll() {
    return this.componentDetailService.findAll();
  }

  @Get("getOne/:id")
  findOne(@Param("id") id: string) {
    return this.componentDetailService.findOne(id);
  }

  @Get("create-duplicate/:id")
  createDuplicate(@Param("id") id: string) {
    return this.componentDetailService.createDuplicate(id);
  }

  // @Get("generateComponentNumber")
  // async generateComponentNumber() {
  //   return this.componentDetailService.generateComponentNumber();
  // }

  @Post("delete/:id")
  remove(@Param("id") id: string,@Req() req) {
    return this.componentDetailService.remove(id,req);
  }

  @Post("change-component-status")
  componentStatus(@Body() componentStatusDTO: ComponentStatusDTO, @Req() req) {
    return this.componentDetailService.componentStatus(componentStatusDTO, req);
  }

  @Post("extend-review-date")
  quickExtend(@Body() quickExtendDTO: ComponentQuickExtendDTO, @Req() req) {
    return this.componentDetailService.quickExtend(quickExtendDTO, req);
  }

  @Get("dashboard")
  findAllActiveComponents() {
    return this.componentDetailService.findAllActiveComponents();
  }

  @Post("pagination")
  @ApiBody({
    schema: {
      type: "object",
      properties: IPaginationSwagger,
    },
  })
  pagination(@Body() pagination: IPagination) {
    return this.componentDetailService.pagination(pagination);
  }
}
