import { IsString } from 'class-validator';

export class OrderDTO {
    @IsString()
    brothId: string;

    @IsString()
    proteinId: string;
}

export class ExtendedOrderDTO {
    @IsString()
    orderId: string;
}