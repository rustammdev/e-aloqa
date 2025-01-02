import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ContactService } from './contact.service';
import { CreateContactDto } from './dto/create-contact.dto';

@Controller('contact')
export class ContactController {
  constructor(private contactService: ContactService) {}

  @Post()
  @UsePipes(ValidationPipe)
  async createRegions(@Body() createContactDto: CreateContactDto) {
    return await this.contactService.createContact(createContactDto);
  }

  @Get()
  async getAllContacts() {
    return await this.contactService.getAllContacts();
  }

  @Get(':id')
  async getAllContactsByServiceId(@Param('id', ParseIntPipe) id: number) {
    return await this.contactService.getContactsByServiceId(id);
  }

  @Delete(':id')
  async delContactById(@Param('id', ParseIntPipe) id: number) {
    return await this.contactService.delContactById(id);
  }
}
