# HOC

## Ссылки

- https://medium.com/@abraztsov/%D0%BF%D0%B0%D1%82%D1%82%D0%B5%D1%80%D0%BD%D1%8B-%D0%B2-react-e5092c06f019
- (EN) https://medium.com/@dan_abramov/smart-and-dumb-components-7ca2f9a7c7d0
- https://learn.javascript.ru/decorators
- https://ru.reactjs.org/docs/higher-order-components.html#___gatsby
- https://habr.com/ru/company/ruvds/blog/428572/
- если забыли замыкания https://www.youtube.com/watch?v=rpIxGwFz0Xs
- https://ru.reactjs.org/docs/uncontrolled-components.html
- https://learn.javascript.ru/currying-partials

## Домашнее задание

### Задание №1

Переделайте `<Input />` из предыдущего задания таким образом, чтобы он был чистым controled Presentation-компонентом и работал только с пропами `value`, `error`, `onChange()`

### Задание №2

Создайте hoc withValidation, это каррированная функция, которая помимо всего почего принимает `validationRuleFn` как аргумент, а возвращает hoc, который при помощи `validationRuleFn` и `this.props.value` добавляет проп `error` `BaseComponent`-у:

```jsx
const requiredValidationFn = value => !value;

const emailValidationFn = value => {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    return re.test(String(value).toLowerCase())
}

const withValidation = validationRuleFn => BaseComponent => {
  return class WithValidation extends React.Component {
    render() {
      // your code
    }
  }  
}

const withEmailValidation = withValidation(emailValidationFn);
const withRequiredValidation = withValidation(requiredValidationFn);

const enhancer = compose(
  withEmailValidation,
  withRequiredValidation,
);

const EnhancedInput = enhancer(Input);
```

Также `<EnhancedInput />` необходимо отрисовать в `App.js` и убедиться, что он работает.

### Задание 3

Создать декоратор `debounce`, аналогичный такому же из `lodash`:

```js
const debounce = fn => {
  // your code
  return (...args) => {
    // your code
  }
}
```

### Задание 4

Создать hoc каррированый `withDebounce`, который принимает на вход timeout и BaseComponent и будет оборачивать проп onChange в декоратор `debounce` и прокидывать в `<BaseComponent />` (вспомните `static getDerivedStateFromProps()`)

```jsx
const withDebounce = timeout => BaseComponent => {
  return class WithDebounce extends React.Component {
    state = {
      // your code
    }

    static getDerivedPropsFromState() {
      // your code
    }

    render() {
      // your code
    }
  }
}
```

```jsx
const withEmailValidation = withValidation(emailValidationFn);
const withRequiredValidation = withValidation(requiredValidationFn);
const withDebounce300ms = withDebounce(300);

const enhancer = compose(
  withDebounce300ms,
  withEmailValidation,
  withRequiredValidation,
);

const EnhancedInput = enhancer(Input);
```

Также композицию можно сделать следующим образом:

```jsx
const enhancer = compose(
  withDebounce(300),
  withValidation(emailValidationFn),
  withValidation(requiredValidationFn),
);

const EnhancedInput = enhancer(Input);
```