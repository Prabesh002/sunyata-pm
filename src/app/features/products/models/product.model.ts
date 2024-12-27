export interface Product {
    id?: number;
    name: string;
    description: string;
    price: number;
    categoryId: number;
    brandId: number;
    manufacturerId: number;
    sku: string;
    stockQuantity: number;
    createdAt?: Date;
    updatedAt?: Date;
  }