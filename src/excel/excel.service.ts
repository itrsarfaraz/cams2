import { Injectable } from '@nestjs/common';
import { CreateExcelDto } from './dto/create-excel.dto';
import { UpdateExcelDto } from './dto/update-excel.dto';
import * as excel from 'exceljs';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';
import { Repository } from 'typeorm';
import { WriteResponse } from 'src/shared/response';

@Injectable()
export class ExcelService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  // async processExcel(filePath: string): Promise<any> {
  //   const workbook = new excel.Workbook();
  //   await workbook.xlsx.readFile(filePath);
  //   const worksheet = workbook.getWorksheet(1); // Assuming data is in the first sheet

  //   const data = [];
  //   worksheet.eachRow(async (row, rowNumber) => {
  //     if (rowNumber > 1) {
  //       // Skip first row for header
  //       const rowData = {
  //         firstName: row.getCell(1).value,
  //         lastName: row.getCell(2).value,
  //         email: row.getCell(3).text || '',
  //         mobileNo: row.getCell(4).value,
  //         password: row.getCell(5).text || '',
  //       };
  //       // data.push(rowData);
  //       console.log('rowData.email =>', rowData.email);
  //       const existingUser = await this.userRepository.findOne({
  //         where: { email: rowData.email },
  //       });
  //       console.log('existingUser------->>>', existingUser);
  //       if (existingUser) {
  //         console.log(`Duplicate entry found for email: ${rowData.email}`);
  //         return WriteResponse(400, false, 'wrong');
  //       }
  //       data.push(rowData);
  //     }
  //   });
  //   const user = await this.userRepository.save(data);
  //   // console.log('user----->>', user);
  //   // return user;
  //   // return {
  //   //   statusCode: 200,
  //   //   message: 'File uploaded and processed successfully',
  //   //   data: user,
  //   // };
  //   return WriteResponse(200, user, 'good');
  // }

  async processExcel(filePath: string): Promise<any> {
    const workbook = new excel.Workbook();
    await workbook.xlsx.readFile(filePath);
    const worksheet = workbook.getWorksheet(1); // Assuming data is in the first sheet

    const data: any[] = [];
    let hasDuplicate = false;

    const headerRow = worksheet.getRow(1);
    const headerRowValues: string[] = [];
    headerRow.eachCell({ includeEmpty: true }, (cell: excel.Cell) => {
      headerRowValues.push(cell.text || '');
    });

    const emailColumnIndex = headerRowValues.indexOf('email');
    if (emailColumnIndex === -1) {
      console.error('Email column not found in the header row.');
      return WriteResponse(
        404,
        false,
        'Email column not found in the header row.',
      );
    }
                                                                         
    for (let i = 2; i <= worksheet.rowCount; i++) {
      const row = worksheet.getRow(i);
      const rowValues: (string | null | undefined)[] = [];
      row.eachCell({ includeEmpty: true }, (cell: excel.Cell) => {
        rowValues.push(cell.text);
      });

      const isEmpty = rowValues.every((value) => !value);
      if (isEmpty) continue;

      const rowData = {
        firstName: row.getCell(1).value,
        lastName: row.getCell(2).value,
        email: row.getCell(emailColumnIndex + 1).text || '',
        mobileNo: row.getCell(4).value,
        password: row.getCell(5).text || '',
      };

      const existingUser = await this.userRepository.findOne({
        where: { email: rowData.email },
      });
      // console.log('existingUser--->>>>>', existingUser);

      if (existingUser) {
        console.log(`Duplicate entry found for email: ${rowData.email}`);
        hasDuplicate = true;
        break;
      }

      data.push(rowData);
    }

    if (hasDuplicate) {
      return WriteResponse(
        400,
        false,
        'Duplicate entry found for one or more emails',
      );
    }

    const savedUsers = await this.userRepository.save(data);
    return WriteResponse(
      200,
      savedUsers,
      'Sheet data inserted into the database',
    );
  }
}
