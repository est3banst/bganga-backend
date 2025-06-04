import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateProductDto {
    @IsNotEmpty()
    @IsString()
    title: string;
  
    @IsNotEmpty()
    @IsString()
    desc: string;

    @IsNotEmpty()
    @IsNumber() 
    price: number;
    
    @IsNotEmpty()
    imageUrls: string[];

    @IsNotEmpty()
    userId: number;

    @IsNotEmpty()
    @IsNumber()
    categoryId: number;   
}