## Домашнее задание

### Задание 1

Используя код приложения, который находтся в папке `./lesson5-app` добавить возможность валидации HOC-у `withForm()`:

`withForm()` является карированным HOC-ом, первый аргумент которого - это `config` - конфигурация нашего HOC-а:

```jsx
const withForm = config => // это и есть конфиг
  BaseComponent => {       // а вот тут начинается сам HOC
    return class WithForm extends React.Component {
      /**  your code **/
    }
  };
```

Следственно, оборачиваем наш компонент формы `<LoginForm />` в `withForm()` следующим образом:

```jsx
const LoginFormView = props => {
  return (
    /** your code */
  );
};

const enhancer = withForm(config);

const LoginForm = enhancer(LoginFormView);
```

либо без промежуточной переменной:

```jsx
const LoginForm = withForm(config)(LoginFormView);
```

а если через функцию compose:

```jsx
const enhancer = compose(
  anotherHOC1,
  anotherHOC2,
  withForm(config),
  anotherHOC3,
  anotherHOC4,
)
```

где `anotherHOC` - и, это другие HOC-и, которые могли бы быть в теории в вашем приложении.

`config` - это объект, который (пока что) содержит всего 1 свойство - `validation`:

```jsx
const config = { validation };
```

а `validation` - это объект, где ключом является `name` поля формы, а значением - функция вида
```jsx
values => {
  return /** your code */
}
```
где `values` - это **все** значения формы.

Возвращает функция `errorMessage: string`, если в значении поля содержится ошибка валидации, или `null`, если значение поля валидно.

Таким образом, объект валидации может выглядеть так:
```jsx
const validation = {
  email: values => {
    if (!values.email) {
      return 'Required';
    } else if (!testEmail(values.email)) {
      return 'Invalid email';
    }

    return null;
  },
  // your code
}
```

Далее внутри HOC-а `withForm()`, при изменении определенного поля формы, необходимо использовать `config.validation[name]` для получения функции-валидатора, проверки значения на валидность.

Если поле не валидно, ошибку необходимо сохранить в `this.state.error` и прокинуть через `props`-ы нашим полям формы.

### Задание 2

По материалам и коду предыдущих уроков и ссылкам в них подготовиться к тесту, который будет во вторник.
