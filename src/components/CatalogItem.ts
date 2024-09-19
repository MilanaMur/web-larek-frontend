import { ICardActions } from '../types';
import { Card } from './common/Card';

export class CatalogItem extends Card {
	protected _category: HTMLElement;
	protected _categoryClass: Record<string, string> = {
		'софт-скил': 'soft',
		'хард-скил': 'hard',
		'кнопка': 'button',
		'дополнительное': 'additional',
        'другое': 'other'
	};
    protected _image: HTMLImageElement;

	constructor(
		protected blockName: string,
		container: HTMLElement,
		actions?: ICardActions
	) {}

    set category(value: string) {}

    set image(value: string) {}
}
