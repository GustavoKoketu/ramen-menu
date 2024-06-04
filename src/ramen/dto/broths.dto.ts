import { IsString, IsNumber } from 'class-validator';

export class BrothDTO {
    @IsString()
    id: string;

    @IsString()
    imageInactive: string;

    @IsString()
    imageActive: string;

    @IsString()
    name: string;

    @IsString()
    description: string;

    @IsNumber()
    price: number
}