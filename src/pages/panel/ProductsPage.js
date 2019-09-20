import React, { useState, useEffect } from "react"

import {
	Grid,
	List,
	CircularProgress,
	GridListTile,
	GridList,
	IconButton,
	GridListTileBar,
	Fab
} from "@material-ui/core"
import { makeStyles } from "@material-ui/styles"
import InfoIcon from "@material-ui/icons/Info"
import toCurrency from "../../core/toCurrency"
import AddIcon from "@material-ui/icons/Add"

const useStyles = makeStyles(theme => ({
	root: {
		width: "100%"
		// maxWidth: 360
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
	const [state, setState] = useState({
		products: [],
		loading: true,
		error: null
	})

	const classes = useStyles()

	async function fetchData() {
		setState({
			products: [],
			loading: true,
			error: null
		})
		try {
			const data = await localStorage.getItem("products")

			setState({
				products: JSON.parse(data),
				loading: false
			})
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
		fetchData()
	}, [])

	const ProductsContainer = ({ children }) => {
		if (state.error) {
			return (
				<div>
					<p style={{ textAlign: "center" }}>
						Ocorreu um erro ao obter os dados.
					</p>
					<p style={{ textAlign: "center" }}>
						<a href="javascript:void(0)" onClick={fetchData}>
							Tentar novamente
						</a>
					</p>
				</div>
			)
		}

		if (state.loading) {
			return (
				<div
					className="flex-col center-a center-b"
					style={{ height: "50vh" }}>
					<CircularProgress size={200} />
					<p> Carregando... </p>
				</div>
			)
		}

		return (
			<Grid container wrap="nowrap" spacing={2}>
				<GridList
					cellHeight={500}
					spacing={20}
					className={classes.gridList}
					cols={2}>
					{children}
				</GridList>
			</Grid>
		)
	}

	const { products } = state
	return (
		<Grid>
			<ProductsContainer>
				{products.map((item, key) => (
					<GridListTile key={key} cols={item.cols || 1}>
						<img
							width="300px"
							src={
								"https://chezfrance.vteximg.com.br/arquivos/ids/163379-230-364/espumante-frances-bourgogne-cremant-da-bourgone-blanc-de-blancs.jpg?v=637021662587330000"
							}
							alt={item.title}
						/>
						<GridListTileBar
							style={{ height: 500 }}
							title={item.name}
							subtitle={
								<div
									className="flex-row"
									style={{ fontSize: 16, height: "50%" }}>
									<b>Preço: {`${toCurrency(item.price)}`}</b>

									<i>Região: {item.region}</i>
								</div>
							}
							actionIcon={
								<IconButton
									style={{
										color: "rgba(255, 255, 255, 0.54)"
									}}
									aria-label={`info about ${item.description}`}>
									<InfoIcon />
								</IconButton>
							}
						/>
					</GridListTile>
					// <pre>{JSON.stringify(item)}</pre>
				))}{" "}
			</ProductsContainer>
			<FloatingButtonAdd />
		</Grid>
	)
}

export default ProductsPage
