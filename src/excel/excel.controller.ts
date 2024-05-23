import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { ExcelService } from './excel.service';
import { CreateExcelDto } from './dto/create-excel.dto';
import { UpdateExcelDto } from './dto/update-excel.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { MulterConfig } from 'src/multer.config';
import { ApiTags } from '@nestjs/swagger';

@Controller('excel')
@ApiTags('excel')
export class ExcelController {
  constructor(private readonly excelService: ExcelService) {}

  @Post('upload')
  @UseInterceptors(FileInterceptor('file', MulterConfig))
  async uploadFile(@UploadedFile() file) {
    const filePath = file.path;
    // console.log('filePath------->', filePath);
    const data = await this.excelService.processExcel(filePath);
    return { message: data.message, data: data.data };
    // Save data to database here
    // return { message: 'File uploaded and processed successfully', data };
  }
}
