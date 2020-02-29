import propTypes from 'prop-types'

export const columnPropType = propTypes.shape({
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

export const paramsPropType = propTypes.shape({
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

export const dataTablePropType = {
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
}

export const dataTableBodyPropType = {
  // необходимо для отрисовки ячеек
  columns: propTypes.arrayOf(columnPropType).isRequired,
  // необходимо для отрисовки рядов
  items: propTypes.array,
  // необходимо для отрисовки select-а
  selectedIds: propTypes.arrayOf(propTypes.string),
  onSelect: propTypes.func,
}

export const dataTableHeadPropType = {
  // необходимо для отрисовки DataTableHeadCell-ов
  columns: propTypes.arrayOf(columnPropType).isRequired,
  // необходимо для отрисовки индикатора сортировки на нужной колонке
  params: paramsPropType.isRequired,
  // необходимо для select all
  selectedIds: propTypes.arrayOf(propTypes.string),
  items: propTypes.array
}

export const dataTableFooterPropType = {
  // необходимо для отрисовки пагинации
  params: paramsPropType.isRequired,
  onParamsChange: propTypes.func,
}