import { IsNumber, IsBoolean, IsString, IsDate, isString, IsObject } from 'class-validator';

export class ResponseDTO {

  @IsNumber()
  code!: 0;

  @IsString()
  status!: '';  

  @IsObject()
  item!: null;
  
}