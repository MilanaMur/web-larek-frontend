export interface IItem {
	id: string;
	description: string;
	image: string;
	title: string;
	category: string;
	price: number | null;
	selected: boolean;
}

export interface IAppState {
	catalog: IItem[];
	basket: IItem[];
	orderInfo: IOrderModel;
	preview: string | null;
	formErrors: FormErrors;
	setCatalog(data: IItem[]): void;
	addToBasket(item: IItem): void;
	removeFromBasket(id: string): void;
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
	basket: HTMLElement;
	locked: boolean;
}

export interface ICard {
	id: string;
	description?: string;
	image?: string;
	title: string;
	category?: string;
	price: number | null;
	buttonText?: string;
	selected?: boolean;
}

export interface IBasketCard {
	title: string;
	price: number | null;
	index: number;
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
