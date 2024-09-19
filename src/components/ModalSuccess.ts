import { ISuccess, ISuccessActions } from "../types";
import { Component } from "./base/Component";

export class ModalSuccess extends Component<ISuccess> {
    protected _closeBtn: HTMLButtonElement;
    protected _total: HTMLElement;

    constructor(container: HTMLElement, actions: ISuccessActions) {}

    set total(value: number) {}
}