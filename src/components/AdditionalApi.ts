import { Api, ApiListResponse } from './base/api';
import { IItem, IOrder } from '../types/index';

export class AdditionalApi extends Api {
    constructor(baseUrl: string, options: RequestInit) {}

    getItemsList(): Promise<IItem[]> {}

    getItem(id: string): Promise<IItem> {}

    makeOrder(order: IOrder): Promise {}
}