import React, { useState, useEffect } from "react"
import { Grid, List, CircularProgress } from "@material-ui/core"
import { makeStyles } from "@material-ui/styles"
import api from "../core/api"

const useStyles = makeStyles(theme => ({
	root: {
		width: "100%"
		// maxWidth: 360
	}
}))

export default function ProductsContainer({ key, children }) {
	const [state, setState] = useState({
		products: [],
		loading: true,
		error: null
	})

	const classes = useStyles()

	const fetchData = async () => {
		setState({
			partners: [],
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

	console.log(state.products)

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
			<List className={classes.root}>{children(state.products)}</List>
		</Grid>
	)
}
