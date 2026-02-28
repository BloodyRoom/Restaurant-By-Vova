import { IDeliveryProduct } from "./IDeliveryProduct";

export interface IDelivery {
    id: number;
    status: 'Created' | 'Delivering' | 'Completed' | 'Cancelled';
    address: string;
    products: IDeliveryProduct[];
}