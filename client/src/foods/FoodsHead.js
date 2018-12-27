import React from 'react';
import { TableHead, TableRow, TableCell, Tooltip, TableSortLabel } from '@material-ui/core';
import PropTypes from 'prop-types';

function FoodsHead({ columns, order, orderBy, onRequestSort }) {
  return (
    <TableHead>
      <TableRow>
        {columns.map((column, index) => (
          <TableCell
            key={index}
            align={column.numeric ? 'right' : 'left'}
            sortDirection={orderBy === column.id ? order : false}
          >
            <Tooltip title="Triedenie" enterDelay={300}>
              <TableSortLabel
                active={orderBy === column.id}
                direction={order}
                onClick={e => onRequestSort(column.id, e)}
              >
                {column.label}
              </TableSortLabel>
            </Tooltip>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

FoodsHead.propTypes = {
  columns: PropTypes.array.isRequired,
  order: PropTypes.string.isRequired,
  orderBy: PropTypes.string.isRequired,
  onRequestSort: PropTypes.func.isRequired
};

export default FoodsHead;
