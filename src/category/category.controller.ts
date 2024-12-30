import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { Prisma } from '@prisma/client';

@Controller('category')
export class CategoryController {
  constructor(private categoryService: CategoryService) {}

  @Post()
  @UsePipes(ValidationPipe)
  async createCategory(@Body() createCategoryDto: CreateCategoryDto) {
    return await this.categoryService.createCategory(createCategoryDto);
  }

  @Get()
  async getCategories() {
    return await this.categoryService.getCategories();
  }

  @Get(':id')
  async getCategoryById(@Param('id', ParseIntPipe) id: number) {
    return await this.categoryService.getCategoryById(id);
  }

  @Patch(':id')
  async updateCategoryById(
    @Param('id', ParseIntPipe) id: number,
    @Body() data: Prisma.categoriesUpdateInput,
  ) {
    return await this.categoryService.updateCategoryById(id, data);
  }

  @Delete(':id')
  async deleteCategoryById(@Param('id', ParseIntPipe) id: number) {
    return await this.categoryService.deleteCategoryById(id);
  }
}
