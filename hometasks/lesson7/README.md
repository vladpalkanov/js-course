# Ссылки

- https://reacttraining.com/react-router/web/guides/quick-start
- (EN) https://www.youtube.com/watch?v=110dW3l5GQY
- (EN) https://medium.com/the-andela-way/understanding-the-fundamentals-of-routing-in-react-b29f806b157e

# Домашнее задание

## Задание 1

Создайте страницы, соответствующие следующим pathname:
- `/users` - список пользователей
- `/users/:id` (напр. `/users/14d1cb14-e427-49e0-91de-73df225a2970`) - страница деталей пользователя
- `/users/:id/edit` - страница редактирования пользователя
- `/users/new` - страница добавления нового пользователя

## Задание 2
- отрисуйте на странице `/users` список пользователей (см. lesso6-app)
- по клику на имя пользователя, должна открываться страница `/users/:id`, пока на ней выведите заголовок
```User: ${id}```
который нужно взять из `match.params`

## Задание 3
- отрисуйте на странице `/users/new` форму добавления пользователя (см lesson5-app), где можно ввести имя, email, телефон и оставить заметку о пользователе (используйте textarea). На данном этапе нет необходимости добавлять поведение формы при submit.


## Задание 4
- отрисуйте на странице `/users/:id/edit` форму редактирования пользователя (см lesson5-app), где можно отредактировать имя, email, телефон и оставить заметку о пользователе (используйте textarea). На данном этапе нет необходимости добавлять поведение формы при submit, а также предзаполнение данными.