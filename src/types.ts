export interface Product {
  id?: number;            // API might assign this
  name: string;
  price: number | string; // allow string for input
  description: string;
  image: string;          // image URL
}
