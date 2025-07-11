import { Controller, Get } from '@nestjs/common';
import { CategoriesService } from './categories.service';

@Controller('categories')
export class CategoriesController {
    constructor(private readonly categoriesService: CategoriesService) {}
    
    
    @Get('/')
    async getAllCategories() {
        const categories = await this.categoriesService.getAllCategories();
        if (!categories || categories.length === 0) {
            return { success: false, message: 'no se encontraron categorias'}
        }
        return { success: true, categories: categories }
          
    }
}
