import {
  IsString,
  IsNotEmpty,
  Length,
  MaxLength,
  IsNumber,
  IsLatitude,
  IsLongitude,
} from 'class-validator';

export class CreateAddressDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  street: string; // Ko'cha nomi

  @IsString()
  @IsNotEmpty()
  maps_link: string; // Uy raqami

  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  city: string; // Shahar

  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  state: string; // Viloyat

  @IsString()
  @IsNotEmpty()
  @Length(5, 10)
  postal_code: string; // Pochta indeksi

  @IsLatitude()
  @IsNotEmpty()
  latitude: number;

  @IsLongitude()
  @IsNotEmpty()
  longitude: number;
  @IsNumber()
  @IsNotEmpty()
  service_id: number;

  @IsNumber()
  @IsNotEmpty()
  region_id: number;
}
