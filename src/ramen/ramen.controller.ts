import { Controller, Get, Post, Body, Headers } from '@nestjs/common';
import { RamenService } from './ramen.service';
import { BrothDTO } from './dto/broths.dto';
import { ProteinsDTO } from './dto/proteins.dto';
import { OrderDTO } from './dto/order.dto';

@Controller('ramen')
export class RamenController {
    constructor(private readonly ramenService: RamenService) {} 

    //Requisição Get de Caldos
    @Get('broths')
    getBroths(@Headers() headers) {
        //
        this.ramenService.headerChecker(headers["x-api-key"])
        const availableBroths: BrothDTO[] = this.ramenService.getBroths()
        return availableBroths
    }

    //Requisição Get de Proteínas
    @Get('proteins')
    getProteins(@Headers() headers) {
        this.ramenService.headerChecker(headers["x-api-key"])
        const availableProteins: ProteinsDTO[] = this.ramenService.getProteins()
        return availableProteins
    }

    //Requisição Post de Orders
    @Post('orders')
    async postOrder(@Headers() headers, @Body() body: OrderDTO) {
        this.ramenService.headerChecker(headers["x-api-key"])
        const postedOrder: OrderDTO = await this.ramenService.postOrder(body)
        return postedOrder
    }
}
