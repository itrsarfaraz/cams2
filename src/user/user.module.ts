import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { User } from './entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from 'src/jwt/jwt.strategy';
import { Organization } from 'src/organization/entities/organization.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([User,Organization]),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: 'cams2', // Replace with your own secret key
      signOptions: { expiresIn: '1d' }, // Set your desired expiration time
    }),
  ],

  controllers: [UserController],
  providers: [UserService,JwtStrategy],
  exports: [UserModule],
})
export class UserModule {}
