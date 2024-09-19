import { IItem } from '../types';

export class CatalogModel {
	protected items: IItem[] = [];

	constructor() {}

	addItem(item: IItem): void {}

	deleteItem(id: string): void {}

	getItem(id: number): IItem {}

	getItems(): IItem[] {}
}
