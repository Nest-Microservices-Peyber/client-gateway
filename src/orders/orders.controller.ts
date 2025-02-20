/* eslint-disable prettier/prettier */

import { Controller, Get, Post, Body, Patch, Param, Inject, Query, ParseUUIDPipe } from '@nestjs/common';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { CreateOrderDto } from './dto/create-order.dto';
//import { PaginationDto } from 'src/common';
import { catchError } from 'rxjs';
import { OrderPaginationDto, statusDto } from './dto';
import { PaginationDto } from 'src/common';
import { NATS_SERVICE } from 'src/config';


@Controller('orders')
export class OrdersController {
  
  constructor(@Inject(NATS_SERVICE) private readonly client: ClientProxy) {}

  @Post()
  async create(@Body() createOrderDto: CreateOrderDto) {
    return this.client.send({cmd: 'createOrder'}, createOrderDto)
    .pipe(
      catchError( err => {throw new RpcException(err)})
   );
    
  }

  @Get()
  async findAll(@Query() orderfPaginationDto: OrderPaginationDto) {
    //return orderfPaginationDto;
    return this.client.send({cmd: 'findAllOrders'},orderfPaginationDto);
  }

  @Get(':status')
  async findAllByStatus(
    @Param() statusDto: statusDto,
    @Query() paginationDto: PaginationDto
  ) {
    //return {statusDto,paginationDto}
    return this.client.send({cmd: 'findAllOrders'},{
      ...paginationDto,
      status: statusDto.status,
    })
      .pipe(
         catchError( err => {throw new RpcException(err)})
      )
  }

  @Get('id/:id')
  async findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.client.send({cmd: 'findOneOrder'},id)
      .pipe(
         catchError( err => {throw new RpcException(err)})
      )
  }  

  @Patch(':id')
  async changeOrderStatus(
    @Param('id', ParseUUIDPipe) id: string, 
    @Body() statusDto: statusDto,)
     {
      return this.client.send({cmd: 'changeOrderStatus'}, {
        id,
        status: statusDto.status
      })
      .pipe(
        catchError( err => {throw new RpcException(err)})
     )

      /* return {
        id,
        statusDto
      } */
  }


}
