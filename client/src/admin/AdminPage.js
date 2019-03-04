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
import { useQuery, useMutation } from 'react-apollo-hooks';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import DoneIcon from '@material-ui/icons/Done';
import gql from 'graphql-tag';

import Action from '_components/Action';
import ConfirmationDialog from '_components/ConfirmationDialog';
import { showSuccessToast, showErrorToast } from '_utils/toast';

const styles = theme => ({
  paper: {
    padding: `${theme.spacing.unit * 3}px ${theme.spacing.unit * 2}px`
  },
  actionCell: {
    width: '180px'
  }
});

const UPDATE_FOOD = gql`
  mutation updateFood($id: Int!, $name: String!, $histamineLevel: Int!, $description: String!) {
    updateFood(id: $id, name: $name, histamineLevel: $histamineLevel, description: $description) {
      id
    }
  }
`;

const DELETE_FOOD = gql`
  mutation deleteFood($id: Int!) {
    deleteFood(id: $id)
  }
`;

const ADD_FOOD = gql`
  mutation updateFood($name: String!, $histamineLevel: Int!, $description: String!) {
    updateFood(name: $name, histamineLevel: $histamineLevel, description: $description) {
      id
    }
  }
`;

const initialSelectedFoodState = {
  id: 0,
  name: '',
  histamineLevel: 1,
  description: ''
};

function AdminPage({ classes }) {
  const {
    data: { foods }
  } = useQuery(FOODS_QUERY);

  const [openDialog, setOpenDialog] = useState(false);
  const [selectedFood, setSelectedFood] = useState(initialSelectedFoodState);
  const addFood = useMutation(ADD_FOOD, {
    variables: {
      ...selectedFood,
      histamineLevel: Number(selectedFood.histamineLevel)
    },
    refetchQueries: [{ query: FOODS_QUERY }]
  });
  const updateFood = useMutation(UPDATE_FOOD, {
    variables: {
      ...selectedFood,
      histamineLevel: Number(selectedFood.histamineLevel)
    },
    refetchQueries: [{ query: FOODS_QUERY }]
  });
  const deleteFood = useMutation(DELETE_FOOD, {
    variables: { id: selectedFood.id },
    refetchQueries: [{ query: FOODS_QUERY }]
  });

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
          {[...foods, initialSelectedFoodState].map(food => {
            const selected = selectedFood.id === food.id;
            return (
              <TableRow key={food.id}>
                <TableCell>{food.id}</TableCell>
                <TableCell>
                  {selected ? (
                    <TextField name="name" value={selectedFood.name} onChange={handleFoodChange} />
                  ) : (
                    food.name
                  )}
                </TableCell>
                <TableCell>
                  {selected ? (
                    <TextField
                      name="histamineLevel"
                      value={selectedFood.histamineLevel}
                      onChange={handleFoodChange}
                    />
                  ) : (
                    food.histamineLevel.value + ' - ' + food.histamineLevel.name
                  )}
                </TableCell>
                <TableCell>
                  {selected ? (
                    <TextField
                      name="description"
                      value={selectedFood.description}
                      onChange={handleFoodChange}
                    />
                  ) : (
                    food.description
                  )}
                </TableCell>
                <TableCell className={classes.actionCell}>
                  {selectedFood.id === food.id && (
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
                      setSelectedFood({
                        id: food.id,
                        name: food.name,
                        histamineLevel: food.histamineLevel.value,
                        description: food.description
                      });
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
          const food = foods.find(f => f.id === selectedFood.id);
          return `Naozaj chcete odstrániť potravinu ${food && '- ' + food.name}`;
        })()}
        onClose={handleCloseDeleteDialog}
      />
    </Paper>
  );

  function handleFoodChange(e) {
    const { name, value } = e.target;

    setSelectedFood({ ...selectedFood, [name]: value });
  }

  function handleSave(e) {
    if (selectedFood.id === 0) {
      addFood()
        .then(res => {
          showSuccessToast('Potravina bola pridana');
        })
        .catch(err => showErrorToast('Nastala chyba! Potravina nebola pridana'));
    } else {
      updateFood()
        .then(res => {
          showSuccessToast('Potravina bola aktualizovana');
          setSelectedFood(initialSelectedFoodState);
        })
        .catch(err => showErrorToast('Nastala chyba! Potravina nebola aktualizovana'));
    }
  }

  function handleEdit(foodId, e) {
    const food = foods.find(f => f.id === foodId);

    if (food) {
      setSelectedFood({
        id: food.id,
        name: food.name,
        histamineLevel: food.histamineLevel.value,
        description: food.description
      });
    } else {
      setSelectedFood(initialSelectedFoodState);
    }
  }

  function handleCloseDeleteDialog(result, e) {
    setOpenDialog(false);

    if (result) {
      deleteFood()
        .then(res => showSuccessToast('Potravina bola zmazana'))
        .catch(err => showErrorToast('Nastala chyba! Potravina nebola zmazana'));
    }
    setSelectedFood(initialSelectedFoodState);
  }
}

export default withStyles(styles)(AdminPage);
