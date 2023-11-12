import { Address } from './User';

export interface Order {
  id: number;
  buyerEmail: string;
  orderDate: string;
  shipToAddress: Address;
  orderItems: OrderItem[];
  deliveryMethod: string;
  shipingPrice: number;
  subtotal: number;
  total: number;
  status: string;
}

export interface OrdertoCreate {
  basketId: string;
  ShipToAddress: Address;
  DeliveryMethodId: number;
}

export interface OrderItem {
  productId: number;
  productName: string;
  pictureUrl: string;
  price: number;
  quantity: number;
}
