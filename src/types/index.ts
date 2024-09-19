export interface IPage {
	counter: number;
	catalog: HTMLElement[];
	basket: HTMLElement;
}

export interface IItem {
	id: string;
	description: string;
	image: string;
	title: string;
	category: string;
	price: number | null;
}

export interface ICard {
	id: string;
	description?: string;
	image?: string;
	title: string;
	category?: string;
	price: number | null;
}

export interface ICardActions {
	onClick: (event: MouseEvent) => void;
}

export interface ICatalog {
	items: IItem[];
}

export interface IBasket {
	items: IItem[];
}

export interface IOrder {
	payment: TPayment;
	address: string;
	email: string;
	phone: string;
}

export interface IOrderResult {
	id: string;
	totalSum: number;
}

export interface IModalData {
	content: HTMLElement;
}

export interface IFormState {
	valid: boolean;
	errors: string[];
}

export interface ISuccess {
	total: number;
  }
  
  export interface ISuccessActions {
	onClick: () => void;
  }

export type TPayment = 'online' | 'cash';
