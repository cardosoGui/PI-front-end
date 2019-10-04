import React from "react"
import { TextField, Grid, Button } from "@material-ui/core"
import useReduxState from "../../core/useReduxState"
import api from "../../core/api"

const ProductsForm = ({ history, item }) => {
	const [getForm, setForm, updateFormField] = useReduxState({ ...item })

	const defItem = {
		id: "",
		title: "",
		description: "",
		image: "",
		price: "",
		quantityOnHand: ""
	}

	const form = getForm() || defItem

	const onSubmit = form => {
		const payload = { ...form, image: "teste" }

		try {
			const { data } = api
				.post("/products", payload)
				.finally(res => alert("Cadastrado com sucesso"))
		} catch (e) {
			console.log(e.status)
		}
	}

	const onUpdate = form => {
		const payload = { ...form }

		try {
			const { data } = api.put("/products", payload)
		} catch (e) {
			console.log(e.status)
		}
		alert("UPDATE")
	}

	const classes = ""
	return (
		<div>
			<form noValidate>
				<pre>{JSON.stringify(form, null, 4)}</pre>
				<Grid container spacing={2}>
					<Grid item xs={12}>
						<TextField
							variant="outlined"
							fullWidth
							label="Nome"
							value={form.title}
							onChange={e => {
								updateFormField("title")(e.target.value)
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
								updateFormField("description")(e.target.value)
							}}
						/>
					</Grid>
					<Grid item xs={12}>
						<TextField
							variant="outlined"
							fullWidth
							label="Quantidade"
							type="number"
							value={form.quantityOnHand}
							onChange={e => {
								updateFormField("quantityOnHand")(
									e.target.value
								)
							}}
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
					onClick={() => (form.id ? onUpdate(form) : onSubmit(form))}
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
