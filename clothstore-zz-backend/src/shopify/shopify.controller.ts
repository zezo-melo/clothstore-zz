import { Controller, Post, Body, Get } from '@nestjs/common';
import { ShopifyService } from './shopify.service';
import { CreateProductDto } from './dto/create-product.dto';

@Controller('shopify')
export class ShopifyController {
  constructor(private readonly shopifyService: ShopifyService) {}

  @Post('products')
  createProduct(@Body() createProductDto: CreateProductDto) {
    return this.shopifyService.createProduct(createProductDto);
  }

  @Get('products')
  async getAllProducts() {
  return await this.shopifyService.getAllProducts();
  }

}
