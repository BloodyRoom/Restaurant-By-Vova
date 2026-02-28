export interface IProductCreate {
    name: string;
    description: string;
    price: number;
    image?: string;
    categoryId: number;
}