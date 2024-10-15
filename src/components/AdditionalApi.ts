import { Api, ApiListResponse } from './base/api';
import { IItem, IOrderModel, IOrderResult } from '../types/index';

export class AdditionalApi extends Api {
	readonly cdn: string;

	constructor(cdn: string, baseUrl: string, options?: RequestInit) {
		super(baseUrl, options);

		this.cdn = cdn;
	}

	getItemsList(): Promise<IItem[]> {
		return this.get('/product/').then((data: ApiListResponse<IItem>) =>
			data.items.map((item: IItem) => ({
				...item,
				image: this.cdn + item.image,
			}))
		);
	}

	sendOrder(
		order: IOrderModel,
		total: number,
		items: string[]
	): Promise<Partial<IOrderResult>> {
		const data = { ...order, total, items };
		return this.post('/order', data);
	}
}
