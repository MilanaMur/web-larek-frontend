# Проектная работа "Веб-ларек"

Стек: HTML, SCSS, TS, Webpack

Структура проекта:

- src/ — исходные файлы проекта.
- src/components/ — папка с TS компонентами.
- src/components/base/ — папка с базовым кодом.

Важные файлы:

- src/pages/index.html — HTML-файл главной страницы.
- src/types/index.ts — файл с типами.
- src/index.ts — точка входа приложения.
- src/scss/styles.scss — корневой файл стилей.
- src/utils/constants.ts — файл с константами.
- src/utils/utils.ts — файл с утилитами.

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

## Архитектура
Код разделен на слои согласно парадигме MVP:

- Model - слой данных, отвечает за хранение и изменение данных.
- View - слой представления, отвечает за отображение данных на странице.
- Presenter - слой презентера, отвечает за взаимодействие слоя данных и слоя представления.

### Базовые компоненты

#### Класс Api
Содержит базовую логику отправки запросов.\
Конструктор принимает базовый адрес сервера и объект с заголовками запросов.\
_Методы_:
- `handleResponse(response: Response): Promise<object>` - обрабатывает ответ с сервера, принимает в параметры ответ сервера типа Response, возвращает промис.
- `get(uri: string)` - выполняет GET-запрос на переданный в параметрах адрес и возвращает промис с объектом, которым ответил сервер.
- `post(uri: string, data: object, method: ApiPostMethods = 'POST')` - По умолчанию выполняется POST-запрос на переданный в параметрах адрес с переданными данными в формате JSON в теле запроса. Метод запроса может быть переопределён путём передачи третьего параметра при вызове(`'PUT' | 'DELETE'`).

#### Класс Component<T>
Является абстрактным классом, позволяет управлять DOM-элементами.\
Конструктор принимает элемент-контейнер.\
_Методы_:
- `toggleClass(element: HTMLElement, className: string, force?: boolean)` - переключает класс элемента.
- `setText(element: HTMLElement, value: unknown)` - устанавливает текстовое содержимое элемента.
- `setDisabled(element: HTMLElement, state: boolean)` - переключает статус блокировки элемента.
- `setHidden(element: HTMLElement)` - скрывает элемент.
- `setVisible(element: HTMLElement)` - делает элемент видимым.
- `setImage(element: HTMLImageElement, src: string, alt?: string)` - устанавливает изображение.
- `render(data?: Partial<T>): HTMLElement` - возвращает корневой элемент после обновления данных.

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

#### Класс Model<T>
Является абстрактным классом. Базовый класс слоя данных.\
Конструктор принимает данные, которые частично соответсвуют обобщённому типу `<T>`, и брокер событий.\
_Метод_ `emitChanges(event: string, payload?: object)` вызывает обработчик изменения модели.

### Слой данных

#### Класс AdditionalApi
Наследник класса `Api`. Добавляет дополнительное взаимодействие с сервером.\
В конструктор передается базовый адрес сервера и объект с заголовками запросов.\
_Поле класса_ `cdn: string;` - базовый url для cdn.\
_Методы_:
- `getItemsList(): Promise<IItem[]>` - возвращает список товаров с сервера.
- `sendOrder(order: IOrderModel, total: number, id: string[]): Promise<IOrderResult>` - отправляет заказ на сервер.

#### Класс AppState
Наследник класса `Model<T>`. Представляет из себя модель состояния приложения, управляет каталогом товаров, корзиной и инфомацией о заказе.\
_Поля класса_:
- `catalog: IItem[];` - текущий каталог товаров.
- `basket: IItem[];` - корзина товаров.
- `orderInfo: IOrderModel;` - объект, предоставляющий данные по текущему заказу.
- `formErrors: FormErrors;` - хранит информацию об ошибках форм.\

_Методы_:
- `setCatalog(data: IItem[]): void;` - установка каталога.
- `addToBasket(item: IItem): void;` - добавление товара в корзину.
- `removeFromBasket(item: IItem): void;` - удаление товара из корзины.
- `clearBasket(): void;` - очистка корзины.
- `isInBasket(id: string): boolean;` - проверка товара по id на нахождение в корзине.
- `setPreview(item: IItem): void;` - генерирует событие выбора карточки для детального просмотра.
- `getTotal(): number;` - рассчитывает стоимость товаров в корзине.
- `countItems(): number;` - считает количество товаров в корзине.
- `getItemIDs(): string[];` - формирует массив id товаров из корзины.
- `setOrderField(field: keyof IOrderModel, value: string): void;` - записывает значение в поле заказа.
- `validateOrder(): void;` - валидация на наличие выбранного типа оплаты и заполненность адреса.
- `validateContacts(): void;` - валидация на заполненность полей email и телефон.
- `clearOrderInfo(): IOrderModel;` - сброс информации о заказе.

### Слой представления

#### Класс Page
Наследник класса `Component<T>`. Реализует отображение главной страницы и её изменение.\
Конструктор принимает элемент-контейнер и функцию-коллбек.\
_Поля класса_:
- `counter: HTMLElement;` - элемент, отображающий количество товаров в заголовке у корзины.
- `catalog: HTMLElement;` - элемент, содержащий каталог товаров.
- `wrapper: HTMLElement;` - элемент-обёртка.
- `basket: HTMLElement;` - элемент, представляющий корзину.
- `locked: boolean;` - статус блокировки прокрутки страницы.\

_Методы_:
- Сеттер для `counter`.
- Сеттер для `catalog`.
- Сеттер для `locked`.

#### Класс Card
Наследник класса `Component<T>`. Базово реализует карточку товара.\
Конструктор принимает элемент-контейнер, название блока и функцию-коллбек.\
_Поля класса_:
- `title: HTMLElement;` - название товара.
- `price: HTMLElement;` - цена товара.
- `button?: HTMLButtonElement;` - кнопка для добавления в корзину.\

_Методы_:
- Геттер для `id`.
- Геттер и сеттер для `title`.
- Сеттер для `buttonText`.
- Сеттер для `price`.

#### Класс CatalogCard
Наследник класса `Card`. Реализует наполнение каталога карточками и их отрисовку на главной странице.\
Конструктор принимает элемент-контейнер, название блока и функцию-коллбек.\
_Поля класса_:
- `category` - категория товара.
- `categoryClass` - объект с разными категориями.
- `image` - изображение к товару.\

_Методы_:
- Сеттер для `category`.
- Сеттер для `image`.

#### Класс CatalogCardView
Наследник класса `CatalogCard`. Реализует отрисовку карточки товара с подробным описанием.\
Конструктор принимает элемент-контейнер, название блока и функцию-коллбек.\
_Поле класса_ `description` содержит описание карточки товара.\
_Метод_ сеттер для `description`.

#### Класс BasketCard
Наследник класса `Card`. Реализует карточку в корзине и её отрисовку.\
Конструктор принимает элемент-контейнер и функцию-коллбек.\
_Поле класса_ `index: HTMLElement;` - номер товара в корзине.\
_Метод_ сеттер для `index`.

#### Класс Basket
Наследник класса `Component<T>`. Реализует отображение корзины и её содержимого.\
Конструктор принимает элемент-контейнер и брокер событий.\
_Поля класса_:
- `list: HTMLElement;` - список товаров.
- `total: HTMLElement;` - стоимость товаров.
- `button: HTMLButtonElement;` - кнопка оформления заказа.\

_Методы_:
- Сеттер для `total`.
- Сеттер для `list`.
- `disableButton(disabled: boolean): void` - блокировка кнопки при пустой корзине.

#### Класс Modal
Наследник класса `Component<T>`. Реализует отображение и закрытие модального окно.\
Конструктор принимает элемент-контейнер и брокер событий.\
_Поля класса_:
- `content: HTMLElement;` - содержимое модального окна.
- `button?: HTMLButtonElement;` - кнопка закрытия модального окна.\

_Методы_:
- Сеттер для `content`.
- `open(): void` - открытие модального окна.
- `close(): void` - закрытие модального окна.
- `render(data: IModalData): HTMLElement` - обновление содержимого модального окна.

#### Класс Form<T>
Наследник класса `Component<T>`. Базово реализует форму.\
Конструктор принимает элемент-контейнер и брокер событий.\
_Поля класса_:
- `submitBtn: HTMLButtonElement;` - кнопка отправки формы.
- `errors: HTMLElement;` - ошибки валидации.\

_Методы_:
- Сеттер для `valid`.
- Сеттер для `errors`.

#### Класс FormOrder
Наследник класса `Form<T>`. Управляет формой заказа.\
Конструктор класса принимает шаблон формы и брокер событий.\
_Поля класса_:
- `onlineBtn: HTMLButtonElement;` - кнопка выбора онлайн оплаты.
- `cashBtn: HTMLButtonElement;` - кнопка выбора наличной оплаты.
- `addressInput: HTMLInputElement;` - поле ввода адреса.\

_Метод_ сеттер для `address`.

#### Класс FormContacts
Наследник класса `Form<T>`. Управляет формой контактных данных.\
Конструктор класса принимает шаблон формы и брокер событий.\
_Поля класса_:
- `emailInput: HTMLInputElement;` - поле ввода контактного email'а.
- `phoneInput: HTMLInputElement;` - поле ввода контактного телефона.\

_Методы_:
- Сеттер для `email`.
- Сеттер для `phone`.

#### Класс ModalSuccess
Наследник класса `Component<T>`. Управляет отображением окна успешного оформления заказа.\ 
Конструктор принимает элемент-контейнер и функцию-коллбек.\
_Поля класса_:
- `closeBtn: HTMLButtonElement;` - кнопка закрытия.
- `total: HTMLElement;` - сумма за заказ.\

_Методы_ сеттер для `total`.

### Слой презентера
Взаимодействие слоёв данных и представления происходит в файле `index.ts`.
События в проекте:
- `catalog:changed` - изменение списка товаров на главной странице.
- `basket:changed` - изменение списка товаров в корзине. 
- `card:select` - на странице кликом по карточке открывается модальное окно с подробным описанием товара.
- `card:toBasket` - кликом по кнопке "В корзину" выбранный товар добавляется в корзину.
- `card:deleteFromBasket` - в корзине кликом по кнопке удаления происходит удаление карточки из корзины либо в модальном окне подробного описания кликом по кнопке товар удаляется из корзины, если ранее был добавлен в неё.
- `сounter:change` - изменение числа товаров в счётчике.
- `basket:open` - открытие корзины кликом по кнопке на главной странице.
- `basket:makeOrder` - кликом по кнопке "Оформить" открывается окно с формой заказа (тип оплаты и адрес).
- `formOrderErrors:change` - обновляет состояние формы заказа в зависимости от текущих ошибок валидации.
- `formContactsErrors:change` - обновляет состояние формы контактных данных в зависимости от текущих ошибок валидации.
- `input:change` - реагирует на изменения ввода данных в полях форм.
- `order:submit` - кликом по кнопке "Далее" открывается окно с формой контактных данных.
- `contacts:submit` - кликом по кнопке "Оплатить" информация о заказе отправляется на сервер. При успешной обработке заказа открывается модальное окно с сообщением об успешной покупке.
- `modal:open` - открытие модального окна.
- `modal:close` - закрытие модального окна кликом по кнопке либо оверлею.