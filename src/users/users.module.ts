import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { PrismaModule } from '../prisma/prisma.module';
import { JwtModule } from '@nestjs/jwt';


@Module({
  imports: [JwtModule.register({
    secret: process.env.JWT_SECRET || 'supersecretkey',
    signOptions: { expiresIn: '1d' },
  })], 
  controllers: [UsersController],
  providers: [UsersService, PrismaModule]
})
export class UsersModule {}
