import { IBasket } from '../types';
import { Component } from './base/Component';
import { IEvents } from './base/events';

export class Basket extends Component<IBasket> {
	protected _list: HTMLElement;
	protected _total: HTMLElement;
	protected _button: HTMLButtonElement;

	constructor(
		protected blockName: string,
		container: HTMLElement,
		protected events: IEvents
	) {}

	set total(totalSum: number) {}

	get list(): HTMLElement {}

	set list(items: HTMLElement[] | null) {}

	disableButton(disabled: boolean): void {}
}
