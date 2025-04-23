import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductsModule } from './products/products.module';
import { ShopifyModule } from './shopify/shopify.module';

@Module({
  imports: [ProductsModule, ShopifyModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
