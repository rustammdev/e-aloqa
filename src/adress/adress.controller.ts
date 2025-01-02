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
import { AdressService } from './adress.service';
import { CreateAddressDto } from './dto/create-adress.dto';
import { UpdateAddressDto } from './dto/update-adress.dto';

@Controller('adress')
export class AdressController {
  constructor(private adressService: AdressService) {}

  @Post()
  @UsePipes(ValidationPipe)
  async createAdress(@Body() data: CreateAddressDto) {
    return await this.adressService.createAdress(data);
  }

  // get all adresses
  @Get()
  async getAllAdresses() {
    return await this.adressService.getAllAdresses();
  }

  // get adress by id
  @Get(':id')
  async getAdressById(@Param('id', ParseIntPipe) id: number) {
    return await this.adressService.getAdressById(id);
  }

  @Patch(':id')
  async updateAdressById(
    @Param('id', ParseIntPipe) id: number,
    @Body() payload: UpdateAddressDto,
  ) {
    return await this.adressService.updateById(id, payload);
  }

  @Delete(':id')
  async deleteRegionById(@Param('id', ParseIntPipe) id: number) {
    return await this.adressService.delAdressById(id);
  }
}
