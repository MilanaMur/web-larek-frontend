import { IBasket } from '../types';
import { Component } from './base/Component';
import { IEvents } from './base/events';

export class Basket extends Component<IBasket> {
	protected _list: HTMLElement;
	protected _total: HTMLElement;
	protected _button: HTMLButtonElement;

	constructor(container: HTMLElement, protected events?: IEvents) {
		super(container);

		this._list = this.container.querySelector('.basket__list');
		this._total = this.container.querySelector('.basket__price');
		this._button = this.container.querySelector('.button');

		this.list = [];

		if (this._button) {
			this._button.addEventListener('click', () => {
				events.emit('basket:makeOrder');
			});
		}

		this.disableButton(true);
	}

	set total(value: number) {
		this.setText(this._total, `${value} синапсов`);

		if (value > 0) {
			this.disableButton(false);
		} else {
			this.disableButton(true);
		}
	}

	set list(items: HTMLElement[] | null) {
		if (items) {
			this._list.replaceChildren(...items);
		}
	}

	protected disableButton(disabled: boolean): void {
		this.setDisabled(this._button, disabled);
	}
}
