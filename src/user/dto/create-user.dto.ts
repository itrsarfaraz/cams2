import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsString,
  Length,
  Matches,
  MaxLength,
  Min,
  MinLength,
} from 'class-validator';

export class CreateUserDto {
  // @ApiProperty()
  id: string;

  @ApiProperty()
  organization_id: string;

  @ApiProperty()
  @IsString()
  @Length(3, 50)
  first_name: string;

  @ApiProperty()
  @Length(3, 50)
  user_name: string;

   @ApiProperty()
  surname: string;

  // @ApiProperty()
  // @IsNotEmpty()
  // @Matches(new RegExp('^[0-9]{8,14}$'), {
  //   message: 'Mobile Should be between 8 to 14',
  // })
  // mobileNo: string;

  @ApiProperty()
  @Matches(new RegExp('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$'), {
    message: 'Invalid email format.',
  })
  @IsNotEmpty()
  email: string;

  @ApiProperty()
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: 'Password must contain uppercase, lowercase, special character, and a number. Min length: 8 chars.',
  })
  @Length(8)
  password: string;
  static password: string;

  @ApiProperty()
  job_title:string;

  @ApiProperty()
  role_id:string;

  @ApiProperty({default:false})
  force_login:boolean;

  @ApiProperty()
  state:string;

  @ApiProperty()
  is_active:boolean;

  //@ApiProperty()
  deactivated_reason:string;

}

export class UpdateUserdto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  @IsString()
  @Length(3, 50)
  first_name: string;

  @ApiProperty()
  @IsString()
  @Length(3, 50)
  lastName: string;

  @ApiProperty()
  @IsNotEmpty()
  @Matches(new RegExp('^[0-9]{8,14}$'), {
    message: 'Mobile Should be between 8 to 14',
  })
  mobileNo: string;
}
export class SocialLoginDto {
  @ApiProperty()
  @IsString()
  first_name: string;

  @ApiProperty()
  @IsString()
  lastName: string;

  @ApiProperty()
  email: string;
  @ApiProperty()
  ssoId: string;
  @ApiProperty()
  provider: string;
}
export class LoginDTO {
  @IsEmail()
  @ApiProperty()
  @Matches(new RegExp('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$'), {
    message: 'email must be an email address.',
  })
  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  @ApiProperty()
  password: string;

  @ApiProperty()
  organization_name: string;

  @ApiProperty()
  organization_code: string
}

export class ResetPassDto {
  @ApiProperty()
  @IsString()
  email: string;

  @ApiProperty()
  @IsNotEmpty()
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message:
      'Required a strong password ( one upper , one special , one number )',
  })
  @Length(8)
  new_password: string;
}

export class ChangePasswordDto {

  @ApiProperty({
    type: 'string',
    description: 'Please enter old password.',
    required: true,
  })
  oldPassword: string;

  @ApiProperty({
    type: 'string',
    description: 'Please enter new password.',
    required: true,
  })
  @Length(8)
  newPassword: string;
}
export class ForgetPassword {
  @IsEmail()
  @ApiProperty()
  @Matches(new RegExp('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$'), {
    message: 'email must be an email address.',
  })
  @IsNotEmpty()
  email: string;
}
export class VerifyDto {
  @IsEmail()
  @ApiProperty()
  @Matches(new RegExp('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$'), {
    message: 'email must be an email address.',
  })
  @IsNotEmpty()
  email: string;

  // @ApiProperty()
  // @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
  //   message:
  //     'Required a strong password ( one upper , one special , one number )',
  // })
  // @Length(8)
  // new_password: string;

  @ApiProperty()
  otp: string;
}
