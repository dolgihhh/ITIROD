# Сайт "Аренда квартир"


## Функциональные возможности

- Авторизация/Регистрация 
- Сортировка объявлений о квартирах
- Добавление объявлений в избранное/удаление из избранного
- Изменение информации о пользователе
- Добавление/удаление собственных объявлений
- Просмотр подробной информации о квартире


## Описание сущностей (таблиц)

## user (Пользователь)
|имя поля | тип | ограничения | описание |
|:---:|:---:|:---:|:---:|
| id | pk(INT) | auto increment; not null; unique | первичный ключ |
| name | VARCHAR(100) | not null | имя пользователя |
| email | VARCHAR(50) | unique; not null | почта пользователя |
| password | VARCHAR(255) | not null | пароль пользователя |


## flat (Квартира)
|имя поля | тип | ограничения | описание |
|:---:|:---:|:---:|:---:|
| id | pk(INT) | auto increment; not null; unique | первичный ключ |
| user_id | fk(INT) | not null | пользователь |
| city | VARCHAR(50) | not null | город |
| adress | VARCHAR(50) | not null | адрес |
| rooms | INT | not null | количество комнат |
| area | INT | not null | площадь |
| price | INT | not null | цена |
| phone_number | VARCHAR(13) | not null | номер владельца |
| owner_name | VARCHAR(25) | not null | имя владельца |
| photo_url | VARCHAR(300) | not null | путь на фото квартиры |
| description | VARCHAR(300) | not null | описание |


## favourite_flat (Понравившаяся квартира)
|имя поля | тип | ограничения | описание |
|:---:|:---:|:---:|:---:|
| user_id | fk(INT) | not null | пользователь |
| flat_id | fk(INT) | not null | квартира |


## Макет
https://www.figma.com/file/IvWnUe1Mq7iJ1oBWEizU4z/Untitled?node-id=0-1&t=nUEPe41eHZfSsW6h-0