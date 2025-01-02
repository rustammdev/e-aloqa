import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { RegionModule } from './region/regions.module';
import { CategoryModule } from './category/category.module';
import { ServiceModule } from './service/service.module';
import { AdressModule } from './adress/adress.module';

@Module({
  imports: [PrismaModule, RegionModule, CategoryModule, ServiceModule, AdressModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
