import { IFormState } from '../../types';
import { Component } from '../base/Component';
import { IEvents } from '../base/events';

export class Form<T> extends Component<IFormState> {
	protected _submitButton: HTMLButtonElement;
	protected _errors: HTMLElement;

	constructor(
		protected container: HTMLFormElement,
		protected events: IEvents
	) {}

	protected onInputChange(field: keyof T, value: string): void {}

	set valid(value: boolean) {}

	set errors(value: string) {}

	render(state: Partial<T> & IFormState): HTMLElement {}

	clearForm() {}
}
