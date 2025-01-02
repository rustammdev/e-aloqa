import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateContactDto } from './dto/create-contact.dto';

@Injectable()
export class ContactService {
  constructor(private prisma: PrismaService) {}

  async createContact(payload: CreateContactDto) {
    const contact = await this.prisma.contacts.findFirst({
      where: { value: payload.value, service_id: payload.service_id },
    });
    if (contact)
      throw new HttpException(
        'This contact alredy exit this service',
        HttpStatus.BAD_REQUEST,
      );
    const data: Prisma.contactsCreateInput = {
      type: payload.type,
      value: payload.value,
      is_primary: payload.is_primary,
      service: {
        connect: {
          service_id: payload.service_id,
        },
      },
      address: {
        connect: {
          address_id: payload.address_id,
        },
      },
    };
    try {
      return await this.prisma.contacts.create({ data });
    } catch (e) {
      throw new HttpException(e, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async getContactsById(id: number) {
    const contact = await this.prisma.contacts.findFirst({
      where: { contact_id: id },
    });

    if (!contact) throw new HttpException('Contact not found', 404);
    return await this.prisma.contacts.findMany({ where: { service_id: id } });
  }

  async getContactsByServiceId(id: number) {
    return await this.prisma.contacts.findMany({ where: { service_id: id } });
  }

  async getAllContacts() {
    return await this.prisma.contacts.findMany();
  }

  async delContactById(id: number) {
    await this.getContactsById(id);
    return await this.prisma.contacts.delete({ where: { contact_id: id } });
  }
}
