export interface ProductImageFormat {
  url: string;
}

export interface ProductImageAttributes {
  formats: {
    thumbnail?: ProductImageFormat;
  };
}

export interface ProductImage {
  id: number;
  attributes: ProductImageAttributes;
}

export interface ProductAttributes {
  name: string;
  price: number;
  description: string;
  product_image?: {
    data: ProductImage[];
  };
}

export interface Product {
  id: number;
  attributes: ProductAttributes;
}
