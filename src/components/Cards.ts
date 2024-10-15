import { ICardActions } from '../types';
import { ensureElement } from '../utils/utils';
import { Card } from './common/Card';

export class CatalogCard extends Card {
	protected _category: HTMLElement;
	protected _categoryClass: Record<string, string> = {
		'дополнительное': 'additional',
		'софт-скил': 'soft',
		'кнопка': 'button',
		'хард-скил': 'hard',
		'другое': 'other',
	};
	protected _image: HTMLImageElement;
	protected _selected: boolean;

	constructor(
		container: HTMLElement,
		protected blockName?: string,
		actions?: ICardActions
	) {
		super(container, blockName, actions);

		this._image = ensureElement<HTMLImageElement>(
			`.${blockName}__image`,
			container
		);
		this._category = container.querySelector(`.${blockName}__category`);
	}

	set category(value: string) {
		this._category.textContent = value;
		this._category.className = `card__category card__category_${this._categoryClass[value]}`;
	}

	set image(value: string) {
		this.setImage(this._image, value);
	}
}

export class CatalogCardView extends CatalogCard {
	protected _description: HTMLElement;

	constructor(
		container: HTMLElement,
		protected blockName?: string,
		actions?: ICardActions
	) {
		super(container, 'card', actions);

		this._description = ensureElement<HTMLElement>(
			`.${blockName}__text`,
			container
		);
	}

	set description(value: string | string[]) {
		if (Array.isArray(value)) {
			this._description.replaceWith(
				...value.map((str) => {
					const descTemplate = this._description.cloneNode() as HTMLElement;
					this.setText(descTemplate, str);
					return descTemplate;
				})
			);
		} else {
			this.setText(this._description, value);
		}
	}
}

export class BasketCard extends Card {
	protected _index: HTMLElement;

	constructor(container: HTMLElement, actions?: ICardActions) {
		super(container, 'card', actions);

		this._index = ensureElement<HTMLElement>(`.basket__item-index`, container);
		this._button = ensureElement<HTMLButtonElement>(
			`.basket__item-delete`,
			container
		);
	}

	set index(value: number) {
		this.setText(this._index, value);
	}
}
