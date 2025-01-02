import { Prisma } from '@prisma/client';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class RegionService {
  constructor(private prisma: PrismaService) {}

  async createRegion(data: Prisma.regionsCreateInput) {
    try {
      const name =
        data.name.charAt(0).toUpperCase() + data.name.slice(1).toLowerCase();

      const isExist = await this.prisma.regions.findUnique({
        where: { name },
      });

      if (isExist) throw new HttpException('This region alredy exist', 400);

      return await this.prisma.regions.create({ data });
    } catch (e) {
      throw new HttpException(e, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async getRegions() {
    return await this.prisma.regions.findMany();
  }

  async getRegionById(id: number) {
    const user = await this.prisma.regions.findUnique({
      where: { region_id: id },
    });

    if (!user) throw new HttpException('Region not found', 404);

    return user;
  }

  async updateRegion(id: number, data: Prisma.regionsUpdateInput) {
    await this.getRegionById(id);

    // "Dublicated key error" xatoligi kelib chiqmasligi uchun,
    // yangilashdan oldin tekshirish kerak
    if (data.name) {
      const findRegion = await this.prisma.regions.findFirst({
        where: {
          AND: [{ name: data.name as string }, { region_id: { not: id } }],
        },
      });

      if (findRegion) throw new HttpException('Region alredy taken', 400);
    }

    return this.prisma.regions.update({ where: { region_id: id }, data });
  }

  async deleteRegionById(id: number) {
    await this.getRegionById(id);

    return await this.prisma.regions.delete({ where: { region_id: id } });
  }
}
