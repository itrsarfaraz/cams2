import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from "@nestjs/common";
import { DueDiligenceService } from "./due_diligence.service";
import { CreateDueDiligenceAnswersDto, CreateDueDiligenceDto } from "./dto/create-due_diligence.dto";
import { UpdateDueDiligenceDto } from "./dto/update-due_diligence.dto";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { JwtAuthGuard } from "src/jwt/jwt-auth.guard";

@Controller("due-diligence")
@ApiTags("due-diligence")
// @UseGuards(JwtAuthGuard)
// @ApiBearerAuth()
export class DueDiligenceController {
  constructor(private readonly dueDiligenceService: DueDiligenceService) {}

  @Post("question/create-or-update")
  create(@Body() createDueDiligenceDto: CreateDueDiligenceDto) {
    return this.dueDiligenceService.create(createDueDiligenceDto);
  }

  @Get("question/getAll")
  findAll() {
    return this.dueDiligenceService.findAll();
  }

  @Get("question/getOne/:id")
  findOne(@Param("id") id: string) {
    return this.dueDiligenceService.findOne(id);
  }

  @Post("question/delete/:id")
  remove(@Param("id") id: string) {
    return this.dueDiligenceService.remove(id);
  }

  @Post("answer/create-or-update")
  createAns(@Body() createDueDiligenceDtoAnswer: CreateDueDiligenceAnswersDto) {
    return this.dueDiligenceService.createAns(createDueDiligenceDtoAnswer);
  }

  @Get("answer/getAll")
  findAllAns() {
    return this.dueDiligenceService.findAllAns();
  }

  @Get("answer/getOne/:id")
  findOneAns(@Param("id") id: string) {
    return this.dueDiligenceService.findOneAns(id);
  }

  @Post("answer/delete/:id")
  removeAns(@Param("id") id: string) {
    return this.dueDiligenceService.removeAns(id);
  }


}
