import React, { useState } from 'react';
import {
  Paper,
  Typography,
  withStyles,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TextField
} from '@material-ui/core';
import { FOODS_QUERY } from 'foods/FoodsPage';
import { useQuery } from 'react-apollo-hooks';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import DoneIcon from '@material-ui/icons/Done';

import Action from '_components/Action';
import ConfirmationDialog from '_components/ConfirmationDialog';

const styles = theme => ({
  paper: {
    padding: `${theme.spacing.unit * 3}px ${theme.spacing.unit * 2}px`
  },
  actionCell: {
    width: '180px'
  }
});

function AdminPage({ classes }) {
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedFood, setSelectedFood] = useState(0);

  const {
    data: { foods }
  } = useQuery(FOODS_QUERY);

  return (
    <Paper className={classes.paper}>
      <Typography variant="h4" component="h4" gutterBottom={true}>
        Pridanie / editacia potravin
      </Typography>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>id</TableCell>
            <TableCell>Nazov</TableCell>
            <TableCell>histamin level</TableCell>
            <TableCell>Popis</TableCell>
            <TableCell>Akcie</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {foods.map(food => {
            const selected = selectedFood === food.id;
            return (
              <TableRow key={food.id}>
                <TableCell>{food.id}</TableCell>
                <TableCell>{selected ? <TextField value={food.name} /> : food.name}</TableCell>
                <TableCell>
                  {food.histamineLevel.value} - {food.histamineLevel.name}
                </TableCell>
                <TableCell>{food.description}</TableCell>
                <TableCell className={classes.actionCell}>
                  {selectedFood === food.id && (
                    <Action aria-label="Add" onClick={handleSave}>
                      <DoneIcon fontSize="small" />
                    </Action>
                  )}
                  <Action aria-label="Edit" onClick={e => handleEdit(food.id, e)}>
                    <EditIcon fontSize="small" />
                  </Action>
                  <Action
                    aria-label="Delete"
                    onClick={() => {
                      setSelectedFood(food.id);
                      setOpenDialog(true);
                    }}
                  >
                    <DeleteIcon fontSize="small" />
                  </Action>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
      <ConfirmationDialog
        open={openDialog}
        title="Odstrániť"
        contentText={(() => {
          const food = foods.find(f => f.id === selectedFood);
          return `Naozaj chcete odstrániť potravinu ${food && '- ' + food.name}`;
        })()}
        onClose={handleCloseDeleteDialog}
      />
    </Paper>
  );

  function handleSave(e) {
    // TODO SAVE
  }

  function handleEdit(foodId, e) {
    // TODO EDIT
    setSelectedFood(foodId);
  }

  function handleCloseDeleteDialog(result, e) {
    setOpenDialog(false);
    setSelectedFood(-1);

    if (result) {
      // TODO DELETE
    }
  }
}

export default withStyles(styles)(AdminPage);
