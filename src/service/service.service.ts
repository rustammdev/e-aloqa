import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateServiceDto } from './dto/create-service.dto';
import { Prisma } from '@prisma/client';

@Injectable()
export class ServiceService {
  constructor(private prisma: PrismaService) {}

  // Cretae service
  async createService(dto: CreateServiceDto) {
    const prismaData: Prisma.servicesCreateInput = {
      name: dto.name,
      description: dto.description,
      category: {
        connect: {
          category_id: dto.categoryId,
        },
      },
      regions: {
        connect: dto.regionId.map((id) => ({
          region_id: id,
        })),
      },
    };

    try {
      const isExist = await this.prisma.services.findFirst({
        where: {
          name: {
            equals: dto.name,
            mode: 'insensitive', // Katta-kichik harflarga sezgir emas
          },
        },
      });

      if (isExist) {
        throw new HttpException('This service already exist', 400);
      }

      return await this.prisma.services.create({ data: prismaData });
    } catch (e) {
      throw new HttpException(e, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  // get services
  async getServices() {
    return await this.prisma.services.findMany();
  }

  async getServiceById(id: number) {
    const service = await this.prisma.services.findUnique({
      where: { service_id: id },
      include: { _count: true, addresses: true, contacts: true, regions: true },
    });

    if (!service) throw new HttpException('Service not found', 404);

    return service;
  }

  // update service
  async updateService(id: number, payload: Prisma.servicesUpdateInput) {
    const { category, regions, ...otherData } = payload;
    await this.getServiceById(id);
    const region: [] = regions as [];
    if (payload.name) {
      const findservice = await this.prisma.services.findFirst({
        where: {
          AND: [{ name: payload.name as string }, { service_id: { not: id } }],
        },
      });

      if (findservice)
        throw new HttpException('Service name alredy taken', 400);
    }

    try {
      // Dinamik ravishda category_id yangilash
      const dataToUpdate: any = {};

      // Category yangilash bo'lsa, uni qo'shamiz
      if (category) {
        dataToUpdate.category_id = category;
      }

      // Regionlar qo'shish yoki o'chirish
      if (region) {
        dataToUpdate.regions = {
          set: region.map((id) => ({ region_id: id })),
        };
      }

      // Boshqa maydonlarni yangilash,
      if (otherData) {
        Object.assign(dataToUpdate, otherData);
      }

      return await this.prisma.services.update({
        where: { service_id: id },
        data: dataToUpdate,
      });
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  // delete service
  async delServiceById(id: number) {
    await this.getServiceById(id);

    return await this.prisma.services.delete({ where: { service_id: id } });
  }
}
