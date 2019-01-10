import React, { useState } from 'react';
import { withStyles, Table, TableBody, TableRow, TableCell, IconButton } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import classNames from 'classnames';

import EnhancedTableHead from '_components/tables/EnhancedTableHead';

const styles = theme => ({
  iconRightMargin: {
    marginRight: theme.spacing.unit / 4
  },
  actionsTableCell: {
    minWidth: '140px',
    position: 'relative'
  },
  actions: {
    position: 'absolute',
    left: theme.spacing.unit * 1.5,
    top: 0
  },
  action: {
    '&:hover': {
      color: theme.palette.secondary.main
    }
  }
});

const columns = [
  {
    id: 'name',
    numeric: false,
    label: 'Názov',
    styles: () => ({ column: { width: '70%' } })
  },
  {
    id: 'rating',
    numeric: true,
    label: 'Rating'
  },
  {
    id: 'actions',
    numeric: true,
    label: 'Akcie'
  }
];

function UserRecipesTable({ classes }) {
  const [orderState, setOrderState] = useState({
    order: 'asc',
    orderBy: 'name'
  });

  return (
    <Table>
      <EnhancedTableHead
        columns={columns}
        orderBy={orderState.orderBy}
        order={orderState.order}
        onRequestSort={handleSortRequest}
      />
      <TableBody>
        <TableRow>
          <TableCell>Pariz</TableCell>
          <TableCell>86%</TableCell>
          <TableCell className={classes.actionsTableCell}>
            <div className={classes.actions}>
              <IconButton
                aria-label="Delete"
                className={classNames(classes.action, classes.iconRightMargin)}
              >
                <EditIcon fontSize="small" />
              </IconButton>
              <IconButton className={classes.action}>
                <DeleteIcon fontSize="small" />
              </IconButton>
            </div>
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );

  function handleSortRequest(property) {
    const orderBy = property;
    let order = 'desc';

    if (orderState.orderBy === property && orderState.order === 'desc') {
      order = 'asc';
    }

    setOrderState({ order, orderBy });
  }
}

export default withStyles(styles)(UserRecipesTable);
