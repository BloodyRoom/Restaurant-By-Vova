export interface IProductCreate {
    name: string;
    description: string;
    price: number;
    image?: null | File;
    categoryId: number;
}