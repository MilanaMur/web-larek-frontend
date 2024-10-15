import { ICardActions, IBasket } from '../types';
import { Component } from './base/Component';
import { IEvents } from './base/events';

export class Basket extends Component<IBasket> {
	protected _list: HTMLElement;
	protected _total: HTMLElement;
	protected _button: HTMLButtonElement;

	constructor(
		container: HTMLElement,
		protected events?: IEvents,
		actions?: ICardActions
	) {
		super(container);

		this._list = this.container.querySelector('.basket__list');
		this.list = [];
		this._total = this.container.querySelector('.basket__price');
		this._button = this.container.querySelector('.button');

		if (this._button) {
			this._button.addEventListener('click', () => {
				events.emit('basket:makeOrder');
			});
		}
	}

	set total(value: number) {
		this.setText(this._total, `${value} синапсов`);
	}

	set list(items: HTMLElement[] | null) {
		if (items) {
			this._list.replaceChildren(...items);
		}
	}

	disableButton(disabled: boolean): void {
		this.setDisabled(this._button, disabled);
	}
}
