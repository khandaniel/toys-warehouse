import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Paper,
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  CircularProgress,
  Button,
  TextField,
} from '@material-ui/core';
import {
  categoryNameChanged,
  createCategoryAction,
  deleteCategoryAction, editCategoryAction,
  loadCategories, saveCategoryAction,
  updateNewCategory,
} from '../../store/actions/categoriesActions';
import { loadToys } from '../../store/actions/toysActions';

const Categories = () => {
  const dispatch = useDispatch();
  const categories = useSelector((state) => state.categories.list);
  const toys = useSelector((state) => state.toys.items);
  const loading = useSelector((state) => state.categories.loading);
  const error = useSelector((state) => state.categories.error);
  const newCategory = useSelector((state) => state.categories.newCategory);
  const editing = useSelector((state) => state.categories.editing);
  const onCategoryDelete = useCallback((categoryId) => {
    dispatch(deleteCategoryAction(categoryId));
  }, [dispatch]);
  const onNewCategoryNameChange = useCallback(({ target }) => {
    dispatch(updateNewCategory(target.value));
  }, [dispatch]);
  const onCategoryAdd = useCallback(() => {
    dispatch(createCategoryAction(newCategory));
  }, [dispatch, newCategory]);
  const onCategoryEdit = useCallback((category) => {
    dispatch(editCategoryAction(category));
  }, [dispatch]);
  const onCategoryNameChange = useCallback(({ target }, id) => {
    dispatch(categoryNameChanged(id, target.value));
  }, [dispatch]);
  const onCategorySave = useCallback((id) => {
    dispatch(saveCategoryAction({ id, name: editing[id] }));
  }, [dispatch, editing]);

  useEffect(() => {
    dispatch(loadCategories());
    dispatch(loadToys());
  }, [dispatch]);

  return (
    <div>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell align="center">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            { loading && (
              <TableRow>
                <TableCell align="center" colSpan={2}><CircularProgress /></TableCell>
              </TableRow>
            )}
            {categories.map((category) => {
              const toysInCategory = toys.filter((toy) => toy.category.id === category.id);

              return (
                <TableRow key={category.id}>
                  <TableCell>
                    { !editing[category.id] && <>{`${category.name} (${toysInCategory.length})`}</>}
                    { editing[category.id] !== null && (
                    <TextField
                      value={editing[category.id]}
                      onChange={(e) => onCategoryNameChange(e, category.id)}
                    />
                    ) }
                  </TableCell>
                  <TableCell align="center">
                    { !editing[category.id] && (
                    <Button onClick={() => onCategoryEdit(category)}>Edit</Button>
                    ) }
                    { !!editing[category.id] && (
                    <Button onClick={() => onCategorySave(category.id)}>Save</Button>
                    ) }
                    <Button
                      onClick={() => onCategoryDelete(category.id)}
                      disabled={toysInCategory.length > 0}
                    >
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              );
            })}
            { (!categories.length || !!error) && (
              <TableRow>
                <TableCell colSpan={2} align="center">
                  {(!categories.length && !error) && <>No categories yet. Create one below.</>}
                  {!!error && (
                  <>
                    { `Couldn't load categories (${error})` }
                  </>
                  )}
                </TableCell>
              </TableRow>
            )}
            <TableRow>
              <TableCell>
                <TextField
                  value={newCategory}
                  onChange={onNewCategoryNameChange}
                  label="Name"
                />
              </TableCell>
              <TableCell align="center">
                <Button onClick={onCategoryAdd} disabled={!!error}>Add</Button>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default Categories;
