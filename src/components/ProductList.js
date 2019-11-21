import React, { useState } from "react"
import {
	ListItem,
	ListItemAvatar,
	Avatar,
	ListItemText,
	IconButton,
	ListItemSecondaryAction,
	Grid,
	Dialog,
	DialogTitle,
	DialogContentText,
	Typography,
	List,
	DialogActions,
	Button
} from "@material-ui/core"
import TextFieldsIcon from "@material-ui/icons/TextFields"
import DeleteIcon from "@material-ui/icons/Delete"
import EditIcon from "@material-ui/icons/Edit"
import { makeStyles } from "@material-ui/styles"
import { Link } from "react-router-dom"
import api from "../core/api"
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart"
import toCurrency from "../core/toCurrency"
import ProductsForm from "./forms/ProductsForm"

const useStyles = makeStyles(theme => ({
	root: {
		// flexGrow: 1,
		overflow: "none",
		transition: "width 1s, height 1s, opacity 1s 1s"
	},

	paperPropsMax: {
		padding: 10,
		width: 600,
		// height: 500,
		transition: "width 1s, height 1s, border-width 0.6s linear"
		// minWidth: "450px !important"
	}
}))

const ProductList = ({ product, fetchData, history }) => {
	const [open, setOpen] = useState(false)
	const [edit, setEdit] = useState(false)
	const [form, setForm] = useState(product)
	const classes = useStyles()

	//open dialog modal
	const handleClose = () => {
		setOpen(false)
		setEdit(false)
	}
	//close dialog modal
	const handleOpen = () => {
		setOpen(true)
	}

	// function createMarkup() {
	// 	return { __html: product.content }
	// }

	const onDelete = async id => {
		try {
			const { data } = await api
				.delete(`/products/${id}`)
				.then(res => res.status === 200 && fetchData())

			// setState({ loading: false })
		} catch (e) {
			// setState({ loading: false })

			console.log("Upload Error")
			console.dir(e)
		}
	}

	const updateProduct = async () => {
		try {
			await api.put(`/products/${product.id}`, form)
		} catch (e) {
			console.log(e)
		}
	}

	return (
		<Grid container xs={12} style={{ height: "100%" }}>
			<Grid item xs={12}>
				<ListItem alignItems="center" button onClick={handleOpen}>
					<ListItemAvatar>
						<Avatar>
							<ShoppingCartIcon />
						</Avatar>
					</ListItemAvatar>
					<ListItemText
						primary={product.name}
						// secondary={product.description ? product.description : null}
					/>
					<ListItemSecondaryAction>
						<IconButton
							edge="end"
							aria-label="delete"
							onClick={() => onDelete(product.id)}>
							<DeleteIcon />
						</IconButton>
					</ListItemSecondaryAction>
				</ListItem>
			</Grid>
			<Dialog
				PaperProps={{
					classes: {
						root: classes.paperPropsMax,
						paper: classes.fixWidth
					}
				}}
				onClose={handleClose}
				aria-labelledby="simple-dialog-title"
				open={open}>
				<DialogTitle id="simple-dialog-title">
					Detalhes do Produto - {product.id}
				</DialogTitle>
				<DialogContentText id="product">
					<Grid
						justify="center"
						alignItems="center"
						container
						xs={12}>
						<List>
							<Typography variant="h6">
								Nome:{` ${product.name}`}
							</Typography>
							<Typography variant="h6">
								Descrição:{` ${product.description}`}
							</Typography>
							{!edit ? (
								<Grid xs={6}>
									<Typography variant="h6">
										Quantidade:{` ${product.quantity}`}
									</Typography>
									<Typography variant="h6">
										Preço:{` ${toCurrency(product.price)}`}
									</Typography>
								</Grid>
							) : (
								<ProductsForm item={product} />
							)}
						</List>
					</Grid>
				</DialogContentText>
				{!edit && (
					<>
						<DialogActions>
							<Grid justify="flex-start" xs={12}>
								<IconButton
									edge="end"
									aria-label="delete"
									onClick={() => setEdit(true)}>
									<EditIcon />
								</IconButton>
							</Grid>
							<Grid justify="flex-end">
								<IconButton
									edge="end"
									aria-label="delete"
									onClick={() => onDelete(product.id)}>
									<DeleteIcon />
								</IconButton>
							</Grid>
						</DialogActions>
						<Grid item justify="flex-end" xs={12}>
							<Button
								fullWidth
								variant="contained"
								color="primary"
								type="submit">
								Salvar
							</Button>
						</Grid>
					</>
				)}
			</Dialog>
		</Grid>
	)
}

export default ProductList
