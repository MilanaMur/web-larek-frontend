import { Component } from './base/Component';
import { IEvents } from './base/events';
import { IPage } from '../types/index';
// import { ensureElement } from '../utils/utils';

export class Page extends Component<IPage> {
	protected _counter: HTMLElement;
	protected _catalog: HTMLElement;
	protected _wrapper: HTMLElement;
	protected _basket: HTMLElement;

	constructor(container: HTMLElement, protected events: IEvents) {}

	set counter(value: number) {}

	set catalog(items: HTMLElement[]) {}

	setLocked(value: boolean) {}
}
