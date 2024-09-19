import { ICard, ICardActions } from '../../types';
import { Component } from '../base/Component';

export class Card extends Component<ICard> {
	protected _id: HTMLElement;
	protected _title: HTMLElement;
	protected _image?: HTMLImageElement;
	protected _description?: HTMLElement;
	protected _category?: HTMLElement;
	protected _price?: HTMLElement;
	protected _button?: HTMLButtonElement;

	constructor(
		protected blockName: string,
		container: HTMLElement,
		actions?: ICardActions
	) {}

	get id(): string {}

	set id(value: string) {}

    get title(): string {}

	set title(value: string) {}

	set image(value: string) {}

    set description(value: string) {}

	set category(value: string) {}

	set price(value: number | null) {}
}
