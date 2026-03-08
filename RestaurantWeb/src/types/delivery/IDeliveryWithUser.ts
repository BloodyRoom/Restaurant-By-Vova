import { type IDeliveryProduct } from "./IDeliveryProduct";
import { type IAccount} from "../account/IAccount";

export interface IDeliveryWithUser {
    id: number;
    status: 'Created' | 'Delivering' | 'Completed' | 'Cancelled';
    address: string;
    user: IAccount;
    products: IDeliveryProduct[];
}