import {
  IsString,
  IsOptional,
  Length,
  MaxLength,
  IsNumber,
  IsLatitude,
  IsLongitude,
} from 'class-validator';

export class UpdateAddressDto {
  @IsString()
  @IsOptional()
  @MaxLength(100)
  street?: string; // Ko'cha nomi

  @IsString()
  @IsOptional()
  @MaxLength(10)
  maps_link?: string; // Uy raqami

  @IsString()
  @IsOptional()
  @MaxLength(50)
  city?: string; // Shahar

  @IsString()
  @IsOptional()
  @MaxLength(50)
  state?: string; // Viloyat

  @IsString()
  @IsOptional()
  @Length(5, 10)
  postal_code?: string; // Pochta indeksi

  @IsLatitude()
  @IsOptional()
  latitude?: number;

  @IsLongitude()
  @IsOptional()
  longitude?: number;
  @IsNumber()
  @IsOptional()
  service_id?: number;

  @IsNumber()
  @IsOptional()
  region_id?: number;
}
