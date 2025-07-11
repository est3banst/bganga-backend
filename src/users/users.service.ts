import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { CreateAddressDto } from './dto/create-address.dto';

@Injectable()
export class UsersService {
  constructor(  private readonly prisma: PrismaService,
                private readonly jwt: JwtService
  ) {}

  async create(dto: CreateUserDto) {
    const hashedPassword = await bcrypt.hash(dto.password, 10);

    const user = await this.prisma.user.create({
      data: {
        email: dto.email,
        password: hashedPassword,
        fullName: dto.fullName,
        dob: new Date(dto.dob),
        country: dto.country,
      },
    });
    const payload = { sub: user.id, email: user.email };
    const token = this.jwt.sign(payload);
    const { password, ...data } = user;
    return {
      access_token: token,
      user: data,
    };
  }


  async addShippingAddress(userId: number, dto: CreateAddressDto) {
    const { fullName, street, city, country, postalCode, phone } = dto;
    const userExists = await this.prisma.user.findUnique({
  where: { id: userId },
    });
    if (!userExists) {
    throw new NotFoundException('Usuario no encontrado');
    }
    
    await this.prisma.shippingAddress.create({
      data: {
        fullName,
        street,
        city,
        country,
        postalCode,
        phone,
        user: { connect: { id: userId } },
      }}) 
        return this.checkUserAddress(userId);
   
  }

  async updateAddress(
    userId: number,
    addressId: number,
    dto: CreateAddressDto,
  ) {
    const userExists = await this.prisma.user.findUnique({
      where: { id: userId },
    });
    if (!userExists) {
      throw new NotFoundException('Usuario no encontrado');
    }
    const addressExists = await this.prisma.shippingAddress.findUnique({
      where: { id: addressId, userId },
    });
    if (!addressExists) {
      throw new NotFoundException('Dirección no encontrada');
    }
    const updatedAddress = await this.prisma.shippingAddress.update({
      where: { id: addressId },
      data: {
        fullName: dto.fullName,
        street: dto.street,
        city: dto.city,
        country: dto.country,
        postalCode: dto.postalCode,
        phone: dto.phone,
      },
    });
    return updatedAddress;
  } 

  
  async deleteAddress(userId: number, addressId: number) {
    const userExists = await this.prisma.user.findUnique({
      where: { id: userId },
    });
    if (!userExists) {
      throw new NotFoundException('Usuario no encontrado');
    }
    const addressExists = await this.prisma.shippingAddress.findUnique({
      where: { id: addressId, userId },
    });
    if (!addressExists) {
      throw new NotFoundException('Dirección no encontrada');
    }
    await this.prisma.shippingAddress.delete({
      where: { id: addressId },
    });
    return this.checkUserAddress(userId);
  }

  async checkUserAddress(userId: number) {
    const addresses = await this.prisma.shippingAddress.findMany({
      where: { userId },
      select: {
        id: true,
        fullName: true,
        street: true,
        city: true,
        country: true,
        postalCode: true,
        phone: true,
    },
  });
    return addresses;
  }

  async findOne(id: number) {
    const user = await this.prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        email: true,
        fullName: true,
        dob: true,
        createdAt: true,
        country: true,
      },
    });
    if (!user) {
      throw new Error('Usuario no encontrado');
    }
    return user;
  }

  async update(id: number, dto: CreateUserDto) {
    const hashedPassword = await bcrypt.hash(dto.password, 10);

    const user = await this.prisma.user.update({
      where: { id },
      data: {
        email: dto.email,
        password: hashedPassword,
        fullName: dto.fullName,
        dob: new Date(dto.dob),
        country: dto.country,
      },
    });

    const { password, ...result } = user;
    return result;
  }
}
