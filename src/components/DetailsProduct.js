import React, { useState, useEffect } from "react"
import AppContainer from "../layout/AppContainer"
import WineContainer from "../containers/WineContainer"
import { Grid, Typography, Input, TextField, Button } from "@material-ui/core"
import { withRouter } from "react-router-dom"
import toCurrency from "../core/toCurrency"
import api from "../core/api"

const DetailsProduct = ({ match, history }) => {
	const [carrinho, setCarrinho] = useState(
		JSON.parse(localStorage.getItem("carrinho")) || []
	)
	const [quantity, setQuantity] = useState("")
	const [item, setItem] = useState({})
	const id = match.params.id

	const handleCarrinho = async () => {
		if (quantity > 0) {
			const newItem = { ...item, quantity: quantity }
			alert(JSON.stringify(newItem))

			await setCarrinho(carrinho.concat(newItem))
		} else {
			alert("Selecione uma quantidade")
		}
	}

	const fetchItem = async () => {
		try {
			await api.get(`/products/${id}`).then(res => {
				const { data: item } = res
				setItem(item)
			})
		} catch (e) {
			alert(e)
		}
	}

	useEffect(() => {
		fetchItem()
	}, [])

	useEffect(() => {
		carrinho && localStorage.setItem("carrinho", JSON.stringify(carrinho))
	}, [carrinho])

	return (
		<AppContainer>
			<Grid>
				<Grid lg={3}>
					<Typography
						variant="h2"
						color="textSecondary"
						align="center">
						{item.name}
					</Typography>
					<Typography
						variant="h5"
						color="textSecondary"
						align="center">
						{item.description}
					</Typography>
				</Grid>
				<Grid lg={5} style={{}}>
					<div className="flex-row center-a">
						<img src={item.img} alt={item.title} />
					</div>
				</Grid>
				<Grid lg={3}>
					<div className="flex-col center-a">
						<Typography
							variant="h2"
							color="textSecondary"
							align="center">
							{toCurrency(item.price)}
						</Typography>
						<TextField
							onChange={e => {
								if (e.target.value <= item.quantity) {
									setQuantity(e.target.value)
								} else {
									alert("Não temos quantidade suficiente ")
								}
							}}
							id="outlined-name"
							label="Quantidade"
							type="number"
							margin="normal"
							value={quantity}
							variant="outlined"
						/>
						<Button
							onClick={() =>
								handleCarrinho().then(() => history.push("/"))
							}
							variant="contained"
							color="primary">
							Comprar
						</Button>
					</div>
				</Grid>
			</Grid>
		</AppContainer>
	)
}

export default withRouter(DetailsProduct)
