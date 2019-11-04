import React, { useState } from 'react'
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
	DialogContentText
} from '@material-ui/core'
import TextFieldsIcon from '@material-ui/icons/TextFields'
import DeleteIcon from '@material-ui/icons/Delete'
import EditIcon from '@material-ui/icons/Edit'
import VideoCard from './VideoCard'
import { makeStyles } from '@material-ui/styles'
import { Link } from 'react-router-dom'
import api from '../core/api'
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart'

const useStyles = makeStyles((theme) => ({
	root: {
		// flexGrow: 1,
		overflow: 'none',
		transition: 'width 1s, height 1s, opacity 1s 1s'
	},

	paperPropsMax: {
		padding: 10,
		width: 600,
		height: 500,
		transition: 'width 1s, height 1s, border-width 0.6s linear'
		// minWidth: "450px !important"
	}
}))

const ProductList = ({ product, fetchData, history }) => {
	const [ open, setOpen ] = useState(false)
	const classes = useStyles()

	//open dialog modal
	const handleClose = () => {
		setOpen(false)
	}
	//close dialog modal
	const handleOpen = () => {
		setOpen(true)
	}

	// function createMarkup() {
	// 	return { __html: product.content }
	// }

	const onDelete = async (id) => {
		try {
			const { data } = await api.delete(`/products/${id}`).then((res) => res.status === 200 && fetchData())

			// setState({ loading: false })
		} catch (e) {
			// setState({ loading: false })

			console.log('Upload Error')
			console.dir(e)
		}
	}

	return (
		<React.Fragment>
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
						component={Link}
						to={
							history.location.pathname === '/products' ? (
								`/products/edit/${product.id}`
							) : (
								`/courses/edit/${product.id}`
							)
						}
						edge="end"
					>
						<EditIcon />
					</IconButton>
					<IconButton edge="end" aria-label="delete" onClick={() => onDelete(product.id)}>
						<DeleteIcon />
					</IconButton>
				</ListItemSecondaryAction>
			</ListItem>
			<Dialog
				PaperProps={{
					classes: {
						root: classes.paperPropsMax,
						paper: classes.fixWidth
					}
				}}
				onClose={handleClose}
				aria-labelledby="simple-dialog-title"
				open={open}
			>
				<DialogTitle id="simple-dialog-title">Detalhes da Matéria</DialogTitle>
				<DialogContentText id="product">
					<div className="flex-row center-b">
						<div className="flex ">
							<Typography variant="h6">
								Nome: <i>{BOLA}</i>
							</Typography>
						</div>
						<div className="flex flex-end">
							<Typography variant="h6">
								<i>{BOLA}</i>
							</Typography>
						</div>
					</div>
				</DialogContentText>
			</Dialog>
		</React.Fragment>
	)
}

export default ProductList
