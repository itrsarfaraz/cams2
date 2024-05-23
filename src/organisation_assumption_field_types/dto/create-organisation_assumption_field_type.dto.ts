import { ApiProperty } from '@nestjs/swagger';
import {
    IsNotEmpty,
    IsString,
    Length,
} from 'class-validator';

export class CreateOrganisationAssumptionFieldTypeDto {
    // @ApiProperty()
    id: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    field_name: string;

    @ApiProperty()
    @Length(3, 50)
    field_type: string;

    @ApiProperty()
    type: string;
}
