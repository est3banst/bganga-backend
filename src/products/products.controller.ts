import { Body, Get, Post, Controller, Req } from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';

@Controller('products')
export class ProductsController {
    constructor(private readonly productsService: ProductsService) {}

    @Post('/create/:id')
    async create(@Req() req ,@Body() dto:CreateProductDto) {
        const userId = Number(req.params.id);
        if (!userId) { throw new Error("no user id prov"); }
        const product = this.productsService.create(dto, userId);
        if (product) {
            return { success: true, message: 'Producto creado con éxito', product};
        }
        if (!product) {
            return { success: false, message: 'Error al crear producto' };
        }
    }
    @Get('/all-products/:id')
    async findByUser(@Req() req) {
        const userId = Number(req.params.id);
        if (!userId) { throw new Error("no user id prov"); }
        return this.productsService.findByUser(userId);

    }

    @Get() 
    async findAll() {
        return this.productsService.findAll();
    }
}
