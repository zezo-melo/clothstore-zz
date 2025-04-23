import { Injectable } from '@nestjs/common';
import axios from 'axios';
import * as dotenv from 'dotenv';
import type { CreateProductDto } from './dto/create-product.dto';

dotenv.config();

@Injectable()
export class ShopifyService {
  private readonly apiUrl = `${process.env.SHOPIFY_STORE_URL}/admin/api/${process.env.SHOPIFY_API_VERSION}/products.json`;

  async createProduct(product: CreateProductDto) {
    const payload = {
      product: {
        title: product.title,
        body_html: product.body_html,
        vendor: product.vendor,
        product_type: product.product_type,
        tags: product.tags,
        variants: [
          {
            price: product.price,
          },
        ],
        // Aqui está o envio de múltiplas imagens em base64:
        images: Array.isArray(product.imagesBase64)
          ? product.imagesBase64.map((base64: string) => ({
              attachment: base64.replace(/^data:image\/\w+;base64,/, ''),
            }))
          : [],
      },
    };

    const response = await axios.post(this.apiUrl, payload, {
      headers: {
        'X-Shopify-Access-Token': process.env.SHOPIFY_ACCESS_TOKEN,
        'Content-Type': 'application/json',
      },
    });

    return response.data;
  }
}
