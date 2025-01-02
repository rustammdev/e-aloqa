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
import { ServiceService } from './service.service';
import { CreateServiceDto } from './dto/create-service.dto';
import { UpdateServiceDto } from './dto/update-service.dto';

@Controller('service')
export class ServiceController {
  constructor(private service: ServiceService) {}

  @Post()
  @UsePipes(ValidationPipe)
  async createService(@Body() data: CreateServiceDto) {
    return await this.service.createService(data);
  }

  @Get()
  async getServices() {
    return await this.service.getServices();
  }

  @Get(':id')
  async getRegionById(@Param('id', ParseIntPipe) id: number) {
    return await this.service.getServiceById(id);
  }

  @Patch(':id')
  async updateRegionById(
    @Param('id', ParseIntPipe) id: number,
    @Body() data: UpdateServiceDto,
  ) {
    return await this.service.updateService(id, data);
  }

  @Delete(':id')
  async deleteRegionById(@Param('id', ParseIntPipe) id: number) {
    return await this.service.delServiceById(id);
  }
}
