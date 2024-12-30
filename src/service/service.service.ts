import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateServiceDto } from './dto/create-service.dto';
import { Prisma } from '@prisma/client';

@Injectable()
export class ServiceService {
  constructor(private prisma: PrismaService) {}

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
}
