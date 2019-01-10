import React from 'react';
import {
  TableHead,
  TableRow,
  TableCell,
  Tooltip,
  TableSortLabel,
  withStyles
} from '@material-ui/core';
import PropTypes from 'prop-types';

function EnhancedTableHead({ columns, order, orderBy, onRequestSort }) {
  return (
    <TableHead>
      <TableRow>
        {columns.map((column, index) => {
          const HeadCell = withStyles(column.styles || {})(({ classes }) => (
            <TableCell
              align={column.numeric ? 'right' : 'left'}
              sortDirection={orderBy === column.id ? order : false}
              className={classes.column}
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
          ));
          return <HeadCell key={index} />;
        })}
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  columns: PropTypes.array.isRequired,
  order: PropTypes.string.isRequired,
  orderBy: PropTypes.string.isRequired,
  onRequestSort: PropTypes.func.isRequired
};

export default EnhancedTableHead;
