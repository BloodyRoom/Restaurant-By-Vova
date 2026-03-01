export interface IDeliveryUpdate {
    id: number;
    status: 'Created' | 'Delivering' | 'Completed' | 'Cancelled';
}