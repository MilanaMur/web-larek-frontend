import { Card } from './common/Card';
import { ICardActions } from '../types';

export class BasketItem extends Card {
	protected _id: HTMLElement;
	protected _index: HTMLElement;
	protected _title: HTMLElement;
	protected _price: HTMLElement;
    protected _button: HTMLButtonElement;

	constructor(container: HTMLElement, actions?: ICardActions) {}

	get id(): string {}

	set id(value: string) {}

	get title(): string {}

	set title(value: string) {}

	set index(value: number) {}

	set price(value: number | null) {}

	setButtonAction(actions: ICardActions): void {}

	getItem(id: string): HTMLElement {}
}
