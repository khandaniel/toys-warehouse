import React from 'react'
import {Paper, Typography, Select, MenuItem, InputLabel} from "@material-ui/core"

const TransactionForm = () => {

    return (
        <Paper style={{marginBottom: 20, padding: 20}}>
            <Typography variant="h6">Create Transaction</Typography>
            <div>
                <InputLabel id="tx-type-select">Transaction Type:</InputLabel>
                <Select labelId="tx-type-select"
                        name="categoryId"
                        value="incoming"
                        onChange={() => {}}
                        required
                >
                    <MenuItem value="incoming">
                        Incoming
                    </MenuItem>
                    <MenuItem value="outcoming">
                        Outcoming
                    </MenuItem>
                </Select>
                <div>
                    <Select labelId="tx-type-select"
                            name="categoryId"
                            value="incoming"
                            onChange={() => {}}
                            required
                    >
                        <MenuItem value="incoming">
                            Incoming
                        </MenuItem>
                        <MenuItem value="outcoming">
                            Outcoming
                        </MenuItem>
                    </Select>
                </div>
            </div>
        </Paper>
    )
}

export default TransactionForm