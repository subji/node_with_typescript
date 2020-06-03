import { IsString } from 'class-validator';

export default class ParameterDTO {

  @IsString()
  searchKeyword!: string;

  @IsString()
  startDate!: string;

  @IsString()
  endDate!: string;

}