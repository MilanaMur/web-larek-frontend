import { IFormState, IOrderModel } from '../types';
import { ensureElement } from '../utils/utils';
import { Component } from './base/Component';
import { IEvents } from './base/events';

export class Form<T> extends Component<IFormState> {
	protected _submitBtn: HTMLButtonElement;
	protected _errors: HTMLElement;

	constructor(protected container: HTMLFormElement, protected events: IEvents) {
		super(container);

		this._submitBtn = ensureElement<HTMLButtonElement>(
			'button[type=submit]',
			this.container
		);
		this._errors = ensureElement<HTMLElement>('.form__errors', this.container);

		this.container.addEventListener('input', (e: Event) => {
			const target = e.target as HTMLInputElement;
			const field = target.name as keyof T;
			const value = target.value;
			this.onInputChange(field, value);
		});

		this.container.addEventListener('submit', (e: Event) => {
			e.preventDefault();
			this.events.emit(`${this.container.name}:submit`);
		});
	}

	protected onInputChange(field: keyof T, value: string) {
		this.events.emit(`input:change`, {
			field,
			value,
		});
	}

	set valid(value: boolean) {
		this._submitBtn.disabled = !value;
	}

	set errors(value: string) {
		this.setText(this._errors, value);
	}

	render(state: Partial<T> & IFormState) {
		const { valid, errors, ...inputs } = state;
		super.render({ valid, errors });
		Object.assign(this, inputs);
		return this.container;
	}

	clearForm() {
		this.container.reset();
	}
}

export class FormOrder extends Form<Partial<IOrderModel>> {
	protected _onlineBtn: HTMLButtonElement;
	protected _cashBtn: HTMLButtonElement;
	protected _addressInput: HTMLInputElement;

	constructor(container: HTMLFormElement, events: IEvents) {
		super(container, events);

		this._onlineBtn = container.elements.namedItem('card') as HTMLButtonElement;
		this._cashBtn = container.elements.namedItem('cash') as HTMLButtonElement;
		this._addressInput = ensureElement<HTMLInputElement>(
			'input',
			this.container
		);

		this._onlineBtn.addEventListener('click', () => {
			this._onlineBtn.classList.add('button_alt-active');
			this._cashBtn.classList.remove('button_alt-active');
			this.onInputChange('payment', 'card');
		});

		this._cashBtn.addEventListener('click', () => {
			this._onlineBtn.classList.remove('button_alt-active');
			this._cashBtn.classList.add('button_alt-active');
			this.onInputChange('payment', 'cash');
		});
	}

	set address(value: string) {
		this._addressInput.value = value;
	}
}

export class FormContacts extends Form<Partial<IOrderModel>> {
	protected _emailInput: HTMLInputElement;
	protected _phoneInput: HTMLInputElement;

	constructor(container: HTMLFormElement, events: IEvents) {
		super(container, events);

		this._emailInput = container.elements.namedItem(
			'email'
		) as HTMLInputElement;
		this._phoneInput = container.elements.namedItem(
			'phone'
		) as HTMLInputElement;
	}

	set email(value: string) {
		this._emailInput.value = value;
	}

	set phone(value: string) {
		this._phoneInput.value = value;
	}
}
