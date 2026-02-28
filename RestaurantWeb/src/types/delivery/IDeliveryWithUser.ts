import { IDeliveryProduct } from "./IDeliveryProduct";
import {IAccount} from "../account/IAccount";

export interface IDeliveryWithUser {
    id: number;
    status: 'Created' | 'Delivering' | 'Completed' | 'Cancelled';
    address: string;
    user: IAccount;
    products: IDeliveryProduct[];
}