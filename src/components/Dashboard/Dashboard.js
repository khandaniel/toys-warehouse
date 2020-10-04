import React, {useEffect} from 'react'
import { Link, Redirect } from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'

import { getProducts } from '../../store/actions/productsActions'

function Dashboard(props) {
    const token = useSelector(state => state.auth.token)
    const products = useSelector(state => state.products.items)
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getProducts(token))
    }, [dispatch, token])

    // console.log("Dashboard: ", token);
    if (!token) {
        return <Redirect to="/" />
    }

    return (
        <div>
            { products.map((item) => <p>{item.name}</p>) }

            <p>
                <Link to={ `/logout?token=${token}` }>Log Out</Link>
            </p>


        </div>
    );
}

export default Dashboard;