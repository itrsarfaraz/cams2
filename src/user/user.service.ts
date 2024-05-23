import { HttpException, Injectable } from "@nestjs/common";
import { CreateUserDto, LoginDTO, UpdateUserdto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { Repository } from "typeorm";
import { User } from "./entities/user.entity";
import { JwtService } from "@nestjs/jwt";
import { InjectRepository } from "@nestjs/typeorm";
import { MailerService } from "@nestjs-modules/mailer";
import { WriteResponse, paginateResponse } from "src/shared/response";
// import * as bcrypt from 'bcrypt';
import * as argon2 from "argon2";
import { IPagination } from "src/shared/paginationEum";
import { Organization } from "src/organization/entities/organization.entity";

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly mailerService: MailerService,
    private jwtService: JwtService,
    @InjectRepository(Organization)
    private readonly organizationRepo: Repository<Organization>,
  ) {}

  private otpStorage: { [key: string]: { otp: string; timestamp: number } } =
    {};

  async createUserOrUpdate(userData: CreateUserDto): Promise<any> {
    try {
      // Check if the email already exists
      const isEmailExists = await this.findOne("email", userData.email);

      // If an email exists and it's not the same user being updated
      if (
        isEmailExists.data &&
        isEmailExists.data.id !== userData.id &&
        userData.email
      ) {
        return WriteResponse(400, false, "Email already exists.");
      }
      userData.password = await argon2.hash(userData.password); // Hash password with argon2
      // Save or update the user
      const savedUserData = await this.userRepository.save(userData);

      return WriteResponse(
        200,
        savedUserData,
        "User created or updated successfully.",
      );
    } catch (error) {
      console.error("Error", error);
      return WriteResponse(400, false, error.message);
    }
  }

  //User Login
  async LogIn(email: string, password: string, data: LoginDTO): Promise<any> {
    const user = await this.userRepository.findOne({
      where: { email },
      relations: ["role"],
    });
    if (!user) {
      return WriteResponse(401, false, "Invalid Credentials.");
    }
    if (user.role && user.role.name === "Super Admin") {
      // If Super Admin, return success without organization verification
      await this.userRepository.update(user.id, {
        login_attempt: 0,
        login_time: Date(),
      });
      return WriteResponse(200, user, "Login Successfully.");
    }
    if (user.organization_id) {
      const organization = await this.organizationRepo.findOne({
        where: { id: user.organization_id, is_deleted: false },
      });
      if (organization) {
        if (
          organization.organization_name.toLowerCase() !==
            data.organization_name.toLowerCase() ||
          organization.login_code !== data.organization_code
        ) {
          return WriteResponse(401, false, "Invalid Credentials.");
        }
      } else {
        // If organization not found, return error
        return WriteResponse(401, false, "Invalid Credentials.");
      }
    } else {
      // If organization ID not found for the user, return error
      return WriteResponse(401, false, "Invalid Credentials.");
    }
    const passwordValid = await argon2.verify(user.password, password); // Verify password with argon2
    if (!passwordValid) {
      // if (user.login_attempt == 3) {
      //   return WriteResponse(401, false, 'Maximum attempt reach, please try after some time.');
      // }
      await this.userRepository.update(user.id, {
        login_attempt: user.login_attempt + 1,
      });
      return WriteResponse(401, false, "Invalid Password");
      // return WriteResponse(401, false, 'Invalid Password ,' + (+2 - user.login_attempt) + ' Attempts left.');
    }
    // if (user.login_attempt == 3) {
    //   return WriteResponse(403, false, 'User Has been blocked, Please try after some time.');
    // }
    await this.userRepository.update(user.id, {
      login_attempt: 0,
      login_time: Date(),
    });
    return WriteResponse(200, user, "Login Successfully.");
  }

  //user Mobile exists
  // async getUserByMobile(mobileNo: string): Promise<any> {
  //   return await this.userRepository.findOne({
  //     where: { mobileNo },
  //   });
  // }

  //GetAll
  async findAll() {
    const User = await this.userRepository.find({
      where: { is_deleted: false },
      relations: ["organization", "role"],
    });

    if (User.length) {
      return WriteResponse(200, User, "User Found Successfully.");
    }
    return WriteResponse(404, false, "User Not Found.");
  }

  //GetOne
  async findOne(field: string = "id", identifier: string) {
    const whereCondition = { is_deleted: false, [field]: identifier };
    const User = await this.userRepository.findOne({
      where: whereCondition,
      relations: ["organization", "role"],
    });
    if (!User) {
      return WriteResponse(404, false, "User Not Found.");
    }
    return WriteResponse(200, User, "User Found Successfully.");
  }

  async validateUserById(clientId: any) {
    return this.userRepository.findOne({
      where: { id: clientId },
    });
  }

  //Reset Password
  async resetPassword(data) {
    const user = await this.userRepository.findOne({
      where: { email: data.email },
    });
    if (user) {
      user.password = await argon2.hash(data.new_password); // Hash new password with argon2
      await this.userRepository.save(user);
      return WriteResponse(200, {}, "Password changed successfully.");
    }
    throw new HttpException(
      {
        statusCode: 404,
        message: "User does not exist.",
      },
      200,
    );
  }

  async changePassword(data, userData) {
    try {
      const user = await this.userRepository.findOne({
        where: { id: userData.id },
      });
      if (!user) {
        return WriteResponse(404, false, "User not found.");
      }
      const passwordValid = await argon2.verify(
        user.password,
        data.oldPassword,
      ); // Verify old password with argon2
      if (!passwordValid) {
        return WriteResponse(400, false, "Old password does not match.");
      }
      user.password = await argon2.hash(data.newPassword); // Hash new password with argon2
      await this.userRepository.save(user);
      return WriteResponse(200, true, "Password changed successfully.");
    } catch (e) {
      console.log(e);
      return WriteResponse(500, false, "Something went wrong.");
    }
  }

  //Forget Password
  // async forgetPassword(email, host) {
  //   try {
  //     //const otp = otpGenerator.generate(6, {
  //     //
  //     //      digits: true, alphabets: false, upperCase: false, specialChars: false
  //     //
  //     //    });
  //     let otp = Math.floor(10000 + Math.random() * 90000).toString();

  //     this.otpStorage[email.email] = { otp: otp, timestamp: Date.now() };
  //     // console.log(this.otpStorage);
  //     let check = await this.userRepository.findOne({
  //       where: { email: email.email, is_deleted: false },
  //     });
  //     if (check) {
  //       return this.mailerService
  //         .sendMail({
  //           to: email.email,
  //           from: 'strangerpart128@gmail.com',
  //           subject: 'Forgot Password.',
  //           html: `
  //         Hi ${check.first_name},
  //         >Forgot Password</a><br/><br/>
  //         Otp is :- ${otp}<br/>
  //         `,
  //           context: {
  //             username: 'cams2',
  //           },
  //         })
  //         .then((res) => {
  //           // console.log(res);
  //           return WriteResponse(200, {}, 'OTP share to your email address.');
  //         })
  //         .catch((e) => WriteResponse(400, false, e.message));
  //     } else {
  //       return WriteResponse(203, false, 'Provided email does not exists.');
  //     }
  //   } catch (e) {
  //     return WriteResponse(400, false, e.message);
  //   }
  // }

  async forgetPassword(email, host) {
    try {
      let otp = Math.floor(10000 + Math.random() * 90000).toString();

      this.otpStorage[email.email] = { otp: otp, timestamp: Date.now() };

      let check = await this.userRepository.findOne({
        where: { email: email.email, is_deleted: false },
      });

      if (check) {
        return this.mailerService
          .sendMail({
            to: email.email,
            from: "strangerpart128@gmail.com",
            subject: "Password Reset OTP",
            html: `
                          <p>Dear ${check.first_name},</p>
                          <p>You recently requested to reset your password. To proceed with the password reset, please use the following One Time Password (OTP):</p>
                          <p><strong>OTP:</strong> ${otp}</p>
                          <p>Please enter this OTP on the password reset page to complete the process.</p>
                          <p>If you did not request this password reset, please ignore this email. Your account security is important to us.</p>
                          <p>Best regards,<br/>CAMS2 Team</p>
                      `,
            context: {
              username: "cams2",
            },
          })
          .then((res) => {
            return WriteResponse(200, {}, "OTP sent to your email address.");
          })
          .catch((e) => WriteResponse(400, false, e.message));
      } else {
        return WriteResponse(203, false, "Provided email does not exist.");
      }
    } catch (e) {
      return WriteResponse(400, false, e.message);
    }
  }

  //OTP Verify
  // verifyOtp(email: string, enteredOtp: string): any {
  //   const storedOtp = this.otpStorage[email];

  //   if (storedOtp === enteredOtp) {
  //     return WriteResponse(200, true, 'success');
  //   } else {
  //     return WriteResponse(400, false, 'invalid otp');
  //   }
  // }

  //OTP Verify
  async verifyOtp(email: string, enteredOtp: string) {
    const storedOtp = this.otpStorage[email];
    const User = await this.userRepository.findOne({
      where: { email: email },
    });
    if (!User) {
      throw new HttpException(
        {
          statusCode: 404,
          message: "User does not exists.",
        },
        200,
      );
    }

    if (!storedOtp) {
      return WriteResponse(400, false, "Already use this OTP");
    }

    const { otp, timestamp } = storedOtp;
    const currentTime = Date.now();

    if (otp === enteredOtp && currentTime - timestamp < 60000) {
      // OTP is valid and not expired
      delete this.otpStorage[email]; // Remove the OTP from storage after successful verification
      return WriteResponse(200, true, "Success");
    } else if (otp !== enteredOtp) {
      return WriteResponse(400, false, "Invalid OTP");
    } else {
      return WriteResponse(400, false, "OTP has expired");
    }
  }

  //Delete
  async remove(id: string) {
    const User = await this.userRepository.findOne({
      where: { id, is_deleted: false },
    });
    if (!User) {
      return WriteResponse(400, false, "User Not found.");
    }
    await this.userRepository.update(id, { is_deleted: true });
    return WriteResponse(200, true, "User Deleted Successfully.");
  }

  async pagination(pagination: IPagination): Promise<any> {
    const { curPage, perPage, whereClause } = pagination;
    let lwhereClause = "f.is_deleted = false";
    const fieldsToSearch = [
      "first_name",
      "user_name",
      "surname",
      "email",
      "job_title",
      "state",
    ];
    fieldsToSearch.forEach((field) => {
      const fieldValue = whereClause.find((p) => p.key === field)?.value;
      if (fieldValue) {
        lwhereClause += ` AND f.${field} LIKE '%${fieldValue}%'`;
      }
    });
    // const component_type_id = pagination.whereClause.find(
    //   (p: any) => p.key === "component_type_id" && p.value,
    // );

    // if (component_type_id) {
    //   lwhereClause += ` and f.component_type_id =  '${component_type_id.value}'`;
    // }

    const name = pagination.whereClause.find(
      (p: any) => p.key === "name" && p.value,
    );

    if (name) {
      lwhereClause += ` and role.name like '${name.value}'`;
    }
    const allValue = whereClause.find((p) => p.key === "all")?.value;
    if (allValue) {
      const conditions = fieldsToSearch
        .map((field) => `f.${field} LIKE '%${allValue}%'`)
        .join(" OR ");
      lwhereClause += ` AND (${conditions})`;
    }
    const skip = (curPage - 1) * perPage;
    const [list, count] = await this.userRepository
      .createQueryBuilder("f")
      .leftJoinAndSelect("f.role", "role")
      .leftJoinAndSelect("f.organization", "organization")
      .where(lwhereClause)
      .skip(skip)
      .take(perPage)
      .orderBy("f.created_on", "DESC")
      .getManyAndCount();
    return paginateResponse(list, count);
  }
}
