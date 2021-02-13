import React from 'react';
import { PropTypes } from 'prop-types';
import { useTable } from 'react-table';

import './style.scss';

const propTypesTable = {
  columns: PropTypes.arrayOf(PropTypes.object).isRequired,
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  formatters: PropTypes.object,
};

const propTypes = {
  columns: PropTypes.arrayOf(PropTypes.object).isRequired,
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
};

const Table = props => {
  const { columns, data, formatters = {} } = props;

  const cols = columns.map((item) => {
    let col = {
      Header: item.name,
      accessor: item.key,
    };
    if (formatters[item.key]) col.Cell = formatters[item.key];
    return col;
  });

  console.log('TABLE');

  return <TableRender columns={cols} data={data} />;
};

const TableRender = props => {
  const { columns, data } = props;  

  console.log('table render');

  const columnsMemo = React.useMemo(() => columns);
  const dataMemo = React.useMemo(() => data);
  
  const tableInstance = useTable({ columns: columnsMemo, data: dataMemo });

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = tableInstance;

  return (
    <div>
      <table className="table" {...getTableProps()}>
        <thead>
          {headerGroups.map((headerGroup, headerKey) => (
            <tr {...headerGroup.getHeaderGroupProps()} key={headerKey}>
              {headerGroup.headers.map((column, columnKey) => (
                <th {...column.getHeaderProps()} key={columnKey}>
                  {column.render('Header')}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map((row, rowKey) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()} key={rowKey}>
                {row.cells.map((cell, cellKey) => {
                  return (
                    <td {...cell.getCellProps()} key={cellKey}>
                      {cell.render('Cell')}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

Table.propTypes = propTypesTable;
TableRender.propTypes = propTypes;


export default Table;