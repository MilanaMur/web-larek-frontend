import { Component } from '../base/Component';
import { IModalData } from '../../types';
import { IEvents } from '../base/events';

export class Modal extends Component<IModalData> {
	protected _content: HTMLElement;
	protected _button?: HTMLButtonElement;

	constructor(container: HTMLElement, protected events: IEvents) {}

	set content(value: HTMLElement) {}

	open(): void {}

	close(): void {}

	render(data: IModalData): HTMLElement {}
}
