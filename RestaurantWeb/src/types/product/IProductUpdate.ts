export interface IProductUpdate {
    id: number;
    name: string;
    description: string;
    price: number;
    image?: null | File;
    categoryId: number;
}