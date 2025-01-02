// create-contact.dto.ts
import {
  IsString,
  IsBoolean,
  IsEnum,
  IsInt,
  IsOptional,
} from 'class-validator';
import { ContactType } from '../types/contact-type.enum';

export class UpdateContactDto {
  @IsEnum(ContactType)
  type?: ContactType;

  @IsString()
  @IsOptional()
  value?: string;

  @IsBoolean()
  is_primary?: boolean = false;

  @IsInt()
  @IsOptional()
  service_id?: number;

  @IsInt()
  @IsOptional()
  address_id?: number;
}
