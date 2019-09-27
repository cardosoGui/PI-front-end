import React from "react"
import { TextField, Grid, Button } from "@material-ui/core"
import useReduxState from "../../core/useReduxState"

const ProductsForm = ({ history }) => {
	const [getForm, setForm, updateFormField] = useReduxState({})

	const form = getForm()

	var products = localStorage.getItem("products") // Recupera os dados armazenados
	products = JSON.parse(products) // Converte string para objeto
	if (products == null) products = []

	function Adicionar() {
		// var cliente = JSON.stringify(form)
		if (form.name !== "" && form.price !== "") {
			products.push(form)
			localStorage.setItem("products", JSON.stringify(products))
			alert("Produto Cadastrado.")
			// history.goBack()
		} else {
			alert("Preencha os campos")
		}
	}
	const classes = ""
	return (
		<div>
			<form noValidate>
				<Grid container spacing={2}>
					<Grid item xs={12}>
						<TextField
							variant="outlined"
							fullWidth
							label="Nome"
							onChange={e => {
								updateFormField("name")(e.target.value)
							}}
						/>
					</Grid>
					<Grid item xs={12}>
						<TextField
							variant="outlined"
							fullWidth
							label="Região"
							onChange={e => {
								updateFormField("region")(e.target.value)
							}}
						/>
					</Grid>

					<Grid item xs={12}>
						<TextField
							variant="outlined"
							fullWidth
							label="Descrição"
							onChange={e => {
								updateFormField("description")(e.target.value)
							}}
						/>
					</Grid>
					<Grid item xs={12}>
						<TextField
							variant="outlined"
							fullWidth
							label="Palavras Chave"
							onChange={e => {
								updateFormField("key_words")(e.target.value)
							}}
						/>
					</Grid>
					<Grid item xs={12}>
						<TextField
							variant="outlined"
							fullWidth
							type="number"
							label="Preço"
							onChange={e => {
								updateFormField("price")(e.target.value)
							}}
						/>
					</Grid>
					<Grid item xs={12}>
						<TextField
							variant="outlined"
							fullWidth
							type="number"
							label="Quantidade"
							onChange={e => {
								updateFormField("count")(e.target.value)
							}}
						/>
					</Grid>
				</Grid>
				<Button
					onClick={() => Adicionar()}
					type="button"
					fullWidth
					variant="contained"
					color="primary"
					className={classes.submit}>
					Adicionar
				</Button>
			</form>
		</div>
	)
}

export default ProductsForm
