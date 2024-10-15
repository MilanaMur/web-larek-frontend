import { ICardActions, ICard } from '../../types';
import { ensureElement } from '../../utils/utils';
import { Component } from '../base/Component';

export class Card extends Component<ICard> {
	protected _id: HTMLElement;
	protected _title: HTMLElement;
	protected _price: HTMLElement;
	protected _button?: HTMLButtonElement;

	constructor(
		container: HTMLElement,
		protected blockName?: string,
		actions?: ICardActions
	) {
		super(container);

		this._title = ensureElement<HTMLElement>(`.${blockName}__title`, container);
		this._price = ensureElement<HTMLElement>(`.${blockName}__price`, container);
		this._button = container.querySelector(`.${blockName}__button`);

		if (actions?.onClick) {
			if (this._button) {
				this._button.addEventListener('click', actions.onClick);
			} else {
				container.addEventListener('click', actions.onClick);
			}
		}
	}

	get id(): string {
		return this.container.dataset.id || '';
	}

	set id(value: string) {
		this.container.dataset.id = value;
	}

	get title(): string {
		return this._title.textContent || '';
	}

	set title(value: string) {
		this.setText(this._title, value);
	}

	set buttonText(value: string) {
		this._button.textContent = value;
	  }

	set price(value: number | null) {
		if (value === null) {
			this.setText(this._price, `Бесценно`);
		} else {
			this.setText(this._price, `${value} синапсов`);
		}
		
		if (this._button && value === null) {
			this._button.disabled = true;
		}
	}
}
