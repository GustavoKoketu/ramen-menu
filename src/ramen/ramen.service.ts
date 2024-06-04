import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { BrothDTO } from './dto/broths.dto';
import { ProteinsDTO } from './dto/proteins.dto';
import { OrderDTO, ExtendedOrderDTO } from './dto/order.dto';
import axios from 'axios'

@Injectable()
export class RamenService {

    //Teste mais simples possível da apiKey
    headerChecker(apiKey: string){
        if (apiKey !== "ZtVdh8XQ2U8pWI2gmZ7f796Vh8GllXoN7mr0djNf"){
            throw new HttpException('x-api-key header missing/incorrect', HttpStatus.FORBIDDEN)
        }
    }

    //Retornar o array com os caldos disponíveis
    getBroths(){
        const availableBroths: BrothDTO[] = [
            {
                id: "1",
                imageInactive: "https://tech.redventures.com.br/icons/salt/inactive.svg",
                imageActive: "https://tech.redventures.com.br/icons/salt/active.svg",
                name: "Salt",
                description: "Simple like the seawater, nothing more",
                price: 10
            },
            {
                id: "2",
                imageInactive: "https://tech.redventures.com.br/icons/salt/inactive.svg",
                imageActive: "https://tech.redventures.com.br/icons/salt/active.svg",
                name: "Chicken",
                description: ".",
                price: 35
            },           
        ]

        return availableBroths
    }

    getProteins(){
        const availableProteins: ProteinsDTO[] = [
            {
                id: "1",
                imageInactive: "https://tech.redventures.com.br/icons/pork/inactive.svg",
                imageActive: "https://tech.redventures.com.br/icons/pork/active.svg",
                name: "Chasu",
                description: "A sliced flavourful pork meat with a selection of season vegetables.",
                price: 10
            },
            {
                id: "2",
                imageInactive: "https://tech.redventures.com.br/icons/salt/inactive.svg",
                imageActive: "https://tech.redventures.com.br/icons/salt/active.svg",
                name: "Chicken",
                description: ".",
                price: 35
            },           
        ]

        return availableProteins
    }

    async postOrder(order: OrderDTO){
        //Checagem se ambos campos estão presentes
        if (order.brothId == undefined || order.proteinId == undefined){
            throw new HttpException('both brothId and proteinId are required', 401)
        }

        //Requisição usando axios para obter o orderId
        let orderId = ""
        await axios.post("https://api.tech.redventures.com.br/orders/generate-id", {
            headers: {
                "x-api-key": "ZtVdh8XQ2U8pWI2gmZ7f796Vh8GllXoN7mr0djNf"
            }
        })
        //Caso tenha sucesso, ver o json do orderId
        .then((response) => {
            console.log(response.data)
            orderId = response.data.orderId
        })
        //Caso tenha erro:
        .catch((error) => {
            //Log do erro para debugging
            console.log(error.response.data)
            throw new HttpException('could not find orderId', error.response.status)
        })

        //Check adicional de orderId vazio
        if (orderId === ""){
            console.log('Requisição retornou vazia')
            throw new HttpException('empty orderId request', 500)
        } 

        //ExtendedOrder é o orderDTO, que vem na requisição, mas com o campo orderId
        const extendedOrder: ExtendedOrderDTO = {
            ...order,
            orderId: orderId
        }
        
        // Em uma aplicação real, o pedido poderia ser colocado em um banco de dados, utilizando um ORM como o prisma, da seguinte forma
        // try {
        //     const newOrder = await this.prisma.orders.create({
        //         data: extendedOrder
        //     })
        // } catch (error) {
        //     console.log(error.response.data)
        //     throw new HttpException('could not place order', 500)
        // }

        return order
    }
}

