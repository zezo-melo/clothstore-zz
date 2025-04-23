export class CreateProductDto {
  title: string;
  body_html: string;
  vendor: string;
  product_type: string;
  tags: string[];
  price: number;
  imagesBase64: string[]; 
}
