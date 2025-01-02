// create-contact.dto.ts
import {
  IsString,
  IsBoolean,
  IsEnum,
  IsInt,
  IsNotEmpty,
} from 'class-validator';
import { ContactType } from '../types/contact-type.enum';

export class CreateContactDto {
  @IsEnum(ContactType)
  type: ContactType;

  @IsString()
  @IsNotEmpty()
  value: string;

  @IsBoolean()
  is_primary: boolean = false;

  @IsInt()
  @IsNotEmpty()
  service_id: number;

  @IsInt()
  @IsNotEmpty()
  address_id: number;
}
