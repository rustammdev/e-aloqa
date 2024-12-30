import { IsNotEmpty, IsString, IsOptional, IsInt } from 'class-validator';

export class CreateServiceDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsNotEmpty()
  @IsInt()
  categoryId: number;

  @IsOptional()
  @IsInt({ each: true }) // Array of region IDs
  regionId: number[];
}
