import {
  createCategory, deleteCategory, getCategories, updateCategory,
} from '../../services/categoryService';

const categoriesError = (error, dispatch) => {
  dispatch({
    type: 'CATEGORIES_ERROR',
    error: error.message,
  });
};

export const loadCategories = () => (dispatch) => {
  dispatch({ type: 'CATEGORIES_REQUESTED' });
  getCategories().then(({ categories }) => {
    dispatch({
      type: 'CATEGORIES_RECEIVED',
      categories,
    });
  }).catch((error) => categoriesError(error, dispatch))
    .finally(() => dispatch({ type: 'CATEGORIES_LOAD_FINISH' }));
};

export const deleteCategoryAction = (categoryId) => (dispatch) => {
  deleteCategory(categoryId).then(({ id }) => dispatch({
    type: 'CATEGORY_REMOVED',
    id,
  }));
};

export const updateNewCategory = (name) => ({
  type: 'NEW_CATEGORY_UPDATED',
  name,
});

export const createCategoryAction = (name) => (dispatch) => {
  createCategory(name).then((category) => dispatch({
    type: 'NEW_CATEGORY_ADDED',
    category,
  }));
};

export const editCategoryAction = (category) => ({
  type: 'EDIT_CATEGORY',
  category,
});

export const categoryNameChanged = (id, name) => ({
  type: 'UPDATE_CATEGORY_NAME',
  category: { [id]: name },
});

export const saveCategoryAction = (category) => (dispatch) => {
  updateCategory(category.id, category.name).then((categoryUpdated) => dispatch({
    type: 'SAVE_CATEGORY_NAME',
    category: categoryUpdated,
  }));
};
