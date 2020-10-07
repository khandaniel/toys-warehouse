import React, { useEffect } from 'react'
import { Redirect } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import { loadToys } from '../../store/actions/toysActions'
import Row from './Row/Row'
import {
    TableBody,
    TableContainer,
    CircularProgress,
    Paper,
    Table,
    TableCell,
    TableHead,
    TableRow,
    TableFooter
} from '@material-ui/core'
import EditForm from "./EditForm/EditForm"
import TransactionForm from "../TransactionForm/TransactionForm";

function Dashboard() {
    const isAuthorized = useSelector(state => state.auth.isAuthorized)
    const loading = useSelector(state => state.toys.loading)
    const toys = useSelector(state => state.toys.items ?? [])
    const newToy = useSelector(state => state.toys.newToy)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(loadToys())
    }, [dispatch])

    if (!isAuthorized) {
        return <Redirect to="/"/>
    }

    return (
        <div>
            <TransactionForm />
            <TableContainer component={Paper} style={{backgroundColor: '#FAFAFA'}}>
                <Table>
                    <TableHead>
                        <TableRow style={{ backgroundColor: '#AAFFAA' }}>
                            <TableCell>Name</TableCell>
                            <TableCell>Description</TableCell>
                            <TableCell>Category</TableCell>
                            <TableCell>Quantity</TableCell>
                            <TableCell>Price</TableCell>
                            <TableCell>Total Cost</TableCell>
                            <TableCell />
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {toys.map((item) => <Row key={item.id} item={item}/>)}
                    </TableBody>
                    <TableFooter>
                        <TableRow>
                            <EditForm item={ newToy } isNew />
                        </TableRow>
                    </TableFooter>
                </Table>
            </TableContainer>
            <div
                style={{margin: '20px auto', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                {loading && <CircularProgress/>}
            </div>
        </div>
    )
}

export default Dashboard