import { Module } from '@nestjs/common';
import { AdressController } from './adress.controller';
import { AdressService } from './adress.service';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [AdressController],
  providers: [AdressService],
})
export class AdressModule {}
