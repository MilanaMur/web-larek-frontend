export interface IItem {
	id: string;
	description: string;
	image: string;
	title: string;
	category: string;
	price: number | null;
	index?: number;
}

export interface IAppState {
	catalog: IItem[];
	basket: IItem[];
	// payment: TPayment;
	orderInfo: IOrderModel;
	formErrors: FormErrors;
	setCatalog(data: IItem[]): void;
	addToBasket(item: IItem): void;
	removeFromBasket(item: IItem): void;
	clearBasket(): void;
	isInBasket(id: string): boolean;
	setPreview(item: IItem): void;
	getTotal(): number;
	countItems(): number;
	getItemIDs(): string[];
	setOrderField(field: keyof IOrderModel, value: string): void;
	validateOrder(): void;
	validateContacts(): void;
}

export interface IOrderModel {
	payment: string;
	address: string;
	email: string;
	phone: string;
}

export interface IOrderResult {
	id: string;
	total: number;
}

export interface IModalData {
	content: HTMLElement;
}

export interface IFormState {
	valid: boolean;
	errors: string[];
}

export interface IPage {
	counter: number;
	catalog: HTMLElement[];
	wrapper: HTMLElement;
	basket: HTMLElement;
	locked: boolean;
}

export interface ICard {
	title: string;
	price: number | null;
	buttonText?: string;
	category?: string;
	image?: string;
	description?: string;
	index?: number;
}

export interface ICardActions {
	onClick: (event: MouseEvent) => void;
}

export interface IBasket {
	items: IItem[];
}

export interface ISuccess {
	total: number;
}

export interface ISuccessActions {
	onClick: () => void;
}

export type FormErrors = Partial<Record<keyof IOrderModel, string>>;

export type TPayment = 'card' | 'cash';
