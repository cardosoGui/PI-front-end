import React from "react"
import { TextField, Grid, Button } from "@material-ui/core"
import useReduxState from "../../core/useReduxState"

import api from "../../core/api"

const ProductsForm = ({ history, item }) => {
	const [getForm, setForm, updateFormField] = useReduxState({ ...item })

	const defItem = {
		name: "",
		description: "",
		image: "",
		price: "",
		quantity: ""
	}

	const form = getForm() || defItem

	const onSubmit = () => {
		const formData = new FormData()

		// formData.append("filename", form.image)
		formData.append("name", form.name)
		formData.append("description", form.description)
		formData.append("quantity", form.quantity)
		formData.append("price", form.price)
		// formData.append("categories", "123,123")
		try {
			const { data } = api
				.post("/products", formData)
				.finally(res => alert("Cadastrado com sucesso"))
		} catch (e) {
			console.log(e.status)
		}
	}

	const onUpdate = form => {
		const payload = { ...form }

		try {
			const { data } = api.put(`/products/${item.id}`, payload)
			alert("UPDATE")
		} catch (e) {
			console.log(e.status)
		}
	}

	const classes = ""
	return (
		<div>
			<form noValidate>
				<Grid container spacing={2}>
					{!form.id && (
						<>
							<Grid item xs={12}>
								<TextField
									variant="outlined"
									fullWidth
									label="Nome"
									value={form.name}
									onChange={e => {
										updateFormField("name")(e.target.value)
									}}
								/>
							</Grid>
							<Grid item xs={12}>
								<TextField
									variant="outlined"
									fullWidth
									label="Detalhes do produto"
									value={form.description}
									onChange={e => {
										updateFormField("description")(
											e.target.value
										)
									}}
								/>
							</Grid>
						</>
					)}

					<Grid item xs={12}>
						<TextField
							variant="outlined"
							fullWidth
							label="Quantidade"
							type="number"
							value={form.quantity}
							onChange={e => {
								updateFormField("quantity")(e.target.value)
							}}
							form
						/>
					</Grid>
					{/* //image */}
					{/* <Grid item xs={12}>
						<TextField
							variant="outlined"
							fullWidth
							label="Descrição"
							onChange={e => {
								updateFormField("image")(e.target.value)
							}}
						/>
					</Grid> */}
					<Grid item xs={12}>
						<TextField
							variant="outlined"
							fullWidth
							type="number"
							label="Preço"
							value={form.price}
							onChange={e => {
								updateFormField("price")(e.target.value)
							}}
						/>
					</Grid>
				</Grid>
				<Button
					onClick={() => (form.id ? onUpdate(form) : onSubmit)}
					type="button"
					fullWidth
					variant="contained"
					color="primary"
					className={classes.submit}>
					{!form.id ? "Adicionar" : "Salvar"}
				</Button>
			</form>
		</div>
	)
}

export default ProductsForm
