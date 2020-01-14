# Введение в React

## Установка

- установите [React Dev Tools](https://chrome.google.com/webstore/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi?hl=ru) для Chrome

- React - это надстройка над JavaScript, как минимум из-за JSX. Для того, чтобы использовать код React-приложения в браузере нужно _транспилировать_ его в JavaScript. Например, с помощью [Babel](https://babeljs.io/).

- Мы не будем настраивать транспиляцию и сборку приложения сами(например при помощи инструментов [Webpack](https://webpack.js.org/) или [Rollup](https://rollupjs.org/guide/en/)), а воспользуемся разработкой создателей React - [create-react-app](https://ru.reactjs.org/docs/create-a-new-react-app.html).

- Для установки используйте менеджер пакетов [npm](https://www.npmjs.com/). Пакетные менеджеры существуют для большинства платформ. Например для Python существует [pip](https://ru.wikipedia.org/wiki/Pip_(%D0%BC%D0%B5%D0%BD%D0%B5%D0%B4%D0%B6%D0%B5%D1%80_%D0%BF%D0%B0%D0%BA%D0%B5%D1%82%D0%BE%D0%B2)), а для Objective-C разработки - [CocoaPods](https://cocoapods.org/), и [другие](https://blog.versioneye.com/2014/01/15/which-programming-language-has-the-best-package-manager/). [Google Play](https://play.google.com/store?hl=ru) - также своего рода пакетный менеджер.

```javascript
// Вы можете установить **create-react-app** как глобально
npm i -g create-react-app
// и использовать следующим образом
create-react-app app-name
// так и с помощью одной из следующих команд, 
// тогда он установится автоматически
npx create-react-app app-name
npm init react-app my-app
yarn create react-app my-app
```

- откройте папку, которая создалась, в редакторе. Вы увидите несколько папок и файлов.

  - **/node_modules** - папка со всеми зависимостями
  - **package.json** - npm считает, что все ваши файлы - это файлы вашего npm-модуля, а package.json содержит информацию о нем, его зависимостях и командах. Также используемые модули могут хранить свою информацию в этом файле.
  - **/src** - папка с исходниками вашего приложения
  - **public** - папка с **index.html**, а также транспилированым js, стилями, favicon и прочим.

- Заметим, что **index.html** в `body` содержит всего один DOM-узел, именно в него будет отрисовано наже React-приложение

```html
<div id="root"></div>
```

- **/src/index.js** как раз и отрисовывает `<App />` в данный узел. [Подробнее об отрисовке](https://ru.reactjs.org/docs/rendering-elements.html) и [о JSX](https://ru.reactjs.org/docs/introducing-jsx.html)
```jsx
ReactDOM.render(<App />, document.getElementById('root'));
```

- **/src/App.js** является корневым компонентом нашего приложения. Это значит, что в нем мы рендерим остальные компоненты нашего приложения. [Видео о том, что такое компоненты](https://www.youtube.com/watch?v=ol4OVMJZC1w) и [статья](https://ru.reactjs.org/docs/components-and-props.html)

- остальные файлы нас пока не интересуют

## Добавление компонентов

- Предлагаю добавить список User-ов. Для этого создадим папку `components`, а в ней файл `UserList.jsx` со следующим содержимым([списки и ключи](https://ru.reactjs.org/docs/lists-and-keys.html)). Компонент UserList является компонентом-классом и имеет 1 проп - items:

```jsx
import React from 'react'
import { User } from './User'

export class UserList extends React.Component {
  render() {
    const items = this.props.items;

    return (
      <div>
        {items.map(item => <User {...item} />)}
      </div>
    );
  }
}
```

- так как наш список использует компонент User, то его нужно создать и импортировать. [модули](https://learn.javascript.ru/modules)>. Не забывайте, что компоненты можно также реализовать через функции.

```jsx
import React from 'react'

export const User = props => {
  return (
    <div>
      <h2>Name: {props.name}</h2>
      <div>Age: {props.age}</div>
      <div>Sex: {props.sex}</div>
    </div>
  )
}
```

- измените свой App.js следующим образом
```jsx
import React from 'react';
import './App.css';
import { UserList } from './components/UserList';

const users = [
  {
    name: 'Name1',
    age: Math.round(Math.random() * 100),
    sex: 'male',
  },
  {
    name: 'Name2',
    age: Math.round(Math.random() * 100),
    sex: 'female',
  }
]

function App() {
  return (
    <div>
      <UserList items={users} />
    </div>
  );
}

export default App;

```

## Домашнее задание

Используя App.css добавьте стилей для вашего интерфейса. В будущем UserList должен выглядеть как таблица пользователей с ячейками. Также, если необходимо, используйте другие React-элементы в ваших компонентах помимо h3 и div. Разметку также можно менять.

Далее нужно будет запушить ваш код в ваши репозитории на github и скинуть ссылку [о Git](https://proglib.io/p/git-for-half-an-hour/)

Напоминаю, что node_modules должен быть в .gitignore

Также стоит сказать, что JSX не поддежривает аттрибут `class=`, вместо этого используйте `className=`

## Ссылки
- https://ru.reactjs.org/
- https://youtu.be/xJZa2_aldDs
- https://www.youtube.com/channel/UC-8QAzbLcRglXeN_MY9blyw
- https://reactjs.org/community/examples.html
- http://amp.gs/i7vy