import { Component } from '../base/Component';
import { IModalData } from '../../types';
import { IEvents } from '../base/events';
import { ensureElement } from '../../utils/utils';

export class Modal extends Component<IModalData> {
	protected _content: HTMLElement;
	protected _button?: HTMLButtonElement;

	constructor(container: HTMLElement, protected events: IEvents) {
		super(container);
		this._button = ensureElement<HTMLButtonElement>('.modal__close', container);
		this._content = ensureElement<HTMLElement>('.modal__content', container);

		this._button.addEventListener('click', this.close.bind(this));
		this.container.addEventListener('click', this.close.bind(this));
		this._content.addEventListener('click', (event) => event.stopPropagation());
	}

	set content(value: HTMLElement) {
		if (value) {
			this._content.replaceChildren(value);
		}
	}

	open(): void {
		this.container.classList.add('modal_active');
		this.events.emit('modal:open');
	}

	close(): void {
		this.container.classList.remove('modal_active');
		this.content = null;
		this.events.emit('modal:close');
	}

	render(data: IModalData): HTMLElement {
		super.render(data);
		this.open();
		return this.container;
	}
}
