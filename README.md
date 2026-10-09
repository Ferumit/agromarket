# АгроМаркет

Витрина фермерских продуктов. Учебный проект по дисциплине «Fullstack-разработка».

Следующие этапы проекта лежат в отдельных репозиториях:
[agromarket-react](https://github.com/Ferumit/agromarket-react) — frontend (лаб. 3–7),
[agromarket-server](https://github.com/Ferumit/agromarket-server) — backend (лаб. 5–7).
Файл `db.json` отсюда используют лабораторные 3–4 (json-server) и лабораторная 5 (копия в `agromarket-server/data`).

## Запуск

```bash
# окно 1 — fake-сервер данных, http://localhost:3001/products
npx json-server --watch db.json --port 3001

# окно 2 — открыть index.html через Live Server (VS Code)
```

JSON Server 1.x следит за файлом и без `--watch` и пишет об этом в консоли,
флаг можно опустить: `npx json-server db.json --port 3001`.

## Лабораторная 1 — статичная разметка

`index.html` и `style.css`: шапка с меню, каталог из четырёх карточек, блок «О нас» и подвал.

> Текст задания лабораторной 1 не прилагался: разметка восстановлена как основа
> для лабораторной 2, которая начинается с `index.html` и `style.css`.

## Лабораторная 2 — DOM, Fetch API, json-server

- `db.json` — 12 товаров (`id`, `name`, `category`, `price`, `unit`, `image`), json-server отдаёт их по адресу `/products`;
- в `index.html` вместо карточек пустой `<section class="catalog">`, карточки строит `script.js`;
- счётчик корзины в шапке (`#cart-count`): обработчик клика вешается на кнопку сразу при создании карточки;
- обработка ошибок: если json-server не запущен, в каталоге появляется сообщение вместо белого экрана.

### Что происходит в loadProducts()

1. `fetch('http://localhost:3001/products')` отправляет HTTP-запрос `GET` на json-server и возвращает промис.
   `await` ждёт ответа, не блокируя страницу.
2. `fetch` не считает ошибкой статусы 404/500, поэтому проверяем `response.ok` и сами выбрасываем ошибку.
3. `await response.json()` читает тело ответа и превращает JSON-текст в массив объектов.
4. `renderProducts(products)` проходит по массиву `forEach`, для каждого товара создаёт `<article class="card">`
   через `document.createElement`, заполняет `innerHTML`, вешает обработчик на кнопку «В корзину»
   и добавляет карточку в `.catalog` через `appendChild`.
5. Если сервер недоступен, `fetch` выбрасывает исключение, и `catch` выводит сообщение об ошибке.
