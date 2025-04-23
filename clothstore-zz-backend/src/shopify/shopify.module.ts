import { Module } from '@nestjs/common';
import { ShopifyController } from './shopify.controller';
import { ShopifyService } from './shopify.service';

@Module({
  controllers: [ShopifyController],
  providers: [ShopifyService],
})
export class ShopifyModule {}
