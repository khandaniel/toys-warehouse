import React, { useCallback } from 'react';
import { TableRow, TableCell, Button } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { initEditing } from '../../store/actions/toysActions';
import EditForm from '../EditForm/EditForm';

const Row = ({ item }) => {
  const dispatch = useDispatch();
  const { id } = item;
  const edit = useSelector((state) => state.toys.editingItems[id]);
  const onEdit = useCallback(() => {
    dispatch((initEditing(item)));
  }, [dispatch, item]);

  return (
    <TableRow>
      { !edit && (
        <>
          <TableCell component="th" scope="row">
            {item.name}
          </TableCell>
          <TableCell>{item.description}</TableCell>
          <TableCell>{item.category.name}</TableCell>
          <TableCell>{item.quantity}</TableCell>
          <TableCell>{item.price}</TableCell>
          <TableCell>{item.totalCost}</TableCell>
          <TableCell>
            <Button onClick={onEdit}>
              Edit
            </Button>
          </TableCell>
        </>
      ) }
      { edit && <EditForm item={item} /> }
    </TableRow>
  );
};

export default Row;

Row.defaultProps = {
  item: {
    id: 0,
    name: '',
    description: '',
    category: {
      id: 0,
      name: '',
    },
    quantity: 0,
    price: 0,
    totalCost: 0,
  },
};

Row.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string,
    description: PropTypes.string,
    category: PropTypes.shape({
      id: PropTypes.string,
      name: PropTypes.string,
    }),
    quantity: PropTypes.number,
    price: PropTypes.number,
    totalCost: PropTypes.number,
  }),
};
