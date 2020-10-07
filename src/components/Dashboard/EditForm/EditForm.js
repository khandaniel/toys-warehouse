import React, {Fragment, useCallback, useEffect, useState} from 'react'
import {Button, TableCell, TextField, InputLabel, Select, MenuItem} from '@material-ui/core'
import {useDispatch, useSelector} from 'react-redux'
import {createToyAction, loadToys, updateEditToyForm, updateToyAction} from '../../../store/actions/toysActions'
import {loadCategories} from '../../../store/actions/categoriesActions'

const EditForm = ({item, isNew = false}) => {
    const dispatch = useDispatch()
    const onToyEditFormChange = useCallback(({target}) => {
        dispatch(updateEditToyForm({[target.name]: target.value}, isNew, !isNew ? item.id : 0))
    }, [dispatch, item, isNew])

    const [error, setError] = useState(null)
    const categories = useSelector(state => state.categories.list)
    const toys = useSelector(state => state.toys.items)
    const editingItem = useSelector(state => isNew ? state.toys.newToy : state.toys.editingItems[item.id])
    const requiredFields = [
        {name: 'name', label: 'Name'},
        {name: 'categoryId', label: 'Category'},
        {name: 'price', label: 'Price'}
    ]
    const saveToy = useCallback(() => {
        if (
            editingItem.name === '' ||
            editingItem.categoryId === '' ||
            editingItem.price === '0'
        ) {
            const errorMessage = (
                <div style={{color: "red"}}>
                    The following fields are necessary:
                    <ul>
                        {
                            requiredFields.map(({name, label}) => {
                                return !editingItem[name] ? <li key={name}>{label}</li> : null
                            })}
                    </ul>
                </div>
            )
            setError(errorMessage)
            return
        }

        const duplicateToys = toys.filter((toy) => {
            const notSameCatAndName = toy.name === editingItem.name && toy.category?.id === editingItem.categoryId
            return isNew ? notSameCatAndName : notSameCatAndName && toy.id !== editingItem.id
        })

        if (duplicateToys.length) {
            setError(<div>Looks like this toy already exist</div>)
            return
        }

        const saveToyAction = isNew ? createToyAction(editingItem) : updateToyAction(editingItem, item)
        dispatch(saveToyAction)
    }, [dispatch, editingItem, item, isNew, toys, requiredFields])

    useEffect(() => {
        dispatch(loadCategories())
        dispatch(loadToys())
    }, [dispatch])

    return (
        <Fragment>
            <TableCell>
                <TextField
                    label="Name"
                    value={editingItem.name}
                    name="name"
                    onChange={onToyEditFormChange}
                    required
                />
            </TableCell>
            <TableCell>
                <TextField
                    label="Description"
                    value={editingItem.description}
                    name="description"
                    onChange={onToyEditFormChange}
                    multiline
                />
            </TableCell>
            <TableCell>
                <InputLabel id={`label-edit-toy-${item.id}`}>Category</InputLabel>
                <Select labelId={`label-edit-toy-${item.id}`}
                        name="categoryId"
                        value={editingItem.categoryId}
                        onChange={onToyEditFormChange}
                        fullWidth
                        disabled={!isNew}
                        required
                >
                    {categories.map(category => (
                        <MenuItem
                            key={category.id + category.name}
                            value={category.id}>
                            {category.name}
                        </MenuItem>
                    ))}
                </Select>
            </TableCell>
            <TableCell>
                <TextField
                    type="number"
                    label="Quantity"
                    value={editingItem.quantity}
                    name="quantity"
                    onChange={onToyEditFormChange}
                    disabled={!isNew}
                />
            </TableCell>
            <TableCell>
                <TextField
                    type="number"
                    label="Price"
                    value={editingItem.price}
                    name="price"
                    onChange={onToyEditFormChange}
                    disabled={!isNew}
                    required
                />
            </TableCell>
            <TableCell>
                <TextField
                    type="number"
                    label="Total Cost"
                    value={editingItem.price * editingItem.quantity}
                    name="totalCost"
                    onChange={onToyEditFormChange}
                    disabled
                />
            </TableCell>
            <TableCell>
                <Button onClick={saveToy}>
                    {isNew ? 'Create' : 'Save'}
                </Button>
                {!!error && error}
            </TableCell>
        </Fragment>
    )
}

export default EditForm