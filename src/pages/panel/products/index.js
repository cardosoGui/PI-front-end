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
import ProductsContainer from "../../../containers/ProductsContainer"
import ProductItem from "../../../components/ProductItem"

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

const ProductsPage = ({ history }) => {
	const classes = useStyles()
	return (
		<Grid>
			<ProductsContainer>
				{products => {
					return (
						<div>
							{products &&
								products.map((item, key) => (
									<ProductItem product={item} />
								))}
						</div>
					)
				}}
			</ProductsContainer>
			<FloatingButtonAdd />
		</Grid>
	)
}

export default ProductsPage
