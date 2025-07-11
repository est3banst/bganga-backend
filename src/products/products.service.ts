import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateProductDto } from './dto/create-product.dto';

@Injectable()
export class ProductsService {
    constructor(private readonly prisma: PrismaService) {}

    
    async create(dto: CreateProductDto, userId: number) {
        const {title, desc, categoryId, imageUrls, price} = dto;
        const product = await this.prisma.product.create({
            data: {
                title,
                desc,
              
                category: {
                    connect: { id: categoryId }
                },
                price,
                images: {
                    create: imageUrls.map(url => ({ url }))
                },
                user: {
                    connect: { id: userId } },
                },
                include: {
                    images: true,
                    category: true,
                    user: true
                }
        });

        return product;
    }
    async update(id: number, dto: CreateProductDto) {
        const {title, desc, categoryId, imageUrls, price, userId} = dto;
        const product = await this.prisma.product.update({
            where: { id },
            data: {
                title,
                desc,
                category: {
                    connect: { id: categoryId }
                },
                price,
                images: {
                    deleteMany: {},
                    create: imageUrls.map(url => ({ url }))
                },
                user: {
                    connect: { id: userId }
                }
            },
            include: {
                images: true,
                category: true,
                user: true
            }
        });
        return product;
    }
    async findOne(id: number) {
        return this.prisma.product.findUnique({
            where: { id },
            include: {
                images: true,
                category: true,
                user: true
            }
        });
    }
    async findByUser(userId: number) {
        return this.prisma.product.findMany({
            where : {userId},
            include : {
                images: true,
                category: true,
                user: true
            }
        })
    }

    async findAll() {
        return this.prisma.product.findMany({
            include: {
                images: true,
                category: true,
                user: true
            }
        });
    }
}
        