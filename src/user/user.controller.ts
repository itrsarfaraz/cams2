import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
  UseGuards,
  Req,
  Query,
} from '@nestjs/common';
import { UserService } from './user.service';
import {
  ChangePasswordDto,
  CreateUserDto,
  ForgetPassword,
  LoginDTO,
  ResetPassDto,
  VerifyDto,
} from './dto/create-user.dto';
import { JwtService } from '@nestjs/jwt';
import { ApiBearerAuth, ApiBody, ApiTags } from '@nestjs/swagger';
import { WriteResponse } from 'src/shared/response';
import { JwtAuthGuard } from 'src/jwt/jwt-auth.guard';
import { IPagination, IPaginationSwagger } from 'src/shared/paginationEum';

@Controller('user')
@ApiTags('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private jwtService: JwtService,
  ) { }

  // @Post('/signup')
  // async SingIn(@Body() CreateUserDto: CreateUserDto) {
  //   try {
  //     const isExits = await this.userService.getUserByEmail(
  //       CreateUserDto.email,
  //     );
  //     if (isExits) {
  //       return WriteResponse(400, false, 'Email already exists.');
  //     }
  //     const email = CreateUserDto.email;
  //     const password = CreateUserDto.password;
  //     // let ismobile = await this.userService.getUserByMobile(
  //     //   CreateUserDto.mobileNo,
  //     // );
  //     // if (ismobile) {
  //     //   return WriteResponse(400, false, 'Mobile No. already exists.');
  //     // }
  //     const user: any = await this.userService.Create(CreateUserDto);
  //     //await this.userService.sendOtp({
  //     //  email: CreateUserDto.email,
  //     //});
  //     const loginData: any = await this.LogIn({
  //       email: email,
  //       password: password,
  //     });
  //     // console.log(loginData, " logindata")

  //     const payload = { id: loginData.id };
  //     const token = await this.jwtService.signAsync(payload);
  //     // console.log(token , "token")

  //     return {
  //       statusCode: 200,
  //       message: 'User registration successfully.',
  //       data: loginData.data,
  //     };
  //   } catch (e) {
  //     WriteResponse(400, false, 'Something went wrong.');
  //   }
  // }

  // @Post('/Update-user')
  // async UpateUser(@Body() updateUserdto: UpdateUserdto) {
  //   try {
  //     const ismobile = await this.userService.getUserByMobile(
  //       updateUserdto.mobileNo,
  //     );
  //     if (ismobile) {
  //       if (ismobile.id !== updateUserdto.id) {
  //         return WriteResponse(400, false, 'Mobile No. already exists.');
  //       }
  //     }
  //     return await this.userService.UpdateUser(updateUserdto);
  //   } catch (e) {
  //     return WriteResponse(500, false, 'Internal server error.');
  //   }
  // }

  @Post('create-or-update')
  createOrUpdateUser(@Body() userData: CreateUserDto) {
    return this.userService.createUserOrUpdate(userData);
  }

  //User Login
  @Post('/login')
  @HttpCode(200)
  async LogIn(@Body() data: LoginDTO) {
    const user = await this.userService.LogIn(data.email, data.password,data);
    if (user.statusCode == 200) {
      const payload = { id: user.data.id };
      const token = await this.jwtService.signAsync(payload);
      user.data = {
        organization_id: user.data.organization_id,
        email: user.data.email,
        token: token
      }
    }
    return WriteResponse(user.statusCode, user.data, user.message);
    //if (!user.isEmailVerified) {
    //  await this.userService.sendOtp({
    //    email: data.email,
    //  });
    //  return WriteResponse(1001, false, 'Email is not verified.');
    //}

  }

  @Get('get-All')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  findAll() {
    return this.userService.findAll();
  }

  @Get('getOne/:id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  findOne(@Param('id') id: string, @Req() req) {
    return this.userService.findOne("id", id);
  }

  //Reset Password
  @Post('reset-password')
  async resetPassword(@Body() data: ResetPassDto) {
    return this.userService.resetPassword(data);
  }

  @Post('change-password')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  async changePassword(@Body() data: ChangePasswordDto, @Req() req: any) {
    return await this.userService.changePassword(data, req.user);
  }
  //Forget Password
  @Post('forget-password')
  async forgetPassword(@Body() email: ForgetPassword, @Req() req: any) {
    return await this.userService.forgetPassword(email, req.get('host'));
  }

  //OTP Verify
  @Post('verify')
  verifyOtp(@Body() verifyDto: VerifyDto) {
    return this.userService.verifyOtp(verifyDto.email, verifyDto.otp);
  }

  @Get('delete/:id')
  remove(@Param('id') id: string) {
    return this.userService.remove(id);
  }

  @Post("pagination")
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiBody({
    schema: {
      type: "object",
      properties: IPaginationSwagger,
    },
  })
  pagination(@Body() pagination: IPagination) {
    return this.userService.pagination(pagination);
  }
}
