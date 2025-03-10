/* eslint-disable prettier/prettier */
import { Body, Controller, Delete, Get, Inject, Param, ParseIntPipe, Patch, Post, Query } from '@nestjs/common';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { catchError } from 'rxjs';
import { PaginationDto } from 'src/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { NATS_SERVICE } from 'src/config';


@Controller('products')
export class ProductsController {
  constructor(
    @Inject(NATS_SERVICE) private readonly client: ClientProxy
  ) {}

  @Post()
  async createProduct(
    @Body() createProductDto: CreateProductDto) {
    return this.client.send({cmd: 'create_product'}, createProductDto);
  }

  @Get()
  async findAll(@Query() paginationDto: PaginationDto) {
    return this.client.send({cmd: 'find_all'}, paginationDto);
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {


    return this.client.send({cmd: 'find_one_product'}, {id})
      .pipe(
        catchError( err => {throw new RpcException(err)})
      )

   /* try {
      const product = await firstValueFrom(
        this.productsClient.send({cmd: 'find_one_product'}, {id})
      );
      return product
    } catch (error) {
      //console.log('error', error)
      throw new RpcException(error);
    }*/
  }

  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) id: number, 
    @Body() updateProductDto: UpdateProductDto) {
      return this.client.send({cmd: 'update_product'}, {id, ...updateProductDto})
      .pipe(
        catchError( err => {throw new RpcException(err)})
      )
  }

  @Delete(':id')
  async remove(
    @Param('id', ParseIntPipe) id: number) {
      return this.client.send({cmd: 'delete_product'}, {id})
      .pipe(
        catchError( err => {throw new RpcException(err)})
      )
  }

}