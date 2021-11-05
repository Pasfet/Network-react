# Getting start

Если перейти по ссылке [из описания](http://social-net-react.ru), то после перезагрузки будет ошибка 404, это связанно с тем, что статика загружается без обработки путей :(

В папке "Backend" ввдеите `npm install`, а в папке "Frontend" введите `yarn install`.

## Available Scripts

### Backend

#### `npm run start`

Запустится сервер на порту [http://localhost:3001](http://localhost:3001) \
Так же запустится веб-сокет сервер на порту 8999.

#### `npm run start-server`

Запустит сервер на порту [http://localhost:3001](http://localhost:3001)

#### `npm run start-ws`

Запустит веб-сокет сервер на порту 8999

#### `npm run dev`

Запустит сервер на порту в режиме разработки [http://localhost:3001](http://localhost:3001)

### Frontend

#### `yarn start`

Запустит приложение в режиме разработки на [http://localhost:3000](http://localhost:3000)

#### `yarn build`

Соберет проект для деплоя.

#### `yarn test`

Запустит режим тестирования

#### `yarn test -- --coverage`

Запустит режим тестирования с покрытием кода
