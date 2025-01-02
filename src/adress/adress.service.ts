import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateAddressDto } from './dto/create-adress.dto';

@Injectable()
export class AdressService {
  constructor(private prisma: PrismaService) {}

  async createAdress(body: CreateAddressDto) {
    const data: Prisma.addressesCreateInput = {
      city: body.city,
      state: body.state,
      street: body.street,
      postal_code: body.postal_code,
      latitude: body.latitude,
      longitude: body.longitude,
      maps_link: body.maps_link,
      service: {
        connect: {
          service_id: body.service_id,
        },
      },
      region: {
        connect: {
          region_id: body.region_id,
        },
      },
    };

    try {
      return await this.prisma.addresses.create({ data });
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
