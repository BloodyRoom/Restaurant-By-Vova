import {type IProduct} from "../product/IProduct";

export interface IDeliveryProduct {
    product: IProduct;
    count: number;
}