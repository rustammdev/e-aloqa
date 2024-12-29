import { Module } from '@nestjs/common';
import { RegionService } from './regions.service';
import { RegionController } from './regions.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  providers: [RegionService],
  controllers: [RegionController],
})
export class RegionModule {}
