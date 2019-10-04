import React from "react"
import { makeStyles } from "@material-ui/core/styles"
import Card from "@material-ui/core/Card"
import CardActionArea from "@material-ui/core/CardActionArea"
import CardActions from "@material-ui/core/CardActions"
import CardContent from "@material-ui/core/CardContent"
import CardMedia from "@material-ui/core/CardMedia"
import Button from "@material-ui/core/Button"
import Typography from "@material-ui/core/Typography"
import toCurrency from "../core/toCurrency"
import {
	IconButton,
	Grid,
	ListItem,
	Dialog,
	DialogContent,
	Slide,
	Divider
} from "@material-ui/core"
import DeleteIcon from "@material-ui/icons/Delete"
import { Link } from "react-router-dom"
import api from "../core/api"

const useStyles = makeStyles({
	card: {
		maxWidth: 345
	},
	media: {
		height: 140,
		backgroundSize: "contain"
	}
})

const Transition = React.forwardRef(function Transition(props, ref) {
	return <Slide direction="down" ref={ref} {...props} />
})

const ProductItem = ({ item }) => {
	const classes = useStyles()
	const [open, setOpen] = React.useState(false)

	const handleClickOpen = () => {
		setOpen(true)
	}
	const handleClose = () => {
		setOpen(false)
	}

	return (
		<Card className={classes.card}>
			<CardActionArea>
				<Dialog
					onClose={handleClose}
					open={open}
					aria-labelledby="alert-dialog-title"
					aria-describedby="alert-dialog-description"
					TransitionComponent={Transition}>
					<DialogContent>
						<Typography variant="h6">
							Nome: <i>{item.title}</i>
						</Typography>
						<Divider />
						<Typography variant="h6">
							Preço: <i>{toCurrency(item.price)}</i>
						</Typography>
						<Divider />
						<Typography variant="h6">
							Detalhes: <i>{item.description}</i>
						</Typography>
						<Divider />
						<Typography variant="h6">
							Quantidade: <i>{item.quantityOnHand}</i>
						</Typography>
					</DialogContent>
				</Dialog>
				<CardMedia
					onClick={handleClickOpen}
					className={classes.media}
					image="https://chezfrance.vteximg.com.br/arquivos/ids/163379-230-364/espumante-frances-bourgogne-cremant-da-bourgone-blanc-de-blancs.jpg?v=637021662587330000"
					title={item.title}
				/>
				<Typography gutterBottom variant="h4" component="h2">
					{item.title}
				</Typography>
				<CardContent>
					<Typography gutterBottom variant="h4" component="h2">
						{toCurrency(item.price)}
					</Typography>
					<Typography
						variant="body2"
						color="textSecondary"
						component="p">
						{item.description}
					</Typography>
					<Typography
						align="right"
						variant="body2"
						color="textSecondary"
						component="h5">
						{item.quantityOnHand}
					</Typography>
				</CardContent>
			</CardActionArea>
			<CardActions>
				<ListItem
					button
					component={Link}
					to={`/products/edit/${item.id}`}>
					<Button size="small" color="primary">
						Editar
					</Button>
				</ListItem>

				<IconButton
					onClick={() =>
						api.delete(`/products`, { params: { id: item.id } })
					}>
					<DeleteIcon />
				</IconButton>
			</CardActions>
		</Card>
	)
}

export default ProductItem
