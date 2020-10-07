import React, {Fragment, useCallback} from 'react'
import { TableRow, TableCell, Button } from '@material-ui/core'
import {useDispatch, useSelector} from "react-redux";
import {deleteToyAction, initEditing} from "../../../store/actions/toysActions";
import EditForm from "../EditForm/EditForm";

const Row = ({item}) => {
    const dispatch = useDispatch()
    const { id } = item
    const onDelete = useCallback(() => {
        dispatch(deleteToyAction(item))
    }, [dispatch, item])
    const edit = useSelector(state => state.toys.editingItems[id])
    const onEdit = useCallback(() => {
        dispatch((initEditing(item)))
    }, [dispatch, item])


    return (
        <TableRow>
            { !edit && (
                <Fragment>
                    <TableCell component="th" scope="row">
                    {item.name}
                    </TableCell>
                    <TableCell>{item.description}</TableCell>
                    <TableCell>{item.category?.name}</TableCell>
                    <TableCell>{item.quantity}</TableCell>
                    <TableCell>{item.price}</TableCell>
                    <TableCell>{item.totalCost}</TableCell>
                    <TableCell>
                        <Button onClick={onEdit}>
                        Edit
                        </Button>
                        <Button onClick={onDelete}>
                            DELETE
                        </Button>
                    </TableCell>
                </Fragment>
                ) }
            { edit && <EditForm item={item} /> }
        </TableRow>
    )
}

export default Row