# Жизненный цикл компонента

Источник:
- https://ru.reactjs.org/docs/state-and-lifecycle.html
- https://ru.reactjs.org/docs/react-component.html

Говорят, что в процессе работы React-компонент проходит через несколько этапов "жизненного цикла". Что это означает?

Предположим, `props.showMyComponent` стал равен `true`.

По условию, мы возвращаем(рендерим) React-элемент (`<MyComponent />`) с помощью JSX из родетеля (`App`).
 
 В таком случае React **разместит его в DOM** нашей странички и мы увидим его контент на экране.

```jsx
const App = (props) => {
  return (
    <div>
      {props.showMyComponent && (
        <MyComponent name="My Component" />
      )}
    </div>
  );
}
```

Далее его `props` или `state` могут измениться, в таком случае React обнаружит эти изменения и **обновит** содержимое компонента в зависимости с _изменениями_.

И, наконец, когда `showMyComponent` станет равен `false`, React *удалит из DOM* содержимое нашего компонента.

Таким образом, в "жизни" React-компонента можно выделить 3 этапа:
- **первичное** размещение его содержимого в DOM, оно называется **mounting**;
- обновление, при изменении `state` или `props`, оно называется **update**;
- удаление содержимого из DOM, которое называет **unmounting**.

Казалось бы, зачем нам это знать?
Ну *mount*-ится компонент, *update*-ится, потом *unmount*-ится, нам главное *render*-ить из, и изменять из *props*-ы, чтобы приложение работало.

Однако, тут нужно ответить на несколько вопросов:
- в **какой момент загрузить данные** с бэкенда, и как не делать этого при **каждом** *render*-е?
- как преобразовать меняющиеся `props`-ы в *state* и чтобы при этом не было больно?
- как отловить **обновление** моего поля поиска, и загрузить новые данные с бэкенда при этом?
- с помощью сторонней библиотеки для Google Maps я хочу отрисовать карту в `<div id="map"></div>`, но у меня не находит такой узел при вызове из `contructor()`, как вызвать `new GoogleMaps(node)` тогда, когда узел, который я возвращаю из render уже отрисуется?
- я пишу чат или ленту новостей(твитов), в какой момент мне подписаться на [socket](https://socket.io/)-соединение с сервером?
- в какой момент мне отписаться от soket-соединения, чтобы не вызвать утечки памяти?
- я пишу браузерную игру на React, я передаю ему новые координаты, куда он должен переместиться, но он проходит через текстуру, потому что DOM уже изменился, к тому времени, когда вызвалась проверка на стену. Как обнаружить изменения в данных до изменения в DOM?

В общем, для каждого этапа жизненного цикла React предлагает нам способ вызызвать функции, они же *lifecycle*-методы. Доступны они только для компонентов, описанных с помощью классов.

>Для функциональных компонентов на самом деле тоже, но об этом позже.

>Lifecycle-методов в React довольно большое количество, у каждого свое назначение, поэтому глава выйдет большой. Однако, я **настоятельно рекомендую** понять и заучить нижеизложенный материал, потому как он не только важен для работы с React-компонентами, но также его спрашивают на собеседованиях специалистов каждого уровня.

## Lifecycle-методы на этапе **Mounting**-а

>В этой главе и в следующих методы перечислены в **том порядке, в котором они вызываются** React-ом

### 1. [constructor()](https://ru.reactjs.org/docs/react-component.html#constructor)

```jsx
class MyComponent extends React.Component {
  constructor(props) {
    super(props); // вызываем конструктор родителя

    this.state = { // инициализируем state
      count: 0,
    };

    // bind-им методы на this намертво
    this.handleButtonClick = this.handleButtonClick.bind(this);
  }

  ...
}
```

Описание:
- Конструктор является обычным конструктором [ES6 класса](https://learn.javascript.ru/es-class);
- Вызывается самым первым и **только один раз**;
- на вход принимает **props**;

Для чего нужен:
- чтобы проинициализировать `this.state`;
- [чтобы забиндить методы на this](https://getinstance.info/articles/react/react-and-es6-part3/) - осторожно со способами 5 и 6!!!;

Замечания:
- так как мы наследуемся от `React.Component`, то должны вызвать конструктор родителя;
- напрямую в `this.state` присваивать нужно **только** из конструктора; также можно объявить state как property класса:
```jsx
class MyComponent extends React.Component {
  state = {
    counter: 0,
  };

  ...
}
```
- не вызывайте `this.setState()` в конструкторе и не делайте внутри него ничего лишнего (см. "для чего нужен");

### 2. [static getDerivedStateFromProps()](https://ru.reactjs.org/docs/react-component.html#static-getderivedstatefromprops)

Для начала нужно вспомнить [статические](https://learn.javascript.ru/es-class#staticheskie-svoystva) свойства (и методы) класса, а также тот факт, что статические методы не имеют доступа к контексту `this`.

Описание:
- вызывается непосредственное перед `render()` как при _начальном_ монтировании, так при при _перерисовках_ (этап обновления);
- на вход принимает `props` и `state`;
- если метод вернет `null` - ничего не произойдет, если **объект** - то ваш `state` **будет соединен** с этим объектом и уже в `render()` вы получите измененный `state`;

Назначение:
- само название
>**`get`** - получить, **`Derived`** - произведенный, **`State`** - стейт, **`FromProps()`** - из пропсов
  
  говорит, что этот метод нужен для _производства стейта из пропсов_;
- практическое назначение у него [довольно специфичное](https://ru.reactjs.org/blog/2018/06/07/you-probably-dont-need-derived-state.html#when-to-use-derived-state), и, в кратце, это может вызвать кучу багов;
- можно напимер отследить, как менялись props-ы компонента (для дебага):
```jsx
...
state = {
  namePropHistory: [],
}

static getDerivedStateFromProps (props, state) {
  return {
    namePropHistory: [
      ...state.namePropHistory,
      props.name,
    ]
  }
}

render() {
  const namesLog = this.state.namePropHistory.join(',')
  return (
    <div>
      Вот такие name вы передавали в компонент: ${namesLog}
    </div>
  )
}
```

Замечания:
- именно _статический_ (static) `getDerivedStateFromProps()` для того, чтобы мы не имели доступа к `this.setState()`, `this.state`, `this.props` и ко всем другим функциям компонента, чтобы не накосячить с ними;
- использование метода **усложняет** ваши компоненты и в большинстве случаев его лучше заменить на что-нибудь другое (подробнее - в [статье из заголовка](https://ru.reactjs.org/docs/react-component.html#static-getderivedstatefromprops))

### 3. [render()](https://ru.reactjs.org/docs/react-component.html#render)

- `render()` возвращает React-элемент описанный с помощью JSX-кода, который далее будет помещен в DOM.
- первый вызов `render()` влечет за собой *mounting* компонента в DOM, также `render()` вызывается при изменении `state` и `props`;
- если в JSX React-элемента, который возвращается из `render()` есть дочерние React-компоненты, то после **mounting-а текущего** компонента начнется **mounting дочерних**, затем **дочерних для них** компонентов и так далее.

### 4. [componentDidMount()](https://ru.reactjs.org/docs/react-component.html#componentdidmount)

Описание:
- сам по себе **mounting** происходит _между_ `render()` и `componentDidMount()`, <code>component<span style="color:red"><b>Did</b></span>Mount</code> вызывается, когда mounting уже _произошел_.

Назначение:
- метод является местом, где размещаются _подписки_ на сервисы, например [IntersectionObserver](https://developer.mozilla.org/ru/docs/Web/API/Intersection_Observer_API);
- метод является местом, где делаются запросы на сервер:

```jsx
...
class UserList extends React.Component {
  state = {
    users: [],
    loading: false,
    error: null,
  };

  async loadUsers = () => {
    this.setState({ loading: true }); // включаем индикатор загрузки

    try {
      const response = await fetch('/my-api');
      const users = await response.json();

      this.setState({ users }); // сохраняем user-ов в state
    } catch (error) {
      this.setState({ error }); // если ошибка, то сохраним ее
    } finally {
      this.setState({ loading: false }); // выключаем индикатор загрузки
    }
  }

  componentDidMount() {
    this.loadUsers();
  }

  render() {
    if (this.state.loading) {
      // пока активен this.state.loading - выводим Loading...
      return <div>Loading...</div>
    }

    // если ошибка - выведем ее и кнопку Retry
    if (this.state.error) {
      return (
        <div>
          <span>Error: {this.state.error}</span>
          <button onClick={this.load}>Retry</button>
        </div>
    }

    return <List items={this.state.users}>;
  }
}
```
- можно работать с DOM, который уже замонтировался. Например отрисовать `new GoogleMaps()` в `<div id="map" />` [сыылка](https://developers.google.com/maps/documentation/javascript/tutorial):

```jsx
...
componentDidMount() {
  new google.maps.Map(
    document.getElementById('map'),
    {
      center: {lat: -34.397, lng: 150.644},
      zoom: 8
    }
  ); 
}

render () {
  return <div id="map" />
}
```

Замечания:
- можно вызывать `this.setState()` в `componentDidMount()`, но если вам нужно задать начальное значение `state` - лучше это сделать в `constructor()`;
- если нам необходимо получить DOM-элемент, который описан в _дочернем_ React-компоненте, на момент вызова `componentDidMount()` его может еще не быть в DOM, так как `componentDidMount()` гарантирует монтирование только "своих" React-элементов в DOM, но не дочерних.

## Lifecycle-методы на этапе **Update**-а

Еще раз стоит напомнить, что фаза обновления начинается при **изменении** `props` или `state`

### 1. [getDerivedStateFromProps](https://ru.reactjs.org/docs/react-component.html#static-getderivedstatefromprops)
Первым на фазе обновления вызывается уже знакомый нам `static getDerivedStateFromProps()`. Больше тут добавить нечего.

### 2. [shouldComponentUpdate()](https://ru.reactjs.org/docs/react-component.html#shouldcomponentupdate)

Описание:

```jsx
shouldComponentUpdate(nextProps, nextState) {
  return nextProps.id !== this.props.id;
}
```
- Принимает на вход "**будущие**" `props` и `state`;
- при вызове этого метода `this.state` и `this.props` указывают на "**старые**" props и state;
- результатом выполнения функции является `Boolean`
- если метод вернул `true` (либо значение приводимое к `true`) - `render()` и последующие lifecycle методы выполнятся и компонент перерисуется;
- если метод вернул `false` (либо значение приводимое к `false`), компонент **пропускает обновление** и и последующие lifecycle методы **не выполнятся**;

Назначение:
- этот метод используется **только** для [_повышения производительности_](https://ru.reactjs.org/docs/optimizing-performance.html);

Замечания:
- Если вы не укажете `return` в `shouldComponentUpdate()`, это равнозначно `return false;`
- Не используйте `this.setState()` в `shouldComponentUpdate()`

### 3. [render()](https://ru.reactjs.org/docs/react-component.html#render)

### 4. [static getSnapshotBeforeUpdate()](https://ru.reactjs.org/docs/react-component.html#getsnapshotbeforeupdate)

```jsx
static getSnapshotBeforeUpdate(
  prevProps,
  prevState
) {
  return {
    positionX: document
      .getElementById('character')
      .offsetLeft,
  }
}
```

Описание:
- вызывается прямо перед добавлением новых узлов (или изменения старых) в DOM;
- на вход 
- также может вернуть `null`;
- результат (он и является snapshot-ом) передастся следующему lifecycle-методу из нашего списка (`componentDidUpdate()`)

Назначение:
- позволяет вашему компоненту брать некоторую информацию из DOM (например, положение прокрутки или положение элемента) перед её возможным изменением.

### 5. [componentDidUpdate()](https://ru.reactjs.org/docs/react-component.html#componentdidupdate)


```jsx
...
class UserList extends React.Component {
  state = {
    users: [],
    loading: false,
    error: null,
    search: '',
  };

  async loadUsers = () => {
    this.setState({ loading: true }); // включаем индикатор загрузки

    try {
      const response = await fetch(
        `/my-api/?search=${this.state.search}`
      );
      const users = await response.json();

      this.setState({ users }); // сохраняем user-ов в state
    } catch (error) {
      this.setState({ error }); // если ошибка, то сохраним ее
    } finally {
      this.setState({ loading: false }); // выключаем индикатор загрузки
    }
  }

  componentDidMount() {
    this.loadUsers();
  }

  componentDidUpdate(
    prevProps,
    prevState,
    snapshot
  ) {
    if (this.state.search !== prevState.search) {
      this.loadUsers()
    }
  }

  render() {
    let content = null;

    if (this.state.loading) {
      // пока активен this.state.loading - выводим Loading...
      content = <div>Loading...</div>
    } else if (this.state.error) {
      // если ошибка - выведем ее и кнопку Retry
      content = (
        <div>
          <span>Error: {this.state.error}</span>
          <button onClick={this.load}>Retry</button>
        </div>
      )
    } else {
      content = <List items={this.state.items} />;
    }

    return (
      <div>
        <input
          type="text"
          value={this.state.search}
          onChange={this.handleSearch} />
        {content}
      </div>
    );
  }
}
```

Описание:
- работает аналогично `componentDidMount()`, но в фазе обновления - вызывается после фактического обновления DOM, по результатам изменения `props` или `state`;
- на вход принимает "предыдущие" `props` и `state`, а также snapshot котоый вернул `static getSnapshotBeforeUpdate()`;

Назначение:
- запросы к бэкенду, в случае, если они параметризированы значениями из `state` или `props`;
- любые другие действия, которые нужно выполнить при обновлении компонента;

Замечания:
- в `componentDidUpdate()` можно, а чаще всего и нужно вызывать `this.setState()`, однако в таом случае необходимо обозначить условие, которое ограничит количество выполнений `this.setState()`, потому как `this.setState()` вызывает новую фазу обновления, которая может стать бесконечной.

## Lifecycle-методы на этапе **Unmounting**-а

Стоит напомнить, что unmounting - это фаза, которая запускается, когда React-элемент, отрисованный с помощью нашего компонента собирается удалиться из DOM, напирмер _условие_ рендеринга изменилось на `false`

### 1. [componentWillUnmount()](https://ru.reactjs.org/docs/react-component.html#componentwillunmount)

```jsx
...

state = {
  messages: [],
}

addMessage = message => {
  this.setState(currentState => {
    return {
      messages: [
        ...currentState.messages,
        message
      ],
    }
  })
}

componentDidMount() {
  // подключение к какому-то чат-сервису
  this.chatConnection = ChatClient.connect('wss://my-chat-socket-api/connect')

  this.chatConnection.on('message', this.addMessage)
}

compoentnWillUnmount() {
  this.chatConnection.disconnect();
}
...
```

Описание:
- это единственный метод фазы unmounting-а и вызывается он непосредственно перед удалением элемента из DOM;

Назначение:
- закрытие соединений;
- отписка от событий;
- отмена таймера и так далее.

Замечания:
- не используйте `this.setState()` в `componentWillUnmount()`, так как компонент все равно не перерендерится.

## Ссылки:
-  https://ru.reactjs.org/docs/state-and-lifecycle.html
- https://ru.reactjs.org/docs/react-component.html
- (EN) https://www.youtube.com/watch?v=m_mtV4YaI8c
- (EN) https://www.youtube.com/watch?v=fcvYiYfCGVY&list=PLN3n1USn4xlntqksY83W3997mmQPrUmqM&index=9
- (RU) https://www.youtube.com/watch?v=i2NE0cbuQa4

## Домашнее задание

### Задание 1

Создайте компонент `<Typography />`, который служит для форматирования текста.

Пропсы:
- `color`, может принимать как именованное значение, так и hex-код, задает цвет текста. Значение по-умолчанию - 'initial';
```
color: 'initial' | 'primary' | 'secondary' |  'textPrimary' | 'textSecondary' | 'error' | '#faa'
```
- `display`, соответствует css-свойству display, по-умолчанию - 'inline';
```
display: 'block' | 'inline'
```
- `gutterBottom`, отступ снизу;
- `variant`, вариант отображения текста, у каждого свой `fontSize`, `lineHeight` и `fontWeight`:
```
variant: `h1` | `h2` | `h3` | `h4` | `h5` | `button` | `body` | `subtitle`
```

### Задание 2

Создайте компонент `<Button />`. Для форматирования текста кнопки используйте `<Typography />`

Пропсы:
- `label` - текст кнопки
- `color`, может принимать как именованное значение, так и hex-код, задает цвет кнопки. По умолчанию, `default`
```
color: 'default' | 'inherit' | 'primary' | 'secondary'
```
- `size`, размер кнопки (управляйте расмером с помощью `padding`-ов). По умолчанию, `medium`
```
size: `large` | `medium` | `small`
```
- `disabled`, также задайте стили для disabled (opacity)
```
disabled: true | false
```
- `onClick`, функцция, которая вызовется по клику
- `type`, по умолчанию `button`
```
type: button | submit
```

### Задание 3

Создайте компоненты разных кнопок, максимально переиспользуя уже сделанные вами компоненты. 

- `<PrimaryButton />`, color `primary`
- `<SecondaryButton />`, color `secondary`
- `<SubmitButton />`, color `primary` | type `submit`
- `<CancelButton />`, color `secondary`
- `<RedirectButton />`, href `ссылка`, при нажатии перенаправляет на указанную href.

Все компоненты должны также поддерживать `onClick`(кроме `<RedirectButton />`), `size`, `color`, `disabled`, `label`, `type` (кроме `<SubmitButton />`), так что вспомните spread

### Задание 4
Прочитайте https://ru.reactjs.org/docs/forms.html#controlled-components

Создайте компонент `<TextField />`, для ввода данных (соответствует  <input />)

Пропсы:
- `label`, как `<label />` для `<input />`, связанные через `htmlFor`;
- `value` - постоянное значение поля ввода;
- `defaultValue` - начальное значение;
- `onChange` - обрабочик изменения поля ввода
- `type` - тип поля ввода
```
type: text | password
```
- `required` - см. прошлое домашнее задание
- `email` - см. прошлое домашнее задание
- `disabled`

### Задание 5

Создайте компоненты
`<EmailField>`, email `true` | required `true`
`<PasswordField>`, required `true`
