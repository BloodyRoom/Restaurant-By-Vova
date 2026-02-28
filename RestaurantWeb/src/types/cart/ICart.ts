import {IProduct} from "../product/IProduct";

export interface ICart {
    id: number;
    product: IProduct;
    count: number;
}