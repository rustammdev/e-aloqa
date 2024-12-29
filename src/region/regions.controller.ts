import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { RegionService } from './regions.service';
import { CreateRegionDto } from './dto/createRegion.dto';

@Controller('region')
export class RegionController {
  constructor(private regionService: RegionService) {}

  @Post()
  @UsePipes(ValidationPipe)
  async createRegions(@Body() createRegionDto: CreateRegionDto) {
    return await this.regionService.createRegion(createRegionDto);
  }

  @Get()
  async getRegions() {
    return await this.regionService.getRegions();
  }

  // paramdan kelgan malumotlar string ko'rinishida bo'ladi
  @Get(':id')
  async getRegionById(@Param('id', ParseIntPipe) id: number) {
    return await this.regionService.getRegionById(id);
  }

  @Put(':id')
  async updateRegionById(
    @Param('id', ParseIntPipe) id: number,
    @Body() data: CreateRegionDto,
  ) {
    return await this.regionService.updateRegion(id, data);
  }

  @Delete(':id')
  async deleteRegion(@Param('id', ParseIntPipe) id: number) {
    return await this.regionService.deleteRegion(id);
  }
}
