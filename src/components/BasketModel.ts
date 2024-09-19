import { IItem, TPayment } from '../types';

export class BasketModel {
    protected payment: TPayment;
    protected address: string;
    protected email: string;
    protected phone: string;
	protected items: IItem[] = [];
    protected totalSum: number = 0;

    constructor () {}

    addItem(item: IItem): void {}

    deleteItem(id: string): void {}

    getItem(id: string): IItem {}

    getItems(): IItem[] {}

    getTotal(): number {}
}