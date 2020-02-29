import React from 'react'
import { dataTablePropType, dataTableBodyPropType, dataTableHeadPropType, dataTableFooterPropType } from './propTypes'

const tableCellStyle = {
  border: '1px solid black',
  padding: '3px 7px',
}

const DataTableRow = props => {
  return (
    <tr>
      {props.columns.map(column => {
        return (
          <DataTableCell
            column={column}
            item={props.item}
          />
        )
      })}
    </tr>
  )
}

const DataTableCell = props => {
  const value = props.column.renderer(props.item)

  return (
    <td style={tableCellStyle}>
      {value}
    </td>
  )
}

const DataTableHeadCell = props => {
  const shouldSortShow = props.column.sortable
    && props.column.id === props.params.sortField

  return (
    <th>
      <div onClick={() => {
        if (shouldSortShow) {
          props.onParamsChange({
            sortField: props.column.id,
            sortOrder: props.params.sortOrder === 'asc' ? 'desc' : 'asc'
          })
        }
      }}>
        {props.column.title}
        {shouldSortShow && (props.params.sortOrder === 'asc' ? '⬆' : '⬇')}
      </div>
    </th>
  )
}

const DataTableHeader = props => {
  return (
    <thead>
      <tr>
        {props.columns.map(column => {
          return (
            <DataTableHeadCell
              column={column}
              params={props.params}
              onParamsChange={props.onParamsChange}
            />
          )
        })}
      </tr>
    </thead>
  )
}

DataTableHeader.propTypes = dataTableHeadPropType

const DataTableBody = props => {
  return (
    <tbody>
      {props.items.map(item => {
        return (
          <DataTableRow
            item={item}
            columns={props.columns}
          />
        )
      })}
    </tbody>
  )
}

DataTableBody.propTypes = dataTableBodyPropType

const DataTableFooter = props => {
  return (
    <tfoot>
      {null}
    </tfoot>
  )
}

DataTableFooter.propTypes = dataTableFooterPropType

const tableStyles = { border: '1px solid black', borderCollapse: 'collapse' }

export const DataTable = props => {
  return (
    <table style={tableStyles}>
      <DataTableHeader
        columns={props.columns}
        params={props.params}
        onParamsChange={props.onParamsChange}
        selectIds={props.selectIds}
        onSelect={props.onSelect}
        items={props.items}
      />
      <DataTableBody
        items={props.items}
        columns={props.columns}
        selectIds={props.selectIds}
        onSelect={props.onSelect}
      />
      <DataTableFooter
        params={props.params}
        onParamsChange={props.onParamsChange}
      />
    </table>
  );
}

DataTable.propTypes = dataTablePropType;