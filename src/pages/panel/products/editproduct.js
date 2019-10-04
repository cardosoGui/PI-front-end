import React, { useState, useEffect } from "react"

import {
	Grid,
	List,
	CircularProgress,
	GridListTile,
	GridList,
	IconButton,
	GridListTileBar,
	Fab,
	ListItem
} from "@material-ui/core"
import { makeStyles } from "@material-ui/styles"
import AddIcon from "@material-ui/icons/Add"
import api from "../../../core/api"
import Dashboard from "../../../layout/Dashboard"
import ProductsForm from "../../../components/forms/ProductsForm"

const useStyles = makeStyles(theme => ({
	root: {
		width: "100%"
		// maxWidth: 360
	},
	gridList: {
		width: 500,
		height: 500
	}
}))

const FloatingButtonAdd = ({ history }) => (
	<div className="flex-row flex-end">
		<a href="/products/add" style={{ textDecoration: "none" }}>
			<Fab color="primary" aria-label="add" style={{ right: "0.5vw" }}>
				<AddIcon />
			</Fab>
		</a>
	</div>
)

const ProductsEdit = ({ history, match }) => {
	const [state, setState] = useState({
		products: [],
		loading: true,
		error: null
	})

	const fetchData = async () => {
		setState({
			products: [],
			loading: true,
			error: null
		})
		try {
			const { data } = await api.get("/products")
			return data
		} catch (e) {
			if (e.response)
				setState({
					...state,
					error: {
						payload: e.response.data
					}
				})
			else setState({ ...state, error: {} })
		}
	}

	useEffect(() => {
		fetchData().then(res =>
			setState({
				products: res,
				loading: false
			})
		)
	}, [])

	const { products } = state

	console.log(match)

	return (
		<Dashboard>
			<Grid>
				{products.map((item, key) => {
					if (item.id === match.params.productId) {
						return <ProductsForm history={history} item={item} />
					}
				})}

				{/* <FloatingButtonAdd /> */}
			</Grid>
		</Dashboard>
	)
}

export default ProductsEdit
