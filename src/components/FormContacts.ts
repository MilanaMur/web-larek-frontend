import { IOrder } from '../types';
import { IEvents } from './base/events';
import { Form } from './common/Form';

export class FormContacts extends Form<Partial<IOrder>> {
    protected _emailInput: HTMLInputElement;
    protected _phoneInput: HTMLInputElement;

    constructor(container: HTMLFormElement, events: IEvents) {}

    set email(value: string) {}

    set phone(value: string) {}
}
