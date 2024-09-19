import { IOrder } from '../types';
import { Form } from './common/Form';

export class FormOrder extends Form<Partial<IOrder>> {
    protected _onlineBtn: HTMLButtonElement;
    protected _cashBtn: HTMLButtonElement;
    protected _addressInput: HTMLInputElement;

    constructor(container: HTMLFormElement, events: IEvents) {}

    set valid(value: boolean) {}
}
