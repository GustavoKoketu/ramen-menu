import { IsString, IsNumber } from 'class-validator';

export class ProteinsDTO {
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