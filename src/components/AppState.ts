import { FormErrors, IAppState, IItem, IOrderModel, TPayment } from '../types';
import { Model } from './base/Model';

export class AppState extends Model<IAppState> {
	catalog: IItem[];
	basket: IItem[] = [];
	orderInfo: IOrderModel = {
		payment: '',
		address: '',
		email: '',
		phone: '',
	};
	formErrors: FormErrors = {};

	setCatalog(items: IItem[]): void {
		this.catalog = items;
		this.emitChanges('catalog:changed');
	}

	addToBasket(item: IItem): void {
		this.basket.push(item);
		this.emitChanges('basket:changed');
	}

	removeFromBasket(item: IItem) {
		this.basket = this.basket.filter((i) => i.id !== item.id);
		this.emitChanges('basket:changed');
	}

	clearBasket(): void {
		this.basket = [];
		this.emitChanges('basket:changed');
	}

	isInBasket(id: string): boolean {
		return this.basket.some((item) => item.id === id);
	}

	setPreview(item: IItem) {
		this.emitChanges('card:select', item);
	}

	getTotal(): number {
		return this.basket.reduce((sum, item) => {
			return sum + item.price;
		}, 0);
	}

	countItems(): number {
		return this.basket.length;
	}

	getItemIDs(): string[] {
		return this.basket.map((item) => item.id);
	}

	setOrderField(field: keyof IOrderModel, value: string): void {
		this.orderInfo[field] = value;

		if (this.validateOrder()) {
			this.events.emit('order:ready', this.orderInfo);
		}

		if (this.validateContacts()) {
			this.events.emit('contacts:ready', this.orderInfo);
		}
	}

	validateOrder() {
		const errors: typeof this.formErrors = {};
		if (!this.orderInfo.payment) {
			errors.payment = 'Выберите способ оплаты';
		}

		if (!this.orderInfo.address) {
			errors.address = 'Необходимо указать адрес';
		}

		this.formErrors = errors;
		this.events.emit('formOrderErrors:change', this.formErrors);

		return Object.keys(errors).length === 0;
	}

	validateContacts() {
		const errors: typeof this.formErrors = {};
		if (!this.orderInfo.email) {
			errors.email = 'Необходимо указать email';
		}

		if (!this.orderInfo.phone) {
			errors.phone = 'Необходимо указать телефон';
		}

		this.formErrors = errors;
		this.events.emit('formContactsErrors:change', this.formErrors);

		return Object.keys(errors).length === 0;
	}

	clearOrderInfo(): IOrderModel {
		return (this.orderInfo = {
			payment: '',
			address: '',
			email: '',
			phone: '',
		});
	}
}
