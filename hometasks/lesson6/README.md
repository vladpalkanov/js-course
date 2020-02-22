# Домашнее задание

Целью домашнего задания является создание компонента `<DataTable />`, который будет использоваться для отображения табличных данных.

- Данные необходимо отображать постранично;
- реализовать возможность текстового поиска;
- реализовать возможность сортировки данных;
- реализовать возможность возможность настроить конфигурацию отображаемых колонок;
- реализовать возможность select-а рядов таблицы;

Таким образом, интерфейс компонента (props) может выглядеть так:

```jsx
const columnPropType = propTypes.shape({
  /** уникальный id колонки (name, address, etc.) */
  id: propTypes.string,
  /** Заголовок колонки (Name, Address, etc.); */
  title: propTypes.string,
  /** Функция, которая принимает объект, соответствуещий строке в таблице,
    * а возвращающий элемент с отображением значения в ячейке
    * renderer: item => {
    *   return <a href={`/users/${item.id}`}>{item.name}</a>;
    * }
    */
  renderer: propTypes.func,
  /** воможность сортировки по данной колонке */
  sortable: propTypes.bool,
});

const paramsPropType = propTypes.shape({
  /** offset и limit - это настройки pagination таблицы 
    * пусть список: [A1, A2, A3, A4, A5, B1, B2, B3, B4, B5, C1, C2, C3, C4, C5]
    * для offset: 0, limit: 5 (1 страница, по 5 элементов на странице):
    * [A1, A2, A3, A4, A5]
    * для offset: 5, limit 5 (2 страница, по 5 элементов на странице):
    * [B1, B2, B3, B4, B5]
    */
  offset: propTypes.number,
  limit: propTypes.number,
  /** настройки сортировки (сортиковка должна поддерживаться только по 1 полю)
    * sortField: поле, по которому идет сортировка (name, age, etc...)
    * sortOrder: asc (ascending) - по возрастанию, desc (descending) - по убыванию
    */
  sortField: propTypes.string,
  sortDirection: propTypes.oneOf(['asc', 'desc']),
})

DataTable.propTypes = {
  /** табличные данные: [{...}, {...}, ...]; */
  items: propTypes.array.isRequired,
  /** настройки колонок */
  columns: propTypes.arrayOf(columnPropType).isRequired,
  /** параметры таблицы */
  params: paramsPropType.isRequired,
  /** коллбэк на изменение параметров */
  onParamsChange: propTypes.func,
  /** массив id выбраных рядов */
  selectedIds: propTypes.arrayOf(propTypes.string),
  /** коллбэк на выбор ряда:
    * onSelect={selectedIds => {}}
    */
  onSelect: propTypes.func,
  /**
}

```

## Задание 1

Создать компонент DataTable, объявить propTypes (можно хранить в общем файле для всех компонентов), описанные выше.
Создать компоненты DataTableHead, DataTableBody, DataTableFooter (для верстки можно использовать table, thead, tbody, tfoot)

```jsx
DataTableHead.propTypes = {
  // необходимо для отрисовки DataTableHeadCell-ов
  columns: propTypes.arrayOf(columnPropType).isRequired,
  // необходимо для отрисовки индикатора сортировки на нужной колонке
  params: paramsPropTypes.isRequired,
  // необходимо для select all
  selectedIds: propTypes.arrayOf(propTypes.string),
  items: propTypes.array
}

DataTableBody.propTypes = {
  // необходимо для отрисовки ячеек
  columns: propTypes.arrayOf(columnPropType).isRequired,
  // необходимо для отрисовки рядов
  items: propTypes.array,
  // необходимо для отрисовки select-а
  selectedIds: propTypes.arrayOf(propTypes.string),
  onSelect: propTypes.func,
}

DataTableFooter.propTypes = {
  // необходимо для отрисовки пагинации
  params: paramsPropTypes.isRequired,
}
```

## Задание 2

Создать компоненты DataTableRow, DataTableCell, DataTableHeadCell.

```jsx
DataTableRow.propTypes = {
  /** объкт данных из items */
  row: propTypes.object,
  /** колонки */
  columns: propTypes.arrayOf(columnPropType).isRequired,
  /** для функции select */
  selectedIds: propTypes.arrayOf(propTypes.string),
  onSelect: propTypes.func,
}

DataTableCell.propTypes = {
  column: columnPropType.isRequired,
  item: propTypes.object,
}

DataTableHeadCell.propTypes = {
  /** настройки колонки */
  column: columnPropType.isRequired,
  /** нужен для отображения индикатора сортировки */
  params: paramsPropTypes.isRequired,
  /** нужны для колонки select All */
  selectedIds: propTypes.arrayOf(propTypes.string),
  onSelect: propTypes.func,
}
```

## Задание 3

Отрисуйте внутри DataTable: DataTableHead, DataTableBody, DataTableFooter и прокиньте необходимые props-ы


```jsx
  ...
  return (
    <table>
      <DataTableHead {/* your code goes here */} />
      <DataTableBody {/* your code goes here */} />
      <DataTableFooter {/* your code goes here */} />
    </table>
  );
  ...
```

## Задание 4

Сгенерируйте массив user-ов, с 5 колонками данных:
- id: string
- firstName: string
- lastName: string
- email: string
- department: string
- phone: string

Данные можно сгенерировать с помощью https://github.com/marak/Faker.js/

## Задание 5

Используйте массив из предыдущего задания и передайте его в items.

Также создайте и прокиньте columns по указанным propTypes с колонками:
- name (`${firstName} ${lastName}`) (sortable)
- email (sortable)
- department (sortable)
- phone

## Задание 6

Отрисуйте в DataTableBody по items массив DataTableRow и прокиньте необходимые props

## Задание 7

Отрисуйте в каждом DataTableRow по columns массив DataTableCell и прокиньте  необходимые props

## Задание 8

Отрисуйте в DataTableHead, tr и массив DataTableHeadCell и прокиньте необходимые props