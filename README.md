# Проектная работа "Веб-ларек"

Стек: HTML, SCSS, TS, Webpack

Структура проекта:

- src/ — исходные файлы проекта
- src/Component<T>s/ — папка с JS компонентами
- src/Component<T>s/base/ — папка с базовым кодом

Важные файлы:

- src/pages/index.html — HTML-файл главной страницы
- src/types/index.ts — файл с типами
- src/index.ts — точка входа приложения
- src/styles/styles.scss — корневой файл стилей
- src/utils/constants.ts — файл с константами
- src/utils/utils.ts — файл с утилитами

## Установка и запуск

Для установки и запуска проекта необходимо выполнить команды

```
npm install
npm run start
```

или

```
yarn
yarn start
```

## Сборка

```
npm run build
```

или

```
yarn build
```

## Данные и типы

Главная страница
```typescript
interface IPage {
	counter: number;
	catalog: HTMLElement[];
	basket: HTMLElement;
}
```

Товар
```typescript
interface IItem {
	id: string;
	description: string;
	image: string;
	title: string;
	category: string;
	price: number | null;
}
```

Карточка товара
```typescript
interface ICard {
	id: string;
	description?: string;
	image?: string;
	title: string;
	category?: string;
	price: number | null;
}
```

Коллбек карточки
```typescript
interface ICardActions {
	onClick: (event: MouseEvent) => void;
}
```

Каталог товаров
```typescript
interface ICatalog {
	items: IItem[];
}
```

Корзина
```typescript
interface IBasket {
	items: IItem[];
}
```

Заказ
```typescript
interface IOrder {
	payment: TPayment;
	address: string;
	email: string;
	phone: string;
}
```

Содержание модального окна
```typescript
interface IModalData {
	content: HTMLElement;
}
```

Состояние формы
```typescript
interface IFormState {
	valid: boolean;
	errors: string[];
}
```

Сумма заказа при успешном оформлении
```typescript
interface ISuccess {
	total: number;
}
```

Коллбек модального окна успешного оформления заказа
```typescript
interface ISuccessActions {
	onClick: () => void;
}
```

Ответ сервера об успешном заказе
```typescript
interface IOrderResult {
	id: string;
	totalSum: number;
}
```

Тип оплаты заказа
```typescript
type TPayment = 'online' | 'cash';
```

## Архитектура
Код разделен на слои согласно парадигме MVP:

- Model - слой данных, отвечает за хранение и изменение данных.
- View - слой представления, отвечает за отображение данных на странице.
- Presenter - презентер, отвечает за взаимодействие слоя данных и слоя представления.

### Базовые компоненты

#### Класс Api
Содержит базовую логику отправки запросов.\
Конструктор принимает базовый адрес сервера и объект с заголовками запросов.\
_Методы_:
- `handleResponse(response: Response): Promise<object>` - обрабатывает ответ с сервера, принимает в параметры ответ сервера типа Response, возвращает промис.
- `get(uri: string)` - выполняет GET-запрос на переданный в параметрах адрес и возвращает промис с объектом, которым ответил сервер.
- `post(uri: string, data: object, method: ApiPostMethods = 'POST')` - По умолчанию выполняется POST-запрос на переданный в параметрах адрес с переданными данными в формате JSON в теле запроса. Метод запроса может быть переопределён путём передачи третьего параметра при вызове(`'PUT' | 'DELETE'`).

#### Класс EventEmitter
Класс используется в презентере для обработки событий и в слоях приложения для генерации событий.\
Конструктор класса инициализирует значение поля.\
_Методы_:
- `on<T extends object>(eventName: EventName, callback: (event: T) => void)` - устанавливает обработчик на указанное событие.
- `off(eventName: EventName, callback: Subscriber)` - удаляет обработчик с указанного события.
- `emit<T extends object>(eventName: string, data?: T)` - вызывает обработчик для определенного события.
- `onAll(callback: (event: EmitterEvent) => void)` - устанавливает обработчик, который будет вызываться для всех событий.
- `offAll()` - сбрасывает все обработчики событий.
- `trigger<T extends object>(eventName: string, context?: Partial<T>)` - создает функцию-колбек, генерирующую событие при вызове.

#### Класс Component<T>
Является абстрактным классом, позволяет управлять DOM-элементами.\
Конструктор класса принимает в параметры контейнер, в котором будет размещен элемент.\
_Методы_:
- `toggleClass(element: HTMLElement, className: string, force?: boolean)` - переключает класс элемента.
- `setText(element: HTMLElement, value: unknown)` - устанавливает текстовое содержимое элемента.
- `setDisabled(element: HTMLElement, state: boolean)` - переключает статус блокировки элемента.
- `setHidden(element: HTMLElement)` - скрывает элемент.
- `setVisible(element: HTMLElement)` - делает элемент видимым.
- `setImage(element: HTMLImageElement, src: string, alt?: string)` - устанавливает изображение.
- `render(data?: Partial<T>): HTMLElement` - возвращает корневой элемент после обновления данных.

### Компоненты слоя данных

#### Класс CatalogModel
Используется для работы с массивом всех товаров каталога.\
_Поле класса_ `items: IItems[]` хранит в себе массив объектов товаров.\
_Методы_:
- `addItem(item: IItem): void` - добавляет товар в массив.
- `deleteItem(id: string): void` - удаляет товар из массива.
- `getItem(id: number): IItem` - возвращает товар по его ID.
- `getItems(): IItem[]` - возвращает весь массив товаров.

#### Класс BacketModel
Используется для работы с массивом товаров, находящихся в корзине.\
_Поля класса_:
- `payment: TPayment;` - вид оплаты товара.
- `address: string;` - адрес заказа.
- `email: string;` - контактный email пользователя.
- `phone: string;` - контактный телефон пользователя.
- `items: IItem[];` - массив товаров.
- `totalSum: number;` - сумму заказа.\
  _Методы_:
- `addItem(item: IItem): void` - добавляет товар в массив корзины.
- `deleteItem(id: string): void` - удаляет товар из массива корзины.
- `getItem(id: number): IItem` - возвращает товар по его ID.
- `getItems(): IItem[]` - возвращает весь массив товаров из корзины.
- `getTotal(): number` - возвращает сумму всех товаров с корзины.

#### Класс AdditionalApi

Наследник класса `Api`. Реализует взаимодействие с сервером.\
В конструктор передается базовый адрес сервера и объект с заголовками запросов.\
_Методы_:
- `getItemsList(): Promise<IItem[]>` - возвращает список товаров с сервера.
- `getItem(id: string): Promise<IItem>` - возвращает один объект по его ID.
- `makeOrder(order: IOrder): Promise` - отправляет заказ на сервер.

### Компоненты слоя отображения

#### Класс Page
Наследник класса `Component<T>`. Реализует главную страницу.\
Конструктор принимает элемент-контейнер и функцию-коллбек.\
_Поля класса_:
- `counter: HTMLElement;` - элемент, отображающий количество товаров в заголовке у корзины.
- `catalog: HTMLElement;` - элемент, содержащий каталог товаров.
- `wrapper: HTMLElement;` - обёртка основной страницы.
- `basket: HTMLElement;` - элемент, представляющий корзину.\
_Методы_:
- Сеттер для `counter`.
- Сеттер для `catalog`.
- `setLocked(value: boolean) {}` - позволяет блокировать и разблокировать прокрутку страницы.

#### Класс Card
Наследник класса `Component<T>`. Реализует карточку товара.\
Конструктор принимает название блока, элемент-контейнер и брокер событий.\
_Поля класса_:
- `title: HTMLElement;` - название товара.
- `image?: HTMLImageElement;` - изображение к товару.
- `description?: HTMLElement;` - описание товара.
- `category?: HTMLElement;` - категория товара.
- `price?: HTMLElement;` - цена товара.
- `button?: HTMLButtonElement;` - кнопка для добавления в корзину.\
_Методы_:
- Геттер и сеттер для `id`.
- Геттер и сеттер для `title`.
- Сеттер для `image`.
- Сеттер для `description`.
- Сеттер для `category`.
- Сеттер для `price`.

#### Класс CatalogItem
Наследник класса `Card`. Реализует наполнение каталога карточками и их отрисовку на главной странице.\
Конструктор принимает название блока, элемент-контейнер и функцию-коллбек.\
_Поля класса_:
- `category` - категория товара.
- `categoryClass` - объект с разными категориями.
- `image` - изображение к товару.\
_Методы_:
- Сеттер для `category`.
- Сеттер для `image`.

#### Класс CatalogItemView
Наследник класса `CatalogItem`. Реализует просмотр карточки товара с подробным описанием.\
Конструктор принимает элемент-контейнер и функцию-коллбек.\
_Поле класса_ `description` содержит описание карточки товара.\
_Метод_ сеттер для `description`.

#### Класс BasketItem
Наследник класса `Card`. Реализует карточку в корзине.\
Конструктор принимает элемент-контейнер и функцию-коллбек.\
_Поля класса_:
- `id: HTMLElement;` - идентификатор товара.
- `index: HTMLElement;` - номер товара в корзине.
- `title: HTMLElement;` - название товара.
- `price: HTMLElement;` - цена товара.
- `button: HTMLButtonElement;` - кнопка удаления товара из корзины.\
_Методы_:
- Геттер и сеттер для `id`.
- Геттер и сеттер для `title`.
- Сеттер для `index`.
- Сеттер для `price`.
- `setButtonAction(actions: ICardActions): void` - устанавливает коллбек на кнопку.
- `getItem(id: string): HTMLElement` - получение элемента по id.

#### Класс Basket
Наследник класса `Component<T>`. Реализует корзину.\
Конструктор принимает название блока, элемент-контейнер и брокер событий.\
_Поля класса_:
- `list: HTMLElement;` - список товаров.
- `total: HTMLElement;` - стоимость товаров.
- `button: HTMLButtonElement;` - кнопка оформления заказа.\
_Методы_:
- Сеттер для `total`.
- Геттер и сеттер для `list`.
- `disableButton(disabled: boolean): void {}` - блокировка кнопки при пустой корзине.

#### Класс Modal
Наследник класса `Component<T>`. Реализует модальное окно.\
Конструктор принимает элемент-контейнер и брокер событий.\
_Поля класса_:
- `_content: HTMLElement;` - содержимое модального окна.
- `_button?: HTMLButtonElement;` - кнопка закрытия модального окна.\
_Методы_:
- Сеттер для `content`.
- `open(): void` - открытие модального окна.
- `close(): void` - закрытие модального окна.
- `render(data: IModalData): HTMLElement` - обновление содержимого модального окна.

#### Класс Form
Наследник класса `Component<T>`. Реализует форму.\
Конструктор принимает элемент-контейнер и брокер событий.\
_Поля класса_:
- `_submitButton: HTMLButtonElement;` - кнопка отправки формы.
- `_errors: HTMLElement;` - ошибки валидации.\
_Методы_:
- `onInputChange(field: keyof T, value: string): void` - для отслеживания изменений значения в поле формы.
- Сеттер для `valid`.
- Сеттер для `errors`.
- `render(data: IModalData): HTMLElement` - обновление состояния формы.
- `clearForm()` - сброс значений полей формы.

#### Класс FormOrder
Наследник класса `Form`. Управляет формой заказа.\
Конструктор класса принимает шаблон формы и брокер событий.\
_Поля класса_:
- `onlineBtn: HTMLButtonElement;` - кнопка выбора онлайн оплаты.
- `cashBtn: HTMLButtonElement;` - кнопка выбора наличной оплаты.
- `addressInput: HTMLInputElement;` - поле ввода адреса.
_Метод_ сеттер для `valid`.

#### Класс FormContacts
Наследник класса `Form`. Управляет формой контактных данных.\
Конструктор класса принимает шаблон формы и брокер событий.\
_Поля класса_:
- `emailInput: HTMLInputElement;` - поле ввода контактного email'а.
- `phoneInput: HTMLInputElement;` - поле ввода контактного телефона.\
_Методы_:
- Сеттер для `email`.
- Сеттер для `phone`.

#### ModalSuccess
Наследник класса `Component<T>`. Управляет отображением окна успешного оформления заказа.\ 
Конструктор принимает элемент-контейнер и функцию-коллбек.\
_Поля класса_:
- `closeBtn` - кнопка закрытия.
- `total` - сумма за заказ.\
_Метод_ сеттер для `total`.

### События
