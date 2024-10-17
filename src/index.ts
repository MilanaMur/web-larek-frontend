import './scss/styles.scss';

import { AdditionalApi } from './components/AdditionalApi';
import { EventEmitter } from './components/base/events';
import { API_URL, CDN_URL } from './utils/constants';
import { Page } from './components/Page';
import { Modal } from './components/common/Modal';
import { cloneTemplate, ensureElement } from './utils/utils';
import { Basket } from './components/Basket';
import { IItem, IOrderModel, TPayment } from './types';
import { AppState } from './components/AppState';
import { FormContacts, FormOrder } from './components/Forms';
import { BasketCard, CatalogCard, CatalogCardView } from './components/Cards';
import { ModalSuccess } from './components/ModalSuccess';

const events = new EventEmitter();
const api = new AdditionalApi(CDN_URL, API_URL);

const cardCatalogTemplate = ensureElement<HTMLTemplateElement>('#card-catalog');
const cardViewTemplate = ensureElement<HTMLTemplateElement>('#card-preview');
const cardBasketTemplate = ensureElement<HTMLTemplateElement>('#card-basket');
const basketTemplate = ensureElement<HTMLTemplateElement>('#basket');
const formOrderTemplate = ensureElement<HTMLTemplateElement>('#order');
const formContactsTemplate = ensureElement<HTMLTemplateElement>('#contacts');
const modalSuccessTemplate = ensureElement<HTMLTemplateElement>('#success');

const page = new Page(document.body, events);
const modal = new Modal(ensureElement<HTMLElement>('#modal-container'), events);

const appData = new AppState({}, events);

const basket = new Basket(cloneTemplate(basketTemplate), events);
const formOrder = new FormOrder(cloneTemplate(formOrderTemplate), events);
const formContacts = new FormContacts(
	cloneTemplate(formContactsTemplate),
	events
);
const success = new ModalSuccess(cloneTemplate(modalSuccessTemplate), {
	onClick: () => {
		modal.close();
	},
});

api
	.getItemsList()
	.then((items) => {
		appData.setCatalog(items as IItem[]);
	})
	.catch((err) => console.log(err));

events.on('catalog:changed', () => {
	page.catalog = appData.catalog.map((item) => {
		const card = new CatalogCard(cloneTemplate(cardCatalogTemplate), 'card', {
			onClick: () => events.emit('card:select', item),
		});

		return card.render({
			title: item.title,
			image: item.image,
			category: item.category,
			price: item.price,
		});
	});
});

events.on('basket:changed', () => {
	basket.total = appData.getTotal();

	basket.list = appData.basket.map((item, index) => {
		const basketCard = new BasketCard(cloneTemplate(cardBasketTemplate), {
			onClick: () => {
				events.emit('card:deleteFromBasket', item);
			},
		});

		return basketCard.render({
			title: item.title,
			price: item.price,
			index: index + 1,
		});
	});
});

events.on('card:select', (item: IItem) => {
	const isInBasket = appData.isInBasket(item.id);
	const card = new CatalogCardView(cloneTemplate(cardViewTemplate), 'card', {
		onClick: () => {
			if (isInBasket) {
				events.emit('card:deleteFromBasket', item);
			} else {
				events.emit('card:toBasket', item);
			}
		},
	});

	modal.render({
		content: card.render({
			title: item.title,
			image: item.image,
			category: item.category,
			description: item.description,
			price: item.price,
			buttonText: isInBasket ? 'Удалить из корзины' : 'В корзину',
		}),
	});
});

events.on('card:toBasket', (item: IItem) => {
	appData.addToBasket(item);
	events.emit('сounter:change');
	modal.close();
});

events.on('card:deleteFromBasket', (item: IItem) => {
	appData.removeFromBasket(item);
	events.emit('сounter:change');
});

events.on('сounter:change', () => {
	page.counter = appData.countItems();
});

events.on('basket:open', () => {
	modal.render({
		content: basket.render(),
	});
});

events.on('basket:makeOrder', () => {
	modal.render({
		content: formOrder.render({
			payment: appData.orderInfo.payment,
			address: appData.orderInfo.address,
			valid: appData.validateOrder(),
			errors: [],
		}),
	});
});

events.on('formOrderErrors:change', (errors: Partial<IOrderModel>) => {
	const { payment, address } = errors;
	formOrder.valid = !payment && !address;
	formOrder.errors = Object.values({ payment, address })
		.filter((i) => !!i)
		.join('; ');
});

events.on('formContactsErrors:change', (errors: Partial<IOrderModel>) => {
	const { email, phone } = errors;
	formContacts.valid = !email && !phone;
	formContacts.errors = Object.values({ email, phone })
		.filter((i) => !!i)
		.join('; ');
});

events.on(
	'input:change',
	(data: { field: keyof IOrderModel; value: string }) => {
		appData.setOrderField(data.field, data.value);
	}
);

events.on('order:submit', () => {
	modal.render({
		content: formContacts.render({
			email: appData.orderInfo.email,
			phone: appData.orderInfo.phone,
			valid: appData.validateContacts(),
			errors: [],
		}),
	});
});

events.on('contacts:submit', () => {
	const total = appData.getTotal();
	const items = appData.getItemIDs();

	api
		.sendOrder(appData.orderInfo, total, items)
		.then((res) => {
			appData.clearBasket();
			appData.clearOrderInfo();
			events.emit('сounter:change');

			modal.render({
				content: success.render({
					total: res.total,
				}),
			});
		})
		.catch((err) => {
			console.error(err);
		});
});

events.on('modal:open', () => {
	page.locked = true;
});

events.on('modal:close', () => {
	page.locked = false;
});
