import { ApiProperty } from '@nestjs/swagger';
import {
    IsNotEmpty,
    IsString,
    IsNumber,
    Length,
} from 'class-validator';

export class CreateAssumptionDto {
    // @ApiProperty()
    id: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    field_type_id: string;

    @ApiProperty()
    default_value: string;

    @ApiProperty()
    is_locked: boolean;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    organisation_id: string;

    @ApiProperty()
    @Length(3, 50)
    assumptions_type: string;
}

export class GetList {

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    field_name: string;

    @ApiProperty()
    field_value: any;
}
