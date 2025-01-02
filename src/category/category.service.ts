import { Prisma } from '@prisma/client';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class CategoryService {
  constructor(private prisma: PrismaService) {}

  async createCategory(data: Prisma.categoriesCreateInput) {
    try {
      const isExist = await this.prisma.categories.findFirst({
        where: {
          name: {
            equals: data.name,
            mode: 'insensitive', // Katta-kichik harflarga sezgir emas
          },
        },
      });

      if (isExist) {
        throw new HttpException('This category already exists', 400);
      }

      return await this.prisma.categories.create({ data });
    } catch (e) {
      throw new HttpException(e, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async getCategories() {
    return await this.prisma.categories.findMany();
  }

  async getCategoryById(id: number) {
    const user = await this.prisma.categories.findUnique({
      where: { category_id: id },
      include: { services: true },
    });

    if (!user) throw new HttpException('Category not found', 404);

    return user;
  }

  async updateCategoryById(id: number, data: Prisma.categoriesUpdateInput) {
    await this.getCategoryById(id);

    if (data.name) {
      const findRegion = await this.prisma.categories.findFirst({
        where: {
          AND: [{ name: data.name as string }, { category_id: { not: id } }],
        },
      });

      if (findRegion)
        throw new HttpException('Category name alredy taken', 400);
    }

    return this.prisma.categories.update({ where: { category_id: id }, data });
  }

  async deleteCategoryById(id: number) {
    await this.getCategoryById(id);

    return await this.prisma.categories.delete({ where: { category_id: id } });
  }
}
