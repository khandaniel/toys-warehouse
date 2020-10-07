import React, {useEffect} from 'react';
import {
    TableRow,
    TableCell,
    Typography,
    Table,
    TableHead,
    TableBody,
    TableContainer,
    Paper
} from '@material-ui/core'
import {useDispatch, useSelector} from 'react-redux'
import {loadTransactions} from '../../../store/actions/transactionsActions'

const styles = {
    transactionRows: {
        incoming: {
            backgroundColor: '#AAFFAA'
        },
        outcoming: {
            backgroundColor: '#FFAAAA'
        }
    }
}

function Transactions() {
    const transactions = useSelector(state => state.transactions.list)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(loadTransactions())
    }, [dispatch])

    return (
        <div>
            <Typography variant="h6" gutterBottom component="div">
                Transactions
            </Typography>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow style={{backgroundColor: '#AAAAFF'}}>
                            <TableCell>Type</TableCell>
                            <TableCell>Date</TableCell>
                            <TableCell>User</TableCell>
                            <TableCell>Toys</TableCell>
                            <TableCell align="center">Total price ($)</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {transactions.map((transaction) => (
                            <TableRow key={transaction.id}
                                      style={styles.transactionRows[transaction.type]}
                            >
                                <TableCell>{transaction.type === 'incoming' ? '↦[___]' : '[___]↦'}</TableCell>
                                <TableCell component="th" scope="row">
                                    {transaction.date}
                                </TableCell>
                                <TableCell>{transaction.userId}</TableCell>
                                <TableCell>
                                    <Table>
                                        <TableHead>
                                            <TableRow>
                                                <TableCell>Number</TableCell>
                                                <TableCell>Name</TableCell>
                                                <TableCell>Category</TableCell>
                                                <TableCell>Quantity</TableCell>
                                                <TableCell>Price</TableCell>
                                                <TableCell>Total Cost</TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {transaction.toys.map((toy, idx) => (
                                                <TableRow key={transaction.id + toy.name + idx}>
                                                    <TableCell>#{idx + 1}</TableCell>
                                                    <TableCell>{toy.name}</TableCell>
                                                    <TableCell>{toy.category.name}</TableCell>
                                                    <TableCell>{toy.quantity}</TableCell>
                                                    <TableCell>{toy.price}</TableCell>
                                                    <TableCell>{toy.totalCost}</TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                </TableCell>
                                <TableCell align="center">
                                    { transaction.toys.reduce((accumulator, currentValue) => {
                                        return accumulator + currentValue.totalCost
                                    }, 0) }
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
}

export default Transactions;