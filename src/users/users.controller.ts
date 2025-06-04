import { Body, Controller, UseGuards, Req, Post, Delete } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CreateAddressDto } from './dto/create-address.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('register')
  async create(@Body() dto: CreateUserDto) {
    return this.usersService.create(dto);
  }

  @UseGuards(JwtAuthGuard)
  @Post('add-address')
  async addAddress(@Req() req, @Body() dto: CreateAddressDto) {
    const userId = Number(req.user.id);
    return this.usersService.addShippingAddress(userId, dto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete('delete-address/:id')
  async deleteAddress(@Req() req) {
    const userId = Number(req.user.id);
    const addressId = Number(req.params.id);
    if (!addressId) {
      throw new Error('No identificador de dirección proporcionado');
    }
    return this.usersService.deleteAddress(userId, addressId);
  }

  @UseGuards(JwtAuthGuard)
  @Post('update-address/:id')
  async updateAddress(@Req() req, @Body() dto: CreateAddressDto) {
    const userId = Number(req.user.id);
    const addressId = Number(req.params.id);
    if (!addressId) {
      throw new Error('No identificador de dirección proporcionado');
    }
    
    return this.usersService.updateAddress(userId,addressId, dto);
  }

}
