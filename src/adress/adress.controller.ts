import {
  Body,
  Controller,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AdressService } from './adress.service';
import { CreateAddressDto } from './dto/create-adress.dto';

@Controller('adress')
export class AdressController {
  constructor(private adressService: AdressService) {}

  @Post()
  @UsePipes(ValidationPipe)
  async createService(@Body() data: CreateAddressDto) {
    return await this.adressService.createAdress(data);
  }
}
